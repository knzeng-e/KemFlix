import VideoStore from './VideoStore';
import { useLogin, useMenu } from "../hooks";
import { Container } from 'semantic-ui-react';
import amzamt_image from '../images/Amzat_interview.png';

const Home = () => {
    const [renderMenu] = useMenu();
    const [
        isConnected,
        setIsConnected,
        web3Infos,
        setWeb3Infos,
        metamaskConnect
    ] = useLogin();
        return (
            <Container>
                <VideoStore users={web3Infos.accounts} />
            </Container>
        );
}

export default Home
