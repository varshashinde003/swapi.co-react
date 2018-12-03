import React, { Component } from 'react';

import { HashRouter, Route } from 'react-router-dom';
import { Home } from './views/Home';
import Films from './views/Films/Films';
import People from './views/People/People';
import Planets from './views/Planets/Planets';
import Spaceships from './views/Spaceships/Spaceships';
import Vehicles from './views/Vehicles/Vehicles';
import Species from './views/Species/Species';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/films" component={Films} />
          <Route exact path="/people" component={People} />
          <Route exact path="/planets" component={Planets} />
          <Route exact path="/spaceships" component={Spaceships} />
          <Route exact path="/vehicles" component={Vehicles} />
          <Route exact path="/species" component={Species} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
