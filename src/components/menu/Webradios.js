import React from 'react';
import { audiosList } from '../../utils/audios';
import 'react-h5-audio-player/lib/styles.css';
import ReactAudioPlayer from 'react-h5-audio-player';
import { Card, Icon, Segment, Container, Image } from 'semantic-ui-react';

// playerModule: https://www.npmjs.com/package/react-h5-audio-player

const Webradio = () => {
   
    return (
        <Container>
            <Card.Group itemsPerRow={1} centered className='audio-content'>
                {audiosList.filter(aud => aud.ref === 'web-radio').map((audio, key) => {
                    return (
                        <Card >
                            <Segment className='book-info' raised >
                                <Icon name='sound' color='red' size='large'/> 
                                        {audio.description}
                            </Segment>
                            <Card.Header>
                                <Segment className='webradio' inverted placeholder raised>
                                <Image
                                    src={audio.illustration}
                                    size='huge'
                                    centered
                                    bordered
                                    rounded
                                    wrapped
                                />
                                    
                                </Segment>
                                <ReactAudioPlayer
                                    key={audio.id}
                                    id={audio.id}
                                    className='audio-player'
                                    controls
                                    header={audio.title}
                                    src={audio.source}
                                />
                            </Card.Header>
                            <Card.Meta className='book-info' textAlign='center'>
                                {audio.author}  
                            </Card.Meta>

                        </Card>
                    )
                })}
            </Card.Group>
        </Container>
    )
}

export default Webradio;