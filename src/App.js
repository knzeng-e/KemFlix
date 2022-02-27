import './App.css';
import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Animes from './components/Animes';
import 'semantic-ui-css/semantic.min.css';
import { useState, useContext } from 'react';
import Webradios from './components/Webradios';
import { useAuth } from './contexts/AuthContext';
import { Segment, Menu } from 'semantic-ui-react';
import Audiotheque from './components/Audiotheque';
import Conferences from './components/Conferences';
import { AuthProvider } from './contexts/AuthContext';
import Documentaires from './components/Documentaires';
import { renderPage, rubriques } from './utils/layoutUtils';
import AudioBooks from './components/audiobooks/Theorie_economique';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  const [activeItem, setActiveItem] = useState('home');
  const [isConnected, setIsConnected] = useState(true);
  const displayMenu = () => {
    if (isConnected){
        return   (
          <Segment className='Navbar' size='large'>
          <h1><Link className='SiteTitle' to='/'>Kem'Flix</Link></h1>
          <Menu pointing secondary stackable>
            {rubriques.map(onglet => {
              return (
                <Link to = {renderPage(onglet)}>
                  <Menu.Item
                    className='Menu'
                    name = {onglet}
                    active = {activeItem === onglet}
                    onClick = {
                      () => {
                        setActiveItem(onglet);
                      }
                    }
                  />
                </Link>
              )
            })}
          </Menu>
      </Segment>)
    }
  }
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          { displayMenu() }
          <Switch>
            <Route exact path = '/' component = {Login}/>
            <Route path = '/home' component = {Home}/>
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
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
