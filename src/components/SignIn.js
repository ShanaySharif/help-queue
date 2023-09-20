import React, { useState } from "react";
import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import styled from 'styled-components';

const StyledSignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const StyledTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const StyledMessage = styled.p`
  color: green;
  font-weight: bold;
`;

const StyledErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

function SignIn() {
  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const [signInSuccess, setSignInSuccess] = useState(null);
  const [signOutSuccess, setSignOutSuccess] = useState(null);




  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User successfully signed up 
        setSignUpSuccess(`You've successfully signed up, ${userCredential.user.email}!`)
      })
      .catch((error) => {
        // There was an error with sign up
        setSignUpSuccess(`There was an error signing up: ${error.message}!`)
      });
  }
// new sign in function
function doSignIn(event) {
  event.preventDefault();
  const email = event.target.signinEmail.value;
  const password = event.target.signinPassword.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setSignInSuccess(`You've successfully signed in as ${userCredential.user.email}!`)
    })
    .catch((error) => {
      setSignInSuccess(`There was an error signing in: ${error.message}!`)
    });
}

function doSignOut() {
  signOut(auth)
    .then(function() {
      setSignOutSuccess("You have successfully signed out!");
    }).catch(function(error) {
      setSignOutSuccess(`There was an error signing out: ${error.message}!`);
    });
}

  
return (
  <StyledSignInContainer>
    <StyledTitle>Sign up</StyledTitle>
    <StyledForm onSubmit={doSignUp}>
      <StyledInput
        type='text'
        name='email'
        placeholder='Email'
      />
      <StyledInput
        type='password'
        name='password'
        placeholder='Password'
      />
      <StyledButton type='submit'>Sign up</StyledButton>
    </StyledForm>

    {signUpSuccess && <StyledMessage>{signUpSuccess}</StyledMessage>}

    <StyledTitle>Sign In</StyledTitle>
    {signInSuccess && <StyledMessage>{signInSuccess}</StyledMessage>}
    <StyledForm onSubmit={doSignIn}>
      <StyledInput
        type='text'
        name='signinEmail'
        placeholder='Email'
      />
      <StyledInput
        type='password'
        name='signinPassword'
        placeholder='Password'
      />
      <StyledButton type='submit'>Sign in</StyledButton>
    </StyledForm>

    <StyledTitle>Sign Out</StyledTitle>
    {signOutSuccess && <StyledMessage>{signOutSuccess}</StyledMessage>}
    <StyledButton onClick={doSignOut}>Sign out</StyledButton>
  </StyledSignInContainer>
);
}

export default SignIn;