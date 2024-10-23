import './Login.css';
import styled from "styled-components";
import Navbar from '../components/Navbar'
import { Navigate, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  margin-top: 1rem;
  width: 25%;
  height: 52%;
  padding: 20px;
  background-color:#1B1C25;
  box-shadow: 0px 0px 8px 1px rgb(212, 212, 212)
 
`;

const Title = styled.h1`
  margin: 2rem 0;
  font-size: 24px;
  font-weight: 300;
  color: white;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: rgb(61, 9, 9);
  color: white;
  cursor: pointer;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: white;
`;

const Login = () => {
  var validation = false;
  const validate = () =>{
    let username = document.getElementById('username').value;
    if(username == ""){
      document.getElementById('username').style.border="2px solid red"
      validation=false;
    }else{
      document.getElementById('username').style.border = "2px solid green"
      validation=true;
    }
    let pass = document.getElementById('pass').value;
    if(pass == ""){
      document.getElementById('pass').style.border="2px solid red"
      validation=false;
    }else{
      document.getElementById('pass').style.border = "2px solid green"
      validation=true;
    }
  }
  // let navigate = Navigate()
  // let register = () =>{
  //   navigate('/Register')
  // }

  var handleSubmit = (e)=>{
    validate();
    if(validation) {
      var urlencoded = new URLSearchParams();
      urlencoded.append("email",document.querySelector("#username").value);
      urlencoded.append("password",document.querySelector("#pass").value);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      fetch('http://localhost:4000/api/auth/login',{
        method: 'post',
        headers: myHeaders,
        body: urlencoded
      })
      .then((x)=>{
        if (x.status!=200) {
          x.json().then((y)=>{
            console.log(y);
            toast(y);
            return false;
          })
        }
        return x.json();
      })
      .then((y)=>{
        console.log(y,"response data")
        localStorage.setItem("user",JSON.stringify(y));
        window.location.href = "/";
      })
    }
  }

  return (
    <div>
      {/* <Navbar/> */}
    <Container className="login-pic">
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="username" id='username' />
          <Input type="password" placeholder="password" id='pass'/>
          <Button type='button' onClick={handleSubmit}>LOGIN</Button>
          {/* <Link>Forgot Password?</Link> */}
          <NavLink style={{textDecoration: "none",color: "white"}} to='/Register'>Create New Account</NavLink>
        </Form>
      </Wrapper>
    </Container>
    </div>
  );
};

export default Login;