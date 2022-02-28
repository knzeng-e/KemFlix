import React from 'react';
import Video from './Video';
import { Card, Container, Divider, Header } from 'semantic-ui-react';
import { documentaires } from '../utils/videoLinks/documentairesLinks';

const Documentaires = ({user}) => {
    console.log("USERS >> ", user);
    return (
        <>
            <Card.Group className="Videos" itemsPerRow={3} stackable centered>

                {documentaires.map((documentaire, index) => {
                    return (
                            <Video
                                key= {index}
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

        </>
    )
}

export default Documentaires;
