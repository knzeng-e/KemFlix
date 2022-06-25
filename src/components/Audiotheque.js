import { books } from '../utils/books';
import { Link } from 'react-router-dom';
import { Card, Icon, Segment, Container, Image } from 'semantic-ui-react';

// playerModule: https://www.npmjs.com/package/react-h5-audio-player

const Audiotheque = () => {

    const getAudioLink = (book) => {
        return book.isAudio ? `/audiobook/${book.ref}` : `#theorie_economique_africaine`
    }

    return (
        <Container>
            <Card.Group itemsPerRow={1} centered className='audio-content'>
                {books.map((book, key) => {
                    return (
                        <Card id={book.ref} >
                            <Segment className={book.isAudio ? 'book-info' : 'book-info-no-audio'} raised >
                                {book.isAudio ? <Link to={getAudioLink(book)}>
                                    <Icon name='play' /> {book.title}
                                </Link> : (<><Icon name='' /> <i>Disponible Prochainement</i> - {book.title} </>)
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
        </Container>
    )
}

export default Audiotheque;