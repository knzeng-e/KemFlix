import React from 'react';
import Video from '../Video';
import { Card, Container, SegmentGroup } from 'semantic-ui-react';
import { documentaires } from '../../utils/videoLinks/documentairesLinks';

const Documentaires = () => {

    return (
        <Container className="Videos">
                <Card.Group itemsPerRow={3} centered>
                    {documentaires.map((documentaire, index) => {
                        return (
                            <Video
                                    key={index}
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
        </Container  >
    )
}

export default Documentaires;
