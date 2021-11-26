import Audio from './Audio';
import { books } from '../utils/books';
import { Link } from 'react-router-dom';
import { audiosList } from '../utils/audios';
import 'react-h5-audio-player/lib/styles.css';
import { HashLink } from 'react-router-hash-link';
import React, { useState, useEffect } from 'react';
import image_test from '../images/Amzat_interview.png';
import { Card, Icon, Segment, Container, Divider, Header, Image } from 'semantic-ui-react';

// playerModule: https://www.npmjs.com/package/react-h5-audio-player

const Audiotheque = () => {

    const getAudioLink = (book) => {
        return book.isAudio ? `/audiobook/${book.ref}` : `#theorie_economique_africaine`
    }

    return (
        <Container>
            <Card.Group itemsPerRow={1} centered>
                {books.map((book, key) => {
                    return (
                        <Card id={book.ref} >
                            <Segment  className={book.isAudio ? 'book-info': 'book-info-no-audio'} raised >
                                {book.isAudio ? <Link  to={getAudioLink(book)}>
                                    <Icon name='play'/> {book.title}
                                </Link> : (<><Icon name=''/> <i>Disponible Prochainement</i> - {book.title} </>) 
                                }
                            </Segment>
                            <Card.Header>
                                {book.isAudio ? <Link to={`/audiobook/${book.ref}`}>
                                    <Image
                                        src={book.illustration}
                                        size='huge'
                                        centered
                                        bordered
                                        rounded
                                        wrapped
                                    />
                                    </Link> :
                                    <Image
                                        src={book.illustration}
                                        size='huge'
                                        centered
                                        bordered
                                        rounded
                                        wrapped
                                    />
                                }
                            </Card.Header>
                            <Segment raised>
                                <Card.Content >
                                    {book.description}
                                </Card.Content>
                            </Segment>
                            <Card.Meta className='book-info' textAlign='center'>
                                {book.author}
                            </Card.Meta>

                        </Card>
                    )
                })}
            </Card.Group>
            {/* </div> */}
        </Container>
    )
}

export default Audiotheque;