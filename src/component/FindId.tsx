import React, { useState } from "react";
import styled from "styled-components";
import logo from "./logo.png";

function FindIdPage() {
  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 아이디 찾기 로직을 여기에 추가하세요.
    console.log("Finding ID for:", email);
  };

  return (
    <Container>
      <LogoWrapper>
        <LogoImage src={logo} />
      </LogoWrapper>
      <Form onSubmit={handleSubmit}>
        <Title>아이디 찾기</Title>
        <InputContainer>
          <Label htmlFor="email">이메일</Label>
          <Input type="email" id="email" value={email} onChange={handleInputChange} required />
        </InputContainer>
        <Button type="submit">아이디 찾기</Button>
        <Footer>
          <Link href="/signup">회원가입</Link>
          <Link href="/login">로그인</Link>
        </Footer>
      </Form>
    </Container>
  );
}

export default FindIdPage;

const LogoWrapper = styled.div``;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  max-width: 480px;
  border: 1px solid #dbdbdb;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  width: 300px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: #333;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 1rem;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;

  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  color: white;
  background-color: #6c63ff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #5a54d7;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  font-size: 0.9rem;
  color: #555;
`;

const Link = styled.a`
  color: #555;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
