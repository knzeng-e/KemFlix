import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import React, { useEffect, useState } from "react";
import { Segment, Menu, Icon } from "semantic-ui-react";
import { rubriques, renderPage } from "../utils/layoutUtils";

const Account = ({ address, username }) => {
	const [showFullAddress, setShowFullAddress] = useState(false);

	const toggleAddress = () => setShowFullAddress(!showFullAddress);
	return (
		<Segment basic>
			<div className="userName">
				<h4>{username}</h4>
				<div onClick={toggleAddress} className="userAddress">
					<Icon circular size="small" name="key" color="teal" />
					{showFullAddress
						? address
						: `${address.substr(0, 6)} ... ${address.substr(
								address.length - 5
						  )}`}
				</div>
				{/* <Icon onClick={() => { console.log(window.ethereum) }} circular size="small" name="log out" color="teal" /> */}
			</div>
		</Segment>
	);
};

const NavBar = () => {
	const [
		username,
		web3Infos,
		isConnected,
		setWeb3Infos,
		setIsConnected,
		metamaskConnect,
		isUserRegistered,
	] = useLogin();

	const [activeItem, setActiveItem] = useState("home");

	useEffect(() => {}, [isConnected]);

	if (isConnected) {
		return (
			<Segment className="Navbar" size="large">
				<h1>
					<Link className="title" to="/">
						Kem'Flix
					</Link>
				</h1>
				<Menu pointing secondary stackable>
					{rubriques.map((onglet, index) => {
						return (
							<Link to={renderPage(onglet)} key={index}>
								<Menu.Item
									key={index}
									className="menu-label"
									name={onglet}
									active={activeItem === onglet}
									onClick={() => {
										setActiveItem(onglet);
									}}
								/>
							</Link>
						);
					})}
				</Menu>
				<Account username={username} address={web3Infos.connectedAccount} />
			</Segment>
		);
	}
	return (
		<Segment className="Navbar" size="large">
			<h1>
				<Link className="title" to="/">
					Kem'Flix
				</Link>
			</h1>
			<Menu pointing secondary stackable></Menu>
			<Account username="Not Connected" address="" />
		</Segment>
	);
};

export default NavBar;
