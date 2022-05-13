import React from 'react';
import Video from './Video';
import { Card, Container } from 'semantic-ui-react';
import { documentaires } from '../utils/videoLinks/documentairesLinks';

const Documentaires = () => {

    return (
        <Container >
            <Card.Group className="Videos" itemsPerRow={3} stackable centered>
                {documentaires.map((documentaire, index) => {
                    return (
                            <Video
                                duree = {documentaire.duree}
                                titre = {documentaire.titre}
                                src= {documentaire.illustration}
                                url={documentaire.film}
                                description={documentaire.description}
                                poster={documentaire.poster}
                            />
                        )
                    })
                }

              
            </Card.Group>
        </Container>
    )
}

export default Documentaires;
