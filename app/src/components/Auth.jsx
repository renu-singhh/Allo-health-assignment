import React, { useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import { useNavigate } from "react-router-dom";
import styled from "styled-components"; // Import styled-components for CSS-in-JS
import Signup from './Signup'; // Import the Signup component

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here, e.g., making an API call to authenticate the user
    navigate('/Home'); // Redirect to Home after successful login
  }

  return (
    <AuthContainer>
      <AuthContent>
        <AuthBox>
          <Form onSubmit={handleLoginSubmit}>
            <WelcomeText>Welcome Back!</WelcomeText>
            <DetailsText>Please enter your details</DetailsText>
            <Input
              type="email"
              placeholder="Email ID"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoginButton type="submit">Login</LoginButton>
            <SignUpText onClick={() => navigate("/signup")}>
              Don't have an account? Sign Up
            </SignUpText>
          </Form>
        </AuthBox>
      </AuthContent>
    
    </AuthContainer>
  );
}

export default Auth;

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  background-color: #49243E;
  margin: 2rem;
  padding: 20px;
  background-size: cover;
  background-position: center;
  background-color: rgba(0,0,0,0.5);
`;

const AuthContent = styled.div`
  border: 1px solid black;
  padding: 20px;
  gap: 2rem;
  background-color: #27272a;
  border-radius: 0.5rem;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AuthBox = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  opacity: 0.7;
`;

const WelcomeText = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
  color: #cb8a76;
`;

const DetailsText = styled.p`
  color: white;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: none;
  width: 100%;
`;

const LoginButton = styled.button`
  border: 1px solid black;
  background-color: #27272a;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #3b3b3b;
  }
`;

const SignUpText = styled.label`
  color: white;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
