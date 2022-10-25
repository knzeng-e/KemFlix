import "./App.css";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Animes from "./components/Animes";
import "semantic-ui-css/semantic.min.css";
import { Button, Icon, Label } from "semantic-ui-react";
import { useLogin, useMenu, useSignup } from "./hooks";
import { Container, Message } from "semantic-ui-react";
import Webradios from "./components/Webradios";
import Formations from "./components/Formations";
import Audiotheque from "./components/Audiotheque";
import Conferences from "./components/Conferences";
import MetaMaskOnboarding from "@metamask/onboarding";
import Documentaires from "./components/Documentaires";
import SignupForm from "./components/Authentication/SignupForm";
import AudioBooks from "./components/audiobooks/Theorie_economique";
import ELeanings from "./components/e-learning/ZTM_Ethereum_Blockchain";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
	const [renderMenu] = useMenu();
	const [hasAccess, setHasAccess] = useState(false);
	const [
		isConnected,
		setIsConnected,
		web3Infos,
		setWeb3Infos,
		metamaskConnect,
		hasMetamask,
	] = useLogin();
	const [isUserRegistered] = useSignup();

	const connection = () => {
		if (window.ethereum) {
			metamaskConnect();
		} else {
			const onboarding = new MetaMaskOnboarding();
			onboarding.startOnboarding();
		}
	};

	const renderKemFlix = () => {
		return (
			<Router>
				<Container className="App">
					{renderMenu()}
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/animes" component={Animes} />
						<Route path="/radio/" component={Webradios} />
						<Route path="/learning/" component={Formations} />
						<Route path="/audiotheque" component={Audiotheque} />
						<Route path="/conferences" component={Conferences} />
						<Route path="/documentaires" component={Documentaires} />
						<Route path="/audiobook/:book_ref" component={AudioBooks} />
						<Route path="/e-learning/:course_ref" component={ELeanings} />
					</Switch>
				</Container>
			</Router>
		);
	};

	const signupForm = () => {
		return (
			<SignupForm
				userAddress={web3Infos.connectedAccount}
				web3Infos={web3Infos}
			/>
		);
	};

	const connectionButton = () => {
		return (
			<Container className="login-page">
				<div className="login-card">
					<Button inverted className="login-button" onClick={connection}>
						KEMFLIX{" "}
						<Label corner color="teal">
							{" "}
							<Icon as={"h2"} name="ethereum" /> web3
						</Label>
						<div className="login-button-text">
							<Icon circular color="red" disabled name="power" />
						</div>
						{window.ethereum && (
							<div>
								<h3 className="login-title"></h3>Bokayé
							</div>
						)}
					</Button>
					<br /> <br />
				</div>
			</Container>
		);
	};

	const installMetamask = () => {
		return (
			<Container className="login-page">
				<Message>
					<Label attached="top" active>
						<div className="web3-error">PLUGIN REQUIRED</div>
					</Label>
					<Message.Header></Message.Header>
					<Message.Content>
						<div className="login-card" onClick={connection}>
							<strong>
								{" "}
								Please install Metamask plugin to access Web 3 app
							</strong>
							<br /> <br />
							<div className="login-button-text">
								<Icon circular fitted color="red" name="download" />
								<br />
								<div>Install Metamask</div>
							</div>
						</div>
					</Message.Content>
				</Message>
			</Container>
		);
	};

	useEffect(() => {
		if (isConnected) {
			if (isUserRegistered) {
				setHasAccess(true);
			}
		}
	}, [isUserRegistered, isConnected]);

	if (isConnected) {
		if (hasAccess) {
			return renderKemFlix();
		} else {
			return signupForm();
		}
	} else {
		if (window.ethereum) {
			return connectionButton();
		} else {
			return installMetamask();
		}
	}
};

export default App;
