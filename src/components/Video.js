import React, { useState } from "react";
import { Segment, Image, Card, Modal, SegmentGroup, Icon } from "semantic-ui-react";

const Video = ({ src, url, description, titre, duree, poster }) => {
	const [open, setOpen] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const handleOpen = (e, settings) => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const activateCard = () => {
		setIsActive(true);
	};

	const deactivateCard = () => {
		setIsActive(false);
	};

	return (
		<div onMouseEnter={activateCard} onMouseLeave={deactivateCard}>
			<Segment basic disabled={!isActive}>
				<Card
					onClick={(e) => {
						handleOpen(e, { contenu: url });
					}}
                >
                    <Image src={src}/>
                    {/* <Segment attached className='video-description'>
                        <Icon name="play"/>
                    </Segment> */}
				</Card>
				<Modal open={open} onClose={handleClose} basic>
					<Modal.Content>
						<Card fluid>
							<video
								title={titre}
								poster={poster}
								width="100%"
								height="100%"
								preload
								controls
								autoPlay
								src={url}
							/>
							<Card.Content textAlign="center" className="CardVideoContent">
								<div className="video-title">
									<h3>{titre}</h3>
								</div>
								<p>{description}</p>
							</Card.Content>
						</Card>
					</Modal.Content>
				</Modal>
			</Segment>
		</div>
	);
};

export default Video;
