import React from 'react';
import Video from './Video';
import { coco, soul, garcon_et_bete } from '../utils/videoLinks/animeLinks';
import { Card, Container, Divider, Header } from 'semantic-ui-react';

function Animes() {

    return (
        <>
            <Card.Group className="Videos" itemsPerRow={4} stackable centered>

                <Video
                    duree='1:45:03'
                    titre="Coco"
                    src={coco.illustration}
                    url={coco.film}
                    description={coco.description}
                    poster={coco.poster}
                />
                <Video
                    duree='1:45:03'
                    titre="Soul"
                    src={soul.illustration}
                    url={soul.film}
                    description={soul.description}
                    poster={soul.poster}
                />
                <Video
                    duree='1:45:03'
                    titre="Le Garçon et la Bête"
                    src={garcon_et_bete.illustration}
                    url={garcon_et_bete.film}
                    description={garcon_et_bete.description}
                    poster={garcon_et_bete.poster}
                />
                {/* <Video
                    duree='1:45:03'
                    titre="Coco"
                    src='https://firebasestorage.googleapis.com/v0/b/essims-videos.appspot.com/o/images%2FCoco_title.jpg?alt=media&token=259d516d-1da6-4813-8d62-33a0cc60fc87'
                    url={coco}
                />
                <Video
                    duree='1:45:03'
                    titre="Soul"
                    src='https://firebasestorage.googleapis.com/v0/b/essims-videos.appspot.com/o/images%2Fsoul.jpeg?alt=media&token=b3e5e326-6676-4c60-a4b7-e328ad6a1270'
                    url={soul}
                />
                <Video
                    duree='1:45:03'
                    titre="Coco"
                    src='https://firebasestorage.googleapis.com/v0/b/essims-videos.appspot.com/o/images%2FCoco_title.jpg?alt=media&token=259d516d-1da6-4813-8d62-33a0cc60fc87'
                    url={coco}
                />
                <Video
                    duree='1:45:03'
                    titre="Soul"
                    src='https://firebasestorage.googleapis.com/v0/b/essims-videos.appspot.com/o/images%2Fsoul.jpeg?alt=media&token=b3e5e326-6676-4c60-a4b7-e328ad6a1270'
                    url={soul}
                />
                <Video
                    duree='1:45:03'
                    titre="Coco"
                    src='https://firebasestorage.googleapis.com/v0/b/essims-videos.appspot.com/o/images%2FCoco_title.jpg?alt=media&token=259d516d-1da6-4813-8d62-33a0cc60fc87'
                    url={coco}
                />
                <Video
                    duree='1:45:03'
                    titre="Soul"
                    src='https://firebasestorage.googleapis.com/v0/b/essims-videos.appspot.com/o/images%2Fsoul.jpeg?alt=media&token=b3e5e326-6676-4c60-a4b7-e328ad6a1270'
                    url={soul}
                /> */}
            </Card.Group>

           
        </>
    )
}

export default Animes
