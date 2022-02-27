import VideoStore from './VideoStore';
import { useForm } from 'react-hook-form';
import amzamt_image from '../images/Amzat_interview.png';
import { Embed, Container, Segment } from 'semantic-ui-react';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react/cjs/react.development';

const Home = () => {

    const authContext = useAuth();

    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }
    const userInfos = authContext.user
    console.log('user State in Storage : ', localStorage.getItem('isUserConnected'));
    console.log("The context >> ", authContext);
    console.log("UserInfos >> ", userInfos);

    const [isUserConnected, setIsUserConnected] = useState(false);

    useEffect(() => {
        console.log('In Home, localStorage : ', localStorage.getItem)
        if (localStorage.getItem('isUserConnected') === 'yes'){
            setIsUserConnected(true);
        }
    }, []);

    if (isUserConnected) {
        return (
            <div>
                <VideoStore user = { userInfos }/>            
            </div>
        );
    }
    else {
        return (
            <>
            <div>
                You must be connected to access this page            
            </div>
            <button>Sign-in</button>
            <button>Sign-up</button>
            </>
        );
    }
}

export default Home
