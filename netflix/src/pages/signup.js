import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase';
import { Form } from '../components';
import { HeaderContainer } from '../containers/header';
import { FooterContainer } from '../containers/footer';
import { userServiceCreate } from '../services';
import * as ROUTES from '../constants/routes';

export default function SignUp() {
  const native = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const [firstName, setFirstName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isInvalid = firstName === '' || password === '' || emailAddress === '';

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const loadRazorpay = async (name, email) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onerror = () => {
          alert("Failed to load Razorpay SDK. Are you online?");
        };
        document.body.appendChild(script);
    
        script.onload = async () => {
          const options = {
            key: 'rzp_test_buLGBnuqCne5wW', // Enter the Key ID generated from the Razorpay Dashboard
            amount: "50000", // Amount is in currency subunits. Example: 50000 paise = INR 500
            currency: "INR",
            name: "Netflix Subscription",
            description: "Test Transaction",
            image: "https://cdn.razorpay.com/logos/IQvaOopWRPLzkQ_medium.png", // Optional: Logo URL
            handler: function (response) {
              alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
              // You can send the payment ID to your backend for further processing
            },
            prefill: {
              name: name,
              email: email,
              contact: "9999999999"
            },
            notes: {
              address: "Your Address"
            },
            theme: {
              color: "#3399cc"
            }
          };
    
          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
        };
      };



      const formData = new FormData();
      formData.append('name',firstName);
      formData.append('email',emailAddress);
      await loadRazorpay(firstName, emailAddress);
      formData.append('subscribed', true);
      const today = new Date();
      const date = today.getDate();
      const month = today.getMonth() + 1; // Months are zero-indexed
      const year = today.getFullYear();
      formData.append('subsciption_end_date', `${date}-${month}-${year}`);
      await userServiceCreate(formData);
    } catch (error) {
      setFirstName('');
      setEmailAddress('');
      setPassword('');
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
            native(ROUTES.BROWSE);
          })
      )
      .catch((error) => {
        setFirstName('');
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      });
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
              type="password"
              value={password}
              autoComplete="off"
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
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
