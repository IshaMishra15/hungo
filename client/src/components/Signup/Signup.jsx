import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("ngo"); // Default role
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/signup", {
        email,
        password,
        role,
        restaurantName: role === "restaurant" ? restaurantName : undefined,
        address: role === "restaurant" ? address : undefined,
      });
      setMessage("Signup successful! Please log in.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Container>
      <LeftSection>
        <BackgroundImage
          src="https://img.freepik.com/free-vector/kid-eating-pizza-concept-illustration_114360-24946.jpg?t=st=1721460400~exp=1721464000~hmac=15091a34c7ec69b99809aaadbdfa768d65a95d05d99e7c92a814b76feb40d0c4&w=740"
          alt="Background Image"
        />
      </LeftSection>
      <RightSection>
        <FormWrapper>
          <Title>Signup</Title>
          <Form onSubmit={handleSignup}>
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
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="ngo">NGO</option>
              <option value="restaurant">Restaurant</option>
            </Select>
            {role === "restaurant" && (
              <>
                <Input
                  type="text"
                  placeholder="Restaurant Name"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  required
                />
                <Input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </>
            )}
            <Button type="submit">Signup</Button>
            {message && <Message>{message}</Message>}
          </Form>
          <ToggleLink>
            Already have an account? <StyledLink to="/login">Login</StyledLink>
          </ToggleLink>
        </FormWrapper>
      </RightSection>
    </Container>
  );
};

export default SignupPage;

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

const Select = styled.select`
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
