import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SmartContracts from './utils/smartContracts.js';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

window.addEventListener('load', async function () {
    try {
        const web3API = await SmartContracts.create();
        ReactDOM.render(<App web3API={web3API} />, document.getElementById('root'));
    }
    catch (e) {
        console.log(e);
        ReactDOM.render(<App />, document.getElementById('root'));
        //Render some failthing here
    }
})

// registerServiceWorker();
