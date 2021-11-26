import React, { useRef } from 'react';
import ReactAudioPlayer from 'react-h5-audio-player';
import { Label, Card, Icon, Image, Segment } from 'semantic-ui-react';


function Audio({ image, title, author, id, src, handlePlay, shouldStop }) {

    return (
        <div className="audio-card">
            <Segment className='audio-background' >
                <Label as='a'corner active >
                <Icon color='red'>{id}</Icon>
                </Label>
                <Image
                    size='medium'
                    src={image}
                />
                <ReactAudioPlayer
                    key={id}
                    id={id}
                    ref={useRef(id)}
                    className='audio-player'
                    controls
                    header={title}
                    footer={author}
                    src={src}
                    onPlay={(e) => {
                        handlePlay(e, 1)
                    }}
                />
                {console.log("Should Stop ==> ", shouldStop)}
            </Segment>
        </div>
    )
}

export default Audio
