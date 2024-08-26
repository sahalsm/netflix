import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase';
import { Form } from '../components';
import { HeaderContainer } from '../containers/header';
import { FooterContainer } from '../containers/footer';
import { distributorServiceCreate } from '../services';
import * as ROUTES from '../constants/routes';
import {ethers} from 'ethers';

export default function SignUp() {
  const native = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const [firstName, setFirstName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isInvalid = firstName === '' || password === '' || emailAddress === '' || companyName === '' ;

  const handleSignup = async (event) => {
    event.preventDefault();
    try{
      const formData = new FormData();
      formData.append('name',firstName);
      formData.append('email',emailAddress.toLowerCase());
      formData.append('company_name',companyName);
      formData.append('payment_id',paymentId);

      await distributorServiceCreate(formData);
    } catch (error) {
      setFirstName('');
      setEmailAddress('');
      setPassword('');
      setCompanyName('');
      setPaymentId('');
      setError(error.message);
    }

    return firebase
      .auth()
      .createUserWithEmailAndPassword(emailAddress, password)
      .then((result) =>
        result.user
          .updateProfile({
            displayName: firstName,
            photoURL: Math.floor(Math.random() * 5) + 1,
          })
          .update
          .then(() => {
            native(ROUTES.DISTRIBUTOR);
          })
      )
      .catch((error) => {
        setFirstName('');
        setEmailAddress('');
        setPassword('');
        setCompanyName('');
        setError(error.message);
      });
  };

  const handleGetMetaMaskID = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setPaymentId(accounts[0]); // Set the first account ID as paymentId
      } catch (error) {
        setError('Failed to connect to MetaMask');
      }
    } else {
      setError('MetaMask is not installed');
    }
  };

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign Up</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}

          <Form.Base onSubmit={handleSignup} method="POST">
            <Form.Input
              placeholder="First name"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
            <Form.Input
              placeholder="Email address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <Form.Input
              placeholder="Company name"
              value={companyName}
              onChange={({ target }) => setCompanyName(target.value)}
            />
            <Form.Input
              placeholder="MetaMask Account ID"
              value={paymentId}
              onChange={({ target }) => setPaymentId(target.value)}
            />
            <Form.Input
              type="password"
              value={password}
              autoComplete="off"
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <Form.FButton type="button" onClick={handleGetMetaMaskID}>
              Get MetaMask ID
            </Form.FButton>
            <Form.Submit disabled={isInvalid} type="submit" data-testid="sign-up">
              Sign Up
            </Form.Submit>
          </Form.Base>

          <Form.Text>
            Already a user? <Form.Link to="/signin">Sign in now.</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.
          </Form.TextSmall>
        </Form>
      </HeaderContainer>
      <FooterContainer />
    </>
  );
}
