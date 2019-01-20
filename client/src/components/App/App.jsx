import React, { Component } from 'react';
import { Link, HashRouter as Router, Route } from 'react-router-dom';
import { ReactComponent as Logo } from '../../img/logo.svg';
import style from './App.module.scss';

import Menus from '../Menus/Menus';
import Landing from '../Landing/Landing';
import Employees from '../Employees/Employees';
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
          <Route path="/menus/:id" component={Menus} />
          <Route path="/employees/:id" component={Employees} />
        </div>
      </Router>
    );
  }
}

export default App;
