import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styled from "styled-components";


const Container = styled.div`
  height: 60vh;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;

`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: #1e1f24;
  color: white;
`;

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e)=>{
    if(!validateEmail(email && email)) {
      toast("email is not valid");
      return;
    }
    var formData = new URLSearchParams();
    formData.append("email",email && email);
    console.log(email && email)
    fetch("http://localhost:4000/api/save-email",{
      method: "post",
      body: formData,
    })
    .then(x=>x.json())
    .then(y=>{
      setEmail("")
      toast(y);
    })
    .catch(err=>{
      toast(err)
    })
  }
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      <InputContainer>
        <Input placeholder="Your email" required value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        <Button onClick={handleSubmit}>
          <SendIcon/>
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;

