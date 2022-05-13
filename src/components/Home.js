import VideoStore from './VideoStore';
import { useLogin, useMenu } from "../hooks";
import amzamt_image from '../images/Amzat_interview.png';
import { Container, Segment, Button } from 'semantic-ui-react';

const Home = () => {
    const [ renderMenu ] = useMenu();
    const [
        isConnected,
        setIsConnected,
        web3Infos,
        setWeb3Infos,
        metamaskConnect
    ] = useLogin();

   if (isConnected === false) {
        return (
            <Container className = 'login-page'>
                    <div> <h2 className='login-title'>Welcome to Kem'Flix</h2></div>
                <div className = 'login-card'>
                        <Button inverted className = 'login-button' onClick = {metamaskConnect}>
                            <div className='login-button-text'>Sign-In with Metamsk</div>
                        </Button>
                    <br /> <br />
                </div>
            </Container>
        );
    }
    console.log("ACCOUNTS", web3Infos)
    return (
        <div>
            { renderMenu() }
            {web3Infos.connectedAccount}
            <VideoStore users = { web3Infos.accounts }/>            
        </div>
    );
}

export default Home
