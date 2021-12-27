import React from 'react';
import VideoStore from './VideoStore';
import { useForm } from 'react-hook-form';
import amzamt_image from '../images/Amzat_interview.png';
import { Embed, Container, Segment } from 'semantic-ui-react';

function Home() {
    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <div>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('Prenom')}/>
                <input {...register('Nom')}/>

            </form> */}
            {/* <Container>
                <Embed
                    id='P1weqiWFKNU'
                    placeholder={amzamt_image}
                    source='youtube'
                />
            </Container> */}
            <VideoStore />
        </div>
    )
}

export default Home
