import React, { Component } from 'react';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: NaN
        };
    }

    componentDidMount() {
        console.log('PROFILE MOUNT');
        this.getData();
        this.balanceUpdateInterval = setInterval(this.getData.bind(this), 2000);
        //this.getData(this.props.location.pathname);
    }

    componentWillReceiveProps(nextProps) {
        console.log('PROFILE NEXT: ', nextProps);
        //this.getData(nextProps.location.pathname);
    }

    componentWillUnmount() {
        clearInterval(this.balanceUpdateInterval);
    }

    async getData() {
        const response = await fetch('http://127.0.0.1:8080/balance');
        const json = await response.json();
        this.setState({ value: json.Eth });
        console.log(json);
    }

    render() {
        // const { profile } = this.props;
        const profile = {
            // src: '/images/armortiffy.jpg',
            src: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=0xdbd0699036eddcae919d3bca25ae8b7e5675a99b',
            name: 'Pay',
        }

        const balance = this.state.value * 900;
        return (
            <div className='tc'>
                <h1 className='f3 mb2'>{profile.name}</h1>
                <p className='f3 mb2'>{'0xdbd0699036eddcae919d3bca25ae8b7e5675a99b'}</p>
                <img
                    className=' h4 w4 dib ba b--black-05 pa2'
                    src={profile.src}
                    alt='profile pic' />

                <h2 className='f3 mb2'>Balance: {balance !== NaN ? balance.toFixed(2) + ' USD' : 'loading...'}</h2>
            </div>
        );
    }
}

//<article className='mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10'>
//crystal present oven scan fault race now stem shy stomach property twist
//https://github.com/dwyl/learn-tachyons/issues/10