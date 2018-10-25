import React, { Component } from 'react';
import { Link, HashRouter as Router, Route } from 'react-router-dom';
import { ReactComponent as Logo } from './img/logo.svg';
import style from './App.module.scss';

import Menu from './views/Menu/Menu.jsx';
import Landing from './views/Landing/Landing.jsx';
import Employee from './views/Employee/Employee.jsx';

import {
  Cloud1a,
  Cloud1b,
  Cloud2,
  Cloud3,
  Cloud4,
  Cloud5
} from './components/Clouds/Clouds.jsx';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Cloud1a />
          <Cloud1b />
          <Cloud2 />
          <Cloud3 />
          <Cloud4 />
          <Cloud5 />
          <header className={style.header}>
            <Link to="/">
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
