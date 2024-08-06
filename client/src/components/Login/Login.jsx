

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      setMessage("Login successful!");
      const { token, role } = response.data;

      // Save the token in localStorage (or cookies) and navigate based on role
      localStorage.setItem("token", token);

      if (role === "restaurant") {
        navigate("/restauranthome");
      } else if (role === "ngo") {
        navigate("/ngohome");
      } else {
        navigate("/home");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container>
      <LeftSection>
        <BackgroundImage
          src={
            "https://img.freepik.com/free-vector/kid-eating-pizza-concept-illustration_114360-24946.jpg?t=st=1721460400~exp=1721464000~hmac=15091a34c7ec69b99809aaadbdfa768d65a95d05d99e7c92a814b76feb40d0c4&w=740"
          }
          alt="Background Image"
        />
      </LeftSection>
      <RightSection>
        <FormWrapper>
          <Title>Login</Title>
          <Form onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">Login</Button>
            {message && <Message>{message}</Message>}
          </Form>
          <ToggleLink>
            Don't have an account? <StyledLink to="/signup">Signup</StyledLink>
          </ToggleLink>
        </FormWrapper>
      </RightSection>
    </Container>
  );
};

export default LoginPage;

// Styled Components
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

const LeftSection = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 2rem;
  color: #d2649a;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  background: transparent;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #ff7e5f;
  }
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 20px;
  background: #f075aa;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #d2649a;
  }
`;

const ToggleLink = styled.div`
  margin-top: 20px;
  font-size: 0.9rem;
  color: #333;
`;

const StyledLink = styled(Link)`
  color: #d2649a;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const Message = styled.div`
  margin-top: 20px;
  font-size: 0.9rem;
  color: #d2649a;
`;
