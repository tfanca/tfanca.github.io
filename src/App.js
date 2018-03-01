import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import NavBar from './components/navbar';
import Home from './containers/home';
import Tasks from './components/tasks';
import Profile from './components/profile';
import Contract from './containers/contract';

import Demo from './components/demo';
import Routing from './components/routing';

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
    //<Route path="/abc" render={()=><TestWidget num="2" someProp={100}/>}/>
    const { web3API } = this.props;
    return (
      <Router>
        <div className=''>
          <NavBar />

          <Route exact path="/" render={Home} />
          <Route path="/portfolio" render={Tasks} />
          <Route path="/wallet" render={() => <Profile web3API={web3API} />} />
          <Route path='/contract' render={() => <Contract web3API={web3API} />} />

          {/* <Header />
        <Tasks data={data} onClick={this.onClick} />
        <Profile profile={profile} />
        <Demo /> */}
        </div>
      </Router>
    );

    // if (web3API && web3API.web3js) {
    //   return (
    //     <div className="App">
    //       <h1>{this.state.network}</h1>

    //     </div>
    //   );
    // } else {
    //   return (
    //     <div className="App">
    //       <h1>Please install Metamask for using this App.</h1>
    //     </div>
    //   );
    // }
  }
}

export default App;
