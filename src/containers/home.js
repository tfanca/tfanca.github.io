import React from 'react';
import logo from '../logo.jpg';

export default props => {
    return (
        < header className='tc pv4 pv5-ns' >
            <img src='/images/armortiffy.jpg' className='br-100 h3 w3 dib' alt='avatar' />
            {/* <img src={logo} className='br-100 h3 w3 dib' alt='avatar' /> */}
            <h1 className='f5 f4-ns fw6 mid-gray'>Tiffany Fan</h1>
            <h2 className='f6 gray fw2 ttu tracked'>Vancouver, B.C.</h2>
        </header >
    );
}