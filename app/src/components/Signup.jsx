import React, { useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import { useNavigate } from "react-router-dom";
import styled from "styled-components"; // Import styled-components for CSS-in-JS

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your sign-up logic here, e.g., making an API call to register the user
    navigate('/Home'); // Redirect to Home after successful sign-up
  }

  return (
    <AuthContainer>
      <AuthContent>
        <AuthBox>
          <Form onSubmit={handleSubmit}>
            <WelcomeText>Welcome!</WelcomeText>
            <DetailsText>Please fill in your details to sign up</DetailsText>
            <Input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <SignUpButton type="submit">Sign Up</SignUpButton>
            <LoginText onClick={() => navigate("/Login")}>
              Already have an account? Log in
            </LoginText>
          </Form>
        </AuthBox>
      </AuthContent>
    </AuthContainer>
  );
}

export default Signup;

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

const SignUpButton = styled.button`
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

const LoginText = styled.label`
  color: white;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
