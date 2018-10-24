import React, { Component } from 'react';
import { Link, HashRouter as Router, Route } from 'react-router-dom';
import { ReactComponent as Logo } from '../img/logo.svg';

import Menu from './Menu';
import Landing from './Landing';
import Employee from './Employee';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <Link to="/" className="logo">
              <Logo alt="logo" />
            </Link>
          </header>
          <Route exact path="/" component={Landing} />
          <Route path="/menus/:id" component={Menu} />
          <Route path="/employees/:id" component={Employee} />
        </div>
      </Router>
    );
  }
}

export default App;
