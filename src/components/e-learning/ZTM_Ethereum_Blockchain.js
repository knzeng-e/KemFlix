import Audio from '../Audio';
import Video from "../Video";
import { initializeApp } from 'firebase/app';
import { courses } from "../../utils/cours";
import 'react-h5-audio-player/lib/styles.css';
import { useLogin, useMenu } from "../../hooks";
import { getAnalytics } from "firebase/analytics";
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { firebaseConfig } from '../../firebase-config';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { Card, Icon, Segment, Label, Container, Button, Divider, Header, Image, CardContent, CardHeader } from 'semantic-ui-react';


// playerModule: https://www.npmjs.com/package/react-h5-audio-player

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);

// const getAuthors = () => {
//     const authorsCollection = collection(db, 'authors');
//     console.log("AUTHORS CONNECT >> ", authorsCollection)
//     const ret = getDocs(authorsCollection).then((response, err) => {
//         console.log("ERRR ? >> ", err)
//         console.log("Data connexion >> ", response);
//         return response.data
//     });

//     return ret;
//     //return authors[0];
// }

const ELeanings = () => {

    const [ renderMenu ] = useMenu();
    const [
        isConnected,
        setIsConnected,
        web3Infos,
        setWeb3Infos,
        metamaskConnect
    ] = useLogin();
    const { course_ref } = useParams();
    const course = courses[0].playList;

        return (
            <>
                <Card.Group className="Videos" itemsPerRow={3} stackable centered>
                    {course.map(chapter => {
                        return (
                            <div>
                                <Card className='course-content'>
                                    <Label active>
                                        {chapter.title}  
                                    </Label>
                                    <Label as='a'corner color='red'>
                                    <Icon color='white'>{chapter.id}</Icon>
                                    </Label>
                                    <Video
                                        key={chapter.id}
                                        duree={chapter.duree}
                                        titre={chapter.title}
                                        src={chapter.illustration}
                                        url={chapter.source}
                                        description={chapter.description}
                                        poster={chapter.illustration}
                                    />
                                    <CardHeader>
                                        <Label>
                                            {chapter.description}
                                        </Label>
                                    </CardHeader>
                                </Card>
                            </div>
                            )
                        })
                    }
                    </Card.Group>
            </>
        );
    
}

export default ELeanings;