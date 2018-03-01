import React from 'react';
import ContractForm from '../components/forms/contractForm';
import { withFormik } from 'formik';

class ContractContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blockNumber: '',
            address: '',
            data: '',
            value: 0
        };
    }

    componentDidMount() {
        this.updateBlockNumber();
        this.blockUpdateInterval = setInterval(this.updateBlockNumber.bind(this), 5000);
        this.getData();
        //this.getData(this.props.location.pathname);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status && !this.props.status) {
            if (nextProps.status.error) {
                console.log(nextProps.status.error);
                return;
            } else {
                this.getConfirmation(nextProps.status.tx);
            }
        }

        //reload based on reclicking the same route?
        //this.getData(nextProps.location.pathname);
    }

    componentWillUnmount() {
        clearInterval(this.blockUpdateInterval);
    }

    async updateBlockNumber() {
        var block = await this.props.web3API.getWeb3().eth.getBlockNumber();
        this.setState({ blockNumber: block });
    }

    async getConfirmation(tx) {
        var receipt;
        try {
            receipt = await this.props.web3API.getTransactionReceiptMined(tx, 250, 10);
        }
        catch (e) {
            console.log(e);
        }

        this.props.setStatus(null);
        this.getData();
        console.log(receipt);
    }

    async getData() {
        const { web3API } = this.props;
        const etherverse = web3API.getEtherVerse();

        const address = await web3API.getCoinbaseAddress();
        const data = await etherverse.methods.data().call({ from: address });

        this.setState({
            address: address,
            data: web3API.getWeb3().utils.hexToUtf8(data)
        });
    }


    render() {
        const { web3API, ...formikProps } = this.props;
        const { status, isSubmitting } = formikProps;
        // console.log('CONTROLLER', this.props);

        if (isSubmitting) {
            return (
                <h1>Submitting...</h1>
            );
        }

        if (status && !status.error) {
            return (
                <h1>Submitting {status.tx.transactionHash}...</h1>
            );
        }

        return (
            <div>
                <h1>Ethereum Network: {web3API.config.description} Block {this.state.blockNumber}</h1>
                {/* <h1>Status: {form.status.state}</h1> */}
                <h1>Contract Data: {this.state.data}</h1>
                <ContractForm {...formikProps} />
            </div>
        );
    }
}

export default withFormik({
    mapPropsToValues: (props) => {
        //console.log("mapPropsToValues.props:", props);
        let datastring = '';

        return {
            datastring: datastring
        };
    },
    handleSubmit: async (values, formikbag) => {
        /* setValues, setStatus, and other goodies */
        const { props, setSubmitting, setStatus } = formikbag;
        const { web3API } = props;

        const address = await web3API.getCoinbaseAddress();
        const EtherVerse = web3API.getEtherVerse();
        const web3 = web3API.getWeb3();
        // console.log(values);
        // console.log(address);

        switch (values.action) {
            // set EtherVerse Contract Data
            case 'setData':
                setSubmitting(true)
                var newData = web3.utils.utf8ToHex(values.datastring);
                try {
                    var tx = await EtherVerse.methods.setData(newData).send({ from: address, gas: 6000000 });
                    setStatus({ tx: tx })

                } catch (error) {
                    setStatus({ error: error })
                }
                break;

            default:
        };

        setSubmitting(false);
    },
    displayName: 'ClientContractFormik', // helps with React DevTools
})(ContractContainer);

