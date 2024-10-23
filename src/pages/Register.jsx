import styled from "styled-components";
import { NavLink } from "react-router-dom";
import './Register.css';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: rgb(70, 52, 52);
  box-shadow: 0px 0px 8px 2px rgb(36, 10, 10);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
  color: white;
`;

const Button = styled.button`
  width: 20%;
  border: none;
  padding: 15px 20px;
  background-color: rgb(61, 9, 9);
  color: white;
  cursor: pointer;
`;

const Register = () => {
  var validation = true;

  const validate = () => {
    validation = true; // Reset validation status

    // Regular expressions for validation
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,14}$/; // Assuming a valid phone number length

    // Validate First Name
    let fname = document.getElementById('fname').value;
    if (fname === "" || !nameRegex.test(fname)) {
      document.getElementById('fname').style.border = "2px solid red";
      validation = false;
    } else {
      document.getElementById('fname').style.border = "2px solid green";
    }

    // Validate Last Name
    let lname = document.getElementById('lname').value;
    if (lname === "" || !nameRegex.test(lname)) {
      document.getElementById('lname').style.border = "2px solid red";
      validation = false;
    } else {
      document.getElementById('lname').style.border = "2px solid green";
    }

    // Validate Email
    let email = document.getElementById('email').value;
    if (email === "" || !emailRegex.test(email)) {
      document.getElementById('email').style.border = "2px solid red";
      validation = false;
    } else {
      document.getElementById('email').style.border = "2px solid green";
    }

    // Validate Phone Number
    let userContact = document.getElementById('contact').value;
    if (userContact === "" || !phoneRegex.test(userContact)) {
      document.getElementById('contact').style.border = "2px solid red";
      validation = false;
    } else {
      document.getElementById('contact').style.border = "2px solid green";
    }

    // Validate Password
    let password = document.getElementById('pass').value;
    if (password === "") {
      document.getElementById('pass').style.border = "2px solid red";
      validation = false;
    } else {
      document.getElementById('pass').style.border = "2px solid green";
    }

    // Confirm Password Validation
    let cpass = document.getElementById('cpass').value;
    if (cpass !== password) {
      document.getElementById('cpass').style.border = "2px solid red";
      validation = false;
    } else {
      document.getElementById('cpass').style.border = "2px solid green";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    validate();

    if (validation) {
      const userData = {
        username: document.querySelector("#fname").value + " " + document.querySelector("#lname").value,
        password: document.querySelector("#pass").value,
        email: document.querySelector("#email").value,
        phone: document.querySelector("#contact").value,
        isAdmin: "false"
      };

      fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data, "response data");
        window.location.href = "/login";
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  };

  return (
    <Container className="register-pic">
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="First name" id="fname" />
          <Input placeholder="Last name" id="lname" />
          <Input placeholder="Phone number" id="contact" />
          <Input placeholder="Email" id="email" />
          <Input type="password" placeholder="Password" id="pass" />
          <Input type="password" placeholder="Confirm password" id="cpass" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="button" onClick={handleSubmit}>CREATE</Button><br/>
          <NavLink style={{textDecoration: "none", color: "white", width: "100%", textAlign: "center"}} to='/login'>
            Already have an Account
          </NavLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
