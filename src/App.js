import './App.css';
import { useEffect, useState } from 'react';
import Home from './components/Home';
import Animes from './components/Animes';
import 'semantic-ui-css/semantic.min.css';
import { Button, Icon, Label } from "semantic-ui-react";
import { useLogin, useMenu, useSignup } from "./hooks";
import { Container, Message } from "semantic-ui-react";
import Webradios from './components/Webradios';
import Formations from './components/Formations';
import Audiotheque from './components/Audiotheque';
import Conferences from './components/Conferences';
import Documentaires from './components/Documentaires';
import AudioBooks from './components/audiobooks/Theorie_economique';
import ELeanings from './components/e-learning/ZTM_Ethereum_Blockchain';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  const [renderMenu] = useMenu();
  const [hasAccess, setHasAccess] = useState(false);
  const [
    isConnected,
    setIsConnected,
    web3Infos,
    setWeb3Infos,
    metamaskConnect,
    hasMetamask,
  ] = useLogin();
  const [isUserRegistered] = useSignup();

  useEffect(() => {
    if (isUserRegistered) {
      setHasAccess(true);
    }
  }, [isUserRegistered]);

  if (isConnected) {
    if (hasAccess){
      return (
        <Router>
          <Container className="App">
            {renderMenu()}
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/animes' component={Animes} />
              <Route path='/radio/' component={Webradios} />
              <Route path='/learning/' component={Formations} />
              <Route path='/audiotheque' component={Audiotheque} />
              <Route path='/conferences' component={Conferences} />
              <Route path='/documentaires' component={Documentaires} />
              <Route path='/audiobook/:book_ref' component={AudioBooks} />
              <Route path='/e-learning/:course_ref' component={ELeanings} />
            </Switch>
          </Container>
        </Router>
      );
    } else {
      return (
        <Container className='login-page'>
          <div className='login-card'>
            <Button inverted className='login-button' onClick={() => {console.log("Registering the user in smartCntract")}}>
              Welcome to KemFlix <Label corner color='teal'>  <Icon as={'h2'} name='ethereum' /> web3</Label>
              <div className='login-button-text'>
                <Icon circular color='red' disabled name='power' />
              </div>
              <div><h3 className='login-title'>Please Register</h3></div>
            </Button>
            <br /> <br />
          </div>
        </Container>
      );
    }
  } else {
    if (window.ethereum) {
      return (
        <Container className='login-page'>
          <div className='login-card'>
            <Button inverted className='login-button' onClick={metamaskConnect}>
              Enter <Label corner color='teal'>  <Icon as={'h2'} name='ethereum' /> web3</Label>
              <div className='login-button-text'>
                <Icon circular color='red' disabled name='power' />
              </div>
              <div><h3 className='login-title'>KEM'FLIX ☥</h3></div>
            </Button>
            <br /> <br />
          </div>
        </Container>
      );
    } else {
      return (
        <Container className='login-page'>
          <Message >
            <Label attached='top' active ><div className='web3-error'>WEB 3 Error</div></Label>
            <Message.Header >
            </Message.Header>
            <Message.Content>
              <a className='login-card' href='https://metamask.io/' target="_blank" rel="noreferrer">
                Web3 Site : You need Metamask plugin to Login ..
              </a>
            </Message.Content>
          </Message>
          <br /> <br />
        </Container>
      );
    }
  }
}

export default App;
