import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcements from "../components/Announcements";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import ChatbotComponent from '../components/ChatbotComponent'; 


const Container = styled.div`
color:#e31b21;`;

const Title = styled.h1`
  margin: 20px;
  text-align:center;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;

 
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
 
`;

const Select = styled.select`
  padding: 10px;
  background-color:grey;
  color:white;
  margin-right: 20px;
 
`;
const Option = styled.option`
color:black;`;

const ProductList = (props) => {
  var [data, setData] = useState();
  var [filter, setFilter] = useState(1);
  useEffect(()=>{
      fetch('http://localhost:4000/api/product',{
        method: 'get',
      })
      .then(x=>x.json())
      .then((y)=>{
        console.log(y,"response data")
        setData(y)
      });
    },[]);

  return (
    <Container>
      <Navbar props={props} setData={setData}/>
      <Announcements />
      <Title>Products</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e)=>{setFilter(e.target.value)}}>
            <Option value={1} selected={filter==1}>Newest</Option>
            <Option value={2} selected={filter==2}>Price (asc)</Option>
            <Option value={3} selected={filter==3}>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
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
      <Products props={props} products={data?.sort((a,b)=>{
        if(filter==2) {
          return a.price - b.price;
        } else if(filter==3) {
          return b.price - a.price;
        } else {
          let first = new Date(a.updatedAt);
          let second = new Date(b.updatedAt);

          return second.getTime() - first.getTime();
        }
      })}/>
      <Newsletter />
      <Footer />
         {/* Add the Chatbot Button and Component */}
         <ChatbotComponent />
    </Container>
  );
};

export default ProductList;