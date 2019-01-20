import React, { Component } from 'react';
import { Link, HashRouter as Router, Route } from 'react-router-dom';
import { ReactComponent as Logo } from '../../img/logo.svg';
import style from './App.module.scss';

import Menu from '../Menu/Menu';
import Landing from '../Landing/Landing';
import Employee from '../Employee/Employee';
import Clouds from '../Clouds/Clouds';

class App extends Component {
  state = {
    showClouds: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showClouds: true });
    }, 2500);
  }

  render() {
    const { showClouds } = this.state;
    return (
      <Router>
        <div className={style.container}>
          {showClouds && <Clouds />}
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
