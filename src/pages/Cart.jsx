import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import styled from "styled-components";
import Announcements from "../components/Announcements";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Container = styled.div`
color:white;`;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  aspect-ratio: 1/1;
  height: 200px;
  border-radius: 7px;
  background-color: #f2f2f2;
  object-fit: cover;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 1px solid black;
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = (props) => {
  var [data, setData] = useState();
  var [flag, setFlag] = useState(false);
  var [subtotal, setSubtotal] = useState(0);
  var [total, setTotal] = useState(0);

  var headers = new Headers();
  let t = JSON.parse(localStorage.getItem("user"));
  headers.append("token", t.accessToken);

  useEffect(() => {
    fetch('http://localhost:4000/api/cart', {
      method: 'GET',
      headers: headers,
    })
      .then((x) => x.json())
      .then((y) => {
        console.log('API response:', y); // Check the API response here
        setData(y);
        let sub_t = 0;
        y.products.forEach((x) => {
          sub_t += x.product.price * x.quantity;
        });
        setSubtotal(sub_t);
        setTotal(sub_t + (props?.charges || 0) - (props?.discount || 0));
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, [flag, headers, props?.charges, props?.discount]); // Add missing dependencies here
  
  const handleQuantity = (pid, q) => {
    let q_container = document.querySelector("#pq_" + pid);
    let quantity = parseInt(q_container.innerHTML);

    var formData = new URLSearchParams();
    formData.append("pid", pid);
    formData.append("quantity", (quantity + q > 1) ? quantity + q : 1);

    fetch("http://localhost:4000/api/cart-quantity", {
      method: "post",
      body: formData,
      headers: headers,
    })
    .then(x => x.json())
    .then(() => {
      setFlag(!flag); // Toggle the flag to re-fetch cart data
    })
    .catch(err => {
      console.log(err);
    });
  };

  const handleDelete = (pid) => {
    var body = new URLSearchParams();
    body.append("productId", pid);
    fetch('http://localhost:4000/api/del-cart', {
      method: "post",
      headers: headers,
      body: body,
    })
    .then(x => x.json())
    .then(() => {
      toast("successfully deleted!");
      setFlag(!flag); // Toggle the flag to refresh data
      props.setMainFlag(!props.mainFlag);
    })
    .catch(err => {
      toast("error while deleting!");
    });
  };

  return (
    <Container>
      <Announcements />
      <Navbar props={props}/>
      
      <props.ThreeDots wrapperClass="react-spinner"
        height="80" 
        width="80" 
        radius="9"
        color="#4fa94d" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={data ? false : true}
      />
      
      <Wrapper style={{display: data ? "block" : "none"}}>
        <Title>YOUR BAG</Title>

        <Bottom>
          <Info>
            {data?.products.map(x => {
              return (
                <Product key={x.product._id}>
                  <ProductDetail>
                    <Image src={x.product.img} />
                    <Details>
                      <ProductName><b>Product:</b> {x.product.title}</ProductName>
                      <ProductId><b>Category:</b> {x.product.category}</ProductId>
                      <p style={{textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", width: "200px"}}>
                        {x.product.desc}
                      </p>
                      <div style={{width: "100%", display: "flex", gap: "1rem", alignItems: "center"}}>
                        <ProductColor color={x.product.color} />
                        <Button onClick={() => handleDelete(x.product._id)}>delete</Button>
                      </div>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <AddIcon onClick={() => handleQuantity(x.productId, 1)} />
                      <ProductAmount id={'pq_' + x.productId}>{x.quantity}</ProductAmount>
                      <RemoveIcon onClick={() => handleQuantity(x.productId, -1)} />
                    </ProductAmountContainer>
                    <ProductPrice id={'pp_' + x.productId}>$ {x.product.price * x.quantity}</ProductPrice>
                  </PriceDetail>
                </Product>
              )
            })}
          </Info>
          
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            
            {/* Subtotal */}
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {subtotal}</SummaryItemPrice>
            </SummaryItem>
            
            {/* Estimated Shipping */}
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ {subtotal > 30 ? 0 : props?.charges}</SummaryItemPrice>
            </SummaryItem>
            
            {/* Shipping Discount */}
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ {subtotal > 30 ? props?.charges : 0}</SummaryItemPrice>
            </SummaryItem>
            
            {/* Total */}
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {subtotal > 30 ? subtotal : subtotal + props?.charges - props?.discount}</SummaryItemPrice>
            </SummaryItem>
            
            {/* Checkout Button */}
            <Link to="/Checkout">
              {data?.products?.length ? (
                <Button>CHECKOUT NOW</Button>
              ) : (
                <Button disabled={true}>CHECKOUT NOW</Button>
              )}
            </Link>
          </Summary>
        </Bottom>
      </Wrapper>
      
      <Footer />
    </Container>
  );
};

export default Cart;
