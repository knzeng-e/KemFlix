import React, { useState } from 'react';
import { Container, Form, Icon, Label, Segment, Checkbox, Button, Divider, Header } from 'semantic-ui-react';

const Signup = ({ userAddress }) => {


    const options = [
        { key: 'm', text: 'Male', value: 'male' },
        { key: 'f', text: 'Female', value: 'female' },
        { key: 'o', text: 'Other', value: 'other' },
    ]
    return (
        <Container className='SignUp-form' >
            <Segment.Group >
                {/* <Segment inverted color='teal' padded='very'> */}
                <Segment inverted color='teal'>
                    <Header>
                        <Icon name='address card' />
                        Create an account
                    </Header>
                </Segment>
                <Segment>
                    <Label pointing='right'>
                        Your blockchain address
                    </Label>
                    {userAddress}
                </Segment>
                <Segment raised padded='very'>
                    <Form >
                        <Form.Group widths='equal'>
                            <Form.Field required>
                                <label>First name</label>
                                <input placeholder='Enter your first name' />
                            </Form.Field>
                            <Form.Field required>
                                <label>First name</label>
                                <input placeholder='Enter your last name' required />
                            </Form.Field>
                        </Form.Group >

                        <Form.Group widths='equal'>

                            <Form.Field required>
                                <label>user name</label>
                                <input placeholder='Choose a user name' />
                            </Form.Field>

                            <Form.Field required>
                                <label>Email</label>
                                <input type='email' placeholder='Enter your email' />
                            </Form.Field>
                        </Form.Group>
                        <Form.Select
                            required
                            options={options}
                            placeholder='Select your gender'
                            label="Gender"
                        />
                    </Form>
                </Segment>
                <Segment>
                    <Form.Field required>
                        <Checkbox
                            inline
                            label='I agree to the Terms and Conditions'
                        />
                    </Form.Field>

                    <Form.Field className='login-card'>
                        <Button inverted className='login-button' type='submit'>Submit</Button>
                    </Form.Field>
                </Segment>
            </Segment.Group>
        </Container>
    )
}

export default Signup;