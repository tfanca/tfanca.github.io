import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import Home from './home';
import Contact from './contact';
import Contract from './contract';
import Footer from '../components/footer';

import NavBar from '../components/navbar';
import Profile from '../components/profile';
import Tasks from '../components/tasks';

export default props => {
    const { web3API } = props;
    return (
        <div className=''>
            <NavBar web3API={web3API} />

            <Switch>
                <Route exact path="/" render={Home} />
                <Route path="/portfolio" render={Tasks} />
                <Route path="/wallet" render={() => <Profile web3API={props.web3API} />} />
                <Route path="/contact" component={Contact} />
                {web3API ? <Route path='/contract' render={() => <Contract web3API={props.web3API} />} /> : null}
                <Redirect to="/404" />
            </Switch>

            <Footer />

        </div>
    )
}
