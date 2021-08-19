import Game from './Game';
import Home from './Home';
import React from 'react';
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";


function App() {

  return (
    <div className="App">
      <Router>
          <div className="nav container">
            <div className="inner">
              <Link className="logo" to="/">StoryStack</Link>
            </div>
          </div>
          {/* END TODO  */}

        <Switch>
            {/* React dom routes. Slug is game id, read in game component */}
            <Route path="/play/:slug" component={Game }/>
            <Home path="/" exact component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
