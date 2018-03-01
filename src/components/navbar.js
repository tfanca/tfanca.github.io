import React from 'react';
import logo from '../logo.jpg';
import { Link } from 'react-router-dom'

export default () => (
    <nav className='db dt-l w-100 border-box pa3 ph5-l'>
        <Link to='/' className='dib dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l' href='#' title='Logo'>
            <span >
                <img src={logo} className='v-mid db-m w2 h2 br-100' alt='Site Name' />
                TFan
            </span>
        </Link>
        <div className='db dtc-l v-mid w-100 w-75-l tc tr-l'>
            <Link to='/' className='link dim dark-gray f6 f5-l dib mr3 mr4-l' href='#' title='Home'>Home</Link>
            <Link to='/portfolio' className='link dim dark-gray f6 f5-l dib mr3 mr4-l' href='#' title='Portfolio'>Portfolio</Link>
            <Link to='/wallet' className='link dim dark-gray f6 f5-l dib mr3 mr4-l' href='#' title='Wallet'>Wallet</Link>
            <Link to='/contract' className='link dim dark-gray f6 f5-l dib mr3 mr4-l' href='#' title='web3'>Web3</Link>
            {/* <a className='link dim dark-gray f6 f5-l dib' href='#' title='Contact'>Contact</a> */}
        </div>
    </nav >
)

