import Audio from '../Audio';
import 'react-h5-audio-player/lib/styles.css';
import {audiosList} from '../../utils/audios'
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Card, Icon, Segment, Container, Divider, Header, Image } from 'semantic-ui-react';

// playerModule: https://www.npmjs.com/package/react-h5-audio-player

const AudioBooks = () => {
    const  { book_ref } = useParams()
    const [currentAudio, setCurrentAudio] = useState('');

    const playAudio = (event, audioId) => {
        console.log('In playAudio: ')
        console.log('Playing ==> ', event)
        setCurrentAudio(audioId);
    }

    useEffect(() => {
        console.log('changing Audio Source ..;')
    }, [currentAudio]);

    const formatTitle = (title) => {
        return (title.length <= 42 ? title : `${title.substring(0, 41)}...`);
    }

    return (
        <Container>
            <Card.Group itemsPerRow={3} centered>
                {audiosList.filter(audiobook => {
                    return audiobook.ref === book_ref
                })
                    .map(audio => {
                        return (
                            <Audio
                                image={audio.illustration}
                                title={formatTitle(audio.title)}
                                author={audio.author}
                                id={audio.id}
                                src={audio.source}
                                handlePlay={playAudio}
                                shouldStop={currentAudio !== audio.id}
                            />
                        )
                    })}
            </Card.Group>
        </Container>
    )
}

export default AudioBooks;