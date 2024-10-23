import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from "styled-components";
import Announcements from "../components/Announcements";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import ChatbotComponent from '../components/ChatbotComponent'; 

const Container = styled.div`
color:white;`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;

`;

const ImgContainer = styled.div`
 flex: 1;
  object-fit: cover;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
 
`;

const InfoContainer = styled.div`
  padding: 0px 50px;
 flex: 1 ;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  border: 1px solid black;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;

`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = (props) => {
  let idd = window.location.pathname.split("/")[2]
console.log(idd)
  var [data, setData] = useState();
  var [quantity, setQuantity] = useState(1);
  useEffect(()=>{
    fetch('http://localhost:4000/api/product/'+idd,{
      method: 'get',
    })
    .then(x=>x.json())
    .then((y)=>{
      console.log(y,"response data")
      setData(y)
    });
  },[]);

  const addToCart = (pid)=>{
    var headers = new Headers();
    let t = JSON.parse(localStorage.getItem("user"));
    headers.append("token",t.accessToken);

    let formData = new URLSearchParams();
    formData.append("productId",pid);
    formData.append("quantity",quantity);

    fetch('http://localhost:4000/api/cart',{
      method: 'post',
      body: formData,
      headers: headers
    })
    .then(x=>x.json())
    .then((y)=>{
      console.log(y);
      if(y.includes("error")) {
        toast(y);
        return;
      }
      props.setMainFlag(!props.mainFlag);
      toast("successfully added to cart");
    })
    .catch((err)=>{
      toast("error occured adding to cart!");
    });
  }

  return (
    <Container>
      <Navbar props={props}/>
      <Announcements />
      <props.ThreeDots wrapperClass="react-spinner"
        height="80" 
        width="80" 
        radius="9"
        color="#4fa94d" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={(data)?false:true}
        />
      <Wrapper style={{display:(data)?"flex":"none"}}>
        <ImgContainer>
          <Image src={data?.img}/>
        </ImgContainer>
        <InfoContainer>
          <Title>{data?.title}</Title>
          <Desc>
            {data?.desc}
          </Desc>
          <Price>$ {data?.price * quantity}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color={data?.color} />
            </Filter>
            
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon onClick={(e)=>{setQuantity(quantity-1>1?quantity-1:1)}}/>
              <Amount>{quantity}</Amount>
              <AddIcon onClick={(e)=>{setQuantity(quantity+1)}}/>
            </AmountContainer>
            <Button onClick={(e)=>{
              addToCart(data?._id);
            }}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
        {/* Add the Chatbot Button and Component */}
        <ChatbotComponent />
    </Container>
  );
};

export default Product;