import React, { Component } from 'react';
import Index from "./page/index"
import Hotmovie from "./page/hotmovie"
import Moviedetail from "./page/moviedetail"
import {Router,Route,Redirect} from "./router"
import './index.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route  path="/index" component={Index} />
        <Route path="/hotmovie" component={Hotmovie}/>
        <Route path="/movie/:movieid" component={Moviedetail}/>
        <Redirect origin="/" destination="/index" />
      </Router>
    );
  }
}

export default App;
