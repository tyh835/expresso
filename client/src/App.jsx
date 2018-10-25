import React, { Component } from 'react';
import { Link, HashRouter as Router, Route } from 'react-router-dom';
import { ReactComponent as Logo } from './img/logo.svg';
import style from './App.module.scss';

import Menu from './components/Menu/Menu.jsx';
import Landing from './components/Landing/Landing.jsx';
import Employee from './components/Employee/Employee.jsx';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
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
