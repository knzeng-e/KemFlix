import React, { useState } from 'react';
import { Segment, Image, Card, Modal } from 'semantic-ui-react';

const Video = ({ src, url, description, titre, duree, poster }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = (e, settings) => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Card fluid onClick={(e) => {
                handleOpen(e, { "contenu": url })
            }} className='video'>
                <Image src={src}/>
                {/* <Segment attached className='video-description'>{titre}</Segment> */}
            </Card>

            {/* Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                basic
            >
                <Modal.Content >
                    <Card fluid>
                            <video title={titre} poster={poster} width='100%' height='100%' preload controls autoPlay src={url} />
                        <Card.Content textAlign='center' className='CardVideoContent'>
                                <div className='video-title'>
                                    <h3>{titre}</h3>
                                </div>
                                <p>{description}</p>
                        </Card.Content>
                    </Card>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default Video
