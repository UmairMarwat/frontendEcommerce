import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom';

import './Slider.css';




const Container = styled.div`
width:100%vw;
height:auto;
display:flex;
`;

const Slide = styled.div`
// height:100vh;
width:100vw;
// display:grid;
// grid-template-columns:50% 50%;
display: flex;
flex-direction: column;
align-items:center;
background-color:#${props=>props.bg};
`;

const ImageContainer = styled.div`
width:100%;
height: 35rem;
overflow: hidden;
position:relative;
`;

const InfoContainer = styled.div`
// flex:1;
width:40%;
padding:50px;
position:relative;
top:45px;
box-sizing:border-box;
// margin-bottom: 150px;
text-align: center;
background-color: transparent;
color: white;
`;
const Title = styled.h1` font-size: 66px;`
const Desc = styled.p` margin:50px 0px; font-size:20px;`
const Button = styled.button`padding:10px; font-size:20px; background-color:transparent

 cursor:pointer; `



const Slider = () => {
  return (
    <Container>
      <Slide bg= "f5fafd">
      <ImageContainer>
      <img className='hero-img posi' src= "https://cdn.originpc.com/img/home/slides/2022/corsair-xeneon-flex-v2.jpg"/>
      <InfoContainer className='posi'>
            <Title > NEW ARRIVAL! </Title>
            <Desc>DON'T COMPROMISE ON QUALITY! GET FLAT 30% OFF ON NEW ARRIVALS.</Desc>
            <div  className='slider-btn'>
              <NavLink to="/productlist">
                <Button> SHOP NOW</Button>
              </NavLink>
            </div>
      </InfoContainer>
      </ImageContainer>
      
      </Slide>
          
      
     
    </Container>
  )
}

export default Slider