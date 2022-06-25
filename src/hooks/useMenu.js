import { useLogin } from "./useLogin";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Segment, Menu, Label, Icon, Card } from "semantic-ui-react";
import { rubriques, renderPage } from "../utils/layoutUtils";

const Account = ({ address }) => {
    const [showFullAddress, setShowFullAddress] = useState(false);

    const toggleAddress = () => setShowFullAddress(!showFullAddress);
    return (
        <Card>
            <Card.Header className="userName">
                {/* TO DO: Retrieve User from Backend */}
                Th0t Nz1g
            </Card.Header>
            <Card.Content className="label-user">
                <Icon circular size="large" name="user circle" />
            </Card.Content>
            <Card.Description className="userAddress">
                <div onClick={toggleAddress}>
                    {showFullAddress ? address : `${address.substr(0, 6)} ... ${address.substr(address.length - 5)}`}
                </div>
            </Card.Description>
        </Card>
    );
}

export const useMenu = () => {
    const [
        isConnected,
        setIsConnected,
        web3Infos,
        setWeb3Infos,
        metamaskConnect
    ] = useLogin();

    const [activeItem, setActiveItem] = useState('home');
    const renderMenu = () => {
        if (isConnected) {
            return (
                <Segment className='Navbar' size='large'>
                    <h1><Link className='title' to='/'>Kem'Flix</Link></h1>
                    <Menu pointing secondary stackable>
                        {rubriques.map((onglet, index) => {
                            return (
                                <Link to={renderPage(onglet)} key={index}>
                                    <Menu.Item
                                        className='Menu'
                                        name={onglet}
                                        active={activeItem === onglet}
                                        onClick={
                                            () => {
                                                setActiveItem(onglet);
                                            }
                                        }
                                    />
                                </Link>
                            )
                        })}
                    </Menu>
                    <Account address={web3Infos.connectedAccount} />
                </Segment>)
        }
    };

    return [renderMenu];
};
