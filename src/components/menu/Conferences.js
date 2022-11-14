import React from 'react';
import Video from '../Video';
import { Card } from 'semantic-ui-react';
import { conferences } from '../../utils/videoLinks/conferencesLinks';

const Conferences = () => {
    return (
        <Card.Group className="Videos" itemsPerRow={3} stackable centered>
            {conferences.map((conference, index) => {
                return (
                    <Video
                        duree={conference.duree}
                        titre={conference.titre}
                        src={conference.illustration}
                        url={conference.film}
                        description={conference.description}
                        poster={conference.poster}
                    />
                );
            })
            }
        </Card.Group>
    );
}

export default Conferences;
