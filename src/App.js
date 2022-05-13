import './App.css';
import React from 'react';
import Home from './components/Home';
import Animes from './components/Animes';
import { Container } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import Webradios from './components/Webradios';
import Audiotheque from './components/Audiotheque';
import Conferences from './components/Conferences';
import Documentaires from './components/Documentaires';
import AudioBooks from './components/audiobooks/Theorie_economique';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        <div className="App">
          <Switch>
            {/* <Route exact path = '/' component = {Login}/> */}
            <Route exact path = '/' component = {Home}/>
            <Route path = '/animes' component = {Animes} />
            <Route path = '/audiotheque' component = {Audiotheque} />
            <Route path = '/documentaires' component = {Documentaires} />
            <Route path = '/conferences' component = {Conferences} />
            <Route path = '/audiobook/:book_ref' component = {AudioBooks} />
            <Route path = '/radio/' component = {Webradios} />

            {/* <Route path = 'series' component = {Series} />
            <Route path = '/Film' component = {} />
            <Route path = '' component = {} />
            <Route path = '' component = {} /> */}
          </Switch>
        </div>
      </Router>
  );
}

export default App;
