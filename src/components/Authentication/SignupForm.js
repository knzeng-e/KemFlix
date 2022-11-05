import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

import {
	Container,
	Form,
	Icon,
	Label,
	Segment,
	Checkbox,
	Button,
	Dimmer,
	Header,
	Message,
	Loader,
	Divider,
} from "semantic-ui-react";
import { useLogin } from "../../hooks";
import * as MembershipContract from "../../artifacts/contracts/facets/MembershipFacet.sol/MembershipFacet.json";

const Signup = ({ userAddress, web3Infos }) => {
	const [email, setEmail] = useState("");
	const [gender, setGender] = useState("");
	const [lastName, setlastName] = useState("");
	const [userName, setuserName] = useState("");
	const [firstName, setFirstName] = useState("");
	const [isRegistered, setisRegistered] = useState(false);
	const [agreementStatus, setAgreementStatus] = useState(false);
	const [errorMessage, setErrormessage] = useState("");
	const [registration, setRegistration] = useState(false);
	const [isConnected] = useLogin();
	const [dimmerStatus, setDimmerStatus] = useState(false);

	const GENDER_SELECTION_ERROR = "Please select your gender";
	const TERMS_AND_CONDITION_ERROR =
		"You need to read and accept terms and conditions";
	const CONTRACT_ADDRESS = "0x6e717C87Db03aBd92b9Fe7aeE7F649164b4F6edA";

	const handleSignup = async (e) => {
		console.log("Signing Up");
		console.log(`firstName:  ${firstName}`);
		console.log(`lastName:  ${lastName}`);
		console.log(`userName:  ${userName}`);
		console.log(`Email:  ${email}`);
		console.log(`Gender:  ${gender}`);
		console.log(`Has agreed:  ${agreementStatus}`);
		if (gender === "") {
			setErrormessage(GENDER_SELECTION_ERROR);
		} else if (!agreementStatus) {
			setErrormessage(TERMS_AND_CONDITION_ERROR);
		} else {
			if (errorMessage.length) {
				setErrormessage("");
			}
			setRegistration(true);
			setDimmerStatus(true);
			await registerUser();
			setDimmerStatus(false);
			if (isRegistered) {
				window.location.reload();
			}
		}
	};

	const handleLastName = (e) => {
		setlastName(e.target.value);
	};
	const handleUsername = (e) => {
		setuserName(e.target.value);
	};

	const handleFirstName = (e) => {
		setFirstName(e.target.value);
	};
	const handleMail = (e) => {
		setEmail(e.target.value);
	};
	const handleAgreement = (e) => {
		setAgreementStatus((current) => {
			return !current;
		});
	};

	const handleGender = (e) => {
		setGender(e.target.outerText);
		console.log(e.target.outerText);
	};

	const registerUser = async () => {
		const _provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = _provider.getSigner();

		const membershipContract = new ethers.Contract(
			CONTRACT_ADDRESS,
			MembershipContract["abi"],
			signer
		);

		const formatedUserName = ethers.utils.formatBytes32String(userName);
		try {
			const tx = await membershipContract.register(formatedUserName);
			await tx.wait();
			setRegistration(false);
			setisRegistered(true);
			console.log("Registering user :: ", formatedUserName, tx);
		} catch (error) {
			const errorMsg = JSON.parse(JSON.stringify(error));
			setRegistration(false);
			setErrormessage(errorMsg["reason"]);
		}
	};

	const options = [
		{ key: "f", text: "Female", value: "female" },
		{ key: "m", text: "Male", value: "male" },
		{ key: "o", text: "Other", value: "other" },
	];

	return (
		<Container className="SignUp-form">
			<Segment.Group>
				<Segment inverted color="teal" padded="very">
					<Header title="Decline your ID">
						<Icon name="address card" />
						KOMBO
					</Header>
				</Segment>
				<Segment>
					<Label pointing="right">Your blockchain address</Label>
					{userAddress}
				</Segment>
				<Segment>
					{errorMessage.length !== 0 && (
						<Message header="" error={true} content={errorMessage} />
					)}
					<Form onSubmit={handleSignup}>
						<Segment basic padded="very">
							<Form.Group widths="equal">
								<Form.Field required>
									<label>First name</label>
									<input
										onChange={handleFirstName}
										placeholder="Enter your first name"
										required
									/>
								</Form.Field>
								<Form.Field required>
									<label>Last name</label>
									<input
										onChange={handleLastName}
										placeholder="Enter your last name"
										required
									/>
								</Form.Field>
							</Form.Group>

							<Form.Group widths="equal">
								<Form.Field required>
									<label>user name</label>
									<input
										onChange={handleUsername}
										placeholder="Choose a user name"
										required
									/>
								</Form.Field>

								<Form.Field required>
									<label>Email</label>
									<input
										onChange={handleMail}
										type="email"
										placeholder="Enter your email"
										required
									/>
								</Form.Field>
							</Form.Group>
							<Form.Select
								options={options}
								placeholder="Select your gender"
								label="Gender"
								onChange={handleGender}
							/>
						</Segment>

						<Segment basic>
							{/* TO-DO: Write and link terms and conditions */}
							<Form.Field>
								<Checkbox
									onChange={handleAgreement}
									label="I agree to the Terms and Conditions"
								/>
							</Form.Field>
							<Form.Field className="login-card">
								<Button inverted className="login-button" type="submit">
									Bassé
								</Button>
							</Form.Field>
						</Segment>
					</Form>
				</Segment>
				<Dimmer active={registration}>
					<Loader indeterminate>{`
          ${userName}, please sign transaction and wait ... `}</Loader>
				</Dimmer>
			</Segment.Group>
			<Dimmer page className="login-card" active={isRegistered}>
          <Icon name="check" color="teal"/> <strong>{userName}</strong> Bassé ! :)
				<Divider />
        <Button
          inverted
					color="black"
					onClick={() => {
						window.location.reload();
					}}
				>
					BASSÉ
				</Button>
			</Dimmer>
			<Dimmer page active={errorMessage.length} className="login-card">
          <Icon name="ban" color="red"/> {errorMessage}
				<Divider />
        {/* <Button
          inverted
					color="black"
					onClick={() => {
						window.location.reload();
					}}
				>
					Cancel
				</Button> */}
        <Button
          inverted
					color="black"
					onClick={() => {
						window.location.reload();
					}}
				>
					Retry
				</Button>
			</Dimmer>
		</Container>
	);
};

export default Signup;
