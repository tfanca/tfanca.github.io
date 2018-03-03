import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, NotFound } from 'react-router-dom';

import Main from './containers/main';


import Demo from './components/demo';
import Routing from './components/routing';
import navbar from './components/navbar';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      network: 'Loading...',
    };
  }

  render() {
    //https://github.com/dwyl/learn-tachyons/issues/10
    //https://github.com/redux-observable/redux-observable/issues/313
    const { web3API } = this.props;
    return (
      <Router>
        <div className=''>
          <Switch>
            <Route exact path='/404' status={404} render={() => <h1>404 Not Found</h1>} />
            <Route render={() => <Main web3API={web3API} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
