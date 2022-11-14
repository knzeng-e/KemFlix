import React from 'react';
import { courses } from '../../utils/cours';
import { Link } from 'react-router-dom';
import { useLogin, useMenu } from "../../hooks/";
import { Card, Icon, Segment, Container, Image } from 'semantic-ui-react';

// playerModule: https://www.npmjs.com/package/react-h5-audio-player

const Formations = () => {
    const [renderMenu] = useMenu();
    const [
        isConnected,
        setIsConnected,
        web3Infos,
        setWeb3Infos,
        metamaskConnect
    ] = useLogin();

    const getAudioLink = (course) => {
        return course.opened ? `/e-learning/${course.ref}` : `#theorie_economique_africaine`
    }

    return (
        <Container className='e-learning'>
            <Card.Group itemsPerRow={1} centered>
                {courses.map((course, key) => {
                    return (
                        <Card id={course.ref} >
                            <Segment className={course.opened ? 'elearning-header' : 'not-opened-header'} raised >
                                {course.opened ? <Link to={getAudioLink(course)}>
                                    <Icon name='play' /> {course.title}
                                </Link> : (<><Icon name='' /> <i>Disponible Prochainement</i> - {course.title} </>)
                                }
                            </Segment>
                            <Card.Header>
                                {course.opened ? <Link to={`/e-learning/${course.ref}`}>
                                    <Image
                                        src={course.illustration}
                                        size='huge'
                                        centered
                                        bordered
                                        rounded
                                        wrapped
                                    />
                                </Link> :
                                    <Image
                                        src={course.illustration}
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
                                    {course.description}
                                </Card.Content>
                            </Segment>
                            <Card.Meta className='elearning-header' textAlign='center'>
                                {course.author}
                            </Card.Meta>

                        </Card>
                    )
                })}
            </Card.Group>
        </Container>
    );
}

export default Formations;