import React, { Component } from 'react';
import Index from "./page/index"
import Hotmovie from "./page/hotmovie"
import {Router,Route,Redirect} from "./router"
import './index.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route  path="/index" component={Index} />
        <Route path="/hotmovie" component={Hotmovie}/>
        <Redirect origin="/" destination="/index" />
      </Router>
    );
  }
}

export default App;
