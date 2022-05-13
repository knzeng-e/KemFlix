import { useLogin } from "./useLogin";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Segment, Menu, Label } from "semantic-ui-react";
import { rubriques, renderPage } from "../utils/layoutUtils";

const Account = ({ address }) => {
    return (
        <>
            <Label active tag className="label-user" size="small">
                {address}
                user
            </Label>
        </>
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
