import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcements from "../components/Announcements";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { ThreeDots } from 'react-loader-spinner';
import ChatbotComponent from '../components/ChatbotComponent';
import { toast } from 'react-toastify'; // Import toast for notifications

// Styled components
const Container = styled.div`
  color: #e31b21;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 50px;
  justify-content: space-between;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
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
  background-color: ${props => props.color};
  margin-left: 10px;
  cursor: pointer;
`;

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

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Dropdown = styled.select`
  padding: 10px;
  margin-right: 10px;
`;

const Accessories = (props) => {
  const [data, setData] = useState([]); // Holds the list of products
  const [selectedProduct, setSelectedProduct] = useState(null); // Holds the selected product
  const [filter, setFilter] = useState(1); // 1: Default, 2: Low to High, 3: High to Low
  const [category, setCategory] = useState("All"); // Category state
  const [quantity, setQuantity] = useState(1); // State for quantity
  const [mainFlag, setMainFlag] = useState(false); // Flag to trigger re-renders

  useEffect(() => {
    fetch('http://localhost:4000/api/accessory', {
      method: 'get',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch accessories');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        const accessoryIds = data.map(item => item._id); // Assuming the ID field is named '_id'
        console.log("Accessory IDs:", accessoryIds); // Log the array of IDs
      })
      .catch(error => {
        console.error("Error fetching accessories:", error);
      });
  }, [mainFlag]); // Added mainFlag to trigger data refresh
  const addToCart = (pid) => {
    var headers = new Headers();
    let t = JSON.parse(localStorage.getItem("user"));
    headers.append("token", t.accessToken);
  
    let formData = new URLSearchParams();
    formData.append("productId", pid);
    formData.append("quantity", quantity); // Ensure this is the correct value
  
    fetch('http://localhost:4000/api/cart', {
      method: 'post',
      body: formData,
      headers: headers,
    })
    .then((x) => x.json())
    .then((y) => {
      if (y.includes("error")) {
        toast(y);
        return;
      }
      setMainFlag(!mainFlag); // Trigger re-render after adding to cart
      toast("Successfully added to cart");
    })
    .catch(() => {
      toast("Error occurred while adding to cart!");
    });
  };
  

  // Filter products by category
  const filteredProducts = data.filter(product => 
    category === "All" || product.category === category
  );

  return (
    <Container>
      <Navbar props={props} setData={setData} />
      <Announcements />
      <Title>Accessories</Title>

      {/* Dropdown for filtering categories */}
      <FilterContainer>
        <Dropdown onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Mouse">Mouse</option>
          <option value="Keyboard">Keyboard</option>
          <option value="Headset">Headset</option>
          <option value="Gaming Case">Gaming Case</option>
          <option value="Gaming Console">Gaming Console</option>
          <option value="Speakers">Speakers</option>
          <option value="Lcd/led">Lcd/led</option>
          <option value="ssd">ssd</option>
          <option value="Ram">Ram</option>
    
        </Dropdown>

        <Dropdown onChange={(e) => setFilter(Number(e.target.value))}>
          <option value="1">Newest</option>
          <option value="2">Price: Low to High</option>
          <option value="3">Price: High to Low</option>
        </Dropdown>
      </FilterContainer>

      <ThreeDots
        wrapperClass="react-spinner"
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        visible={!filteredProducts.length}
      />

<Products
  products={filteredProducts.sort((a, b) => {
    if (filter === 2) {
      return a.price - b.price; // Sort by price low to high
    } else if (filter === 3) {
      return b.price - a.price; // Sort by price high to low
    } else {
      let first = new Date(a.updatedAt);
      let second = new Date(b.updatedAt);
      return second.getTime() - first.getTime(); // Sort by newest
    }
  })}
  addToCart={addToCart}
/>



      {/* Selected Product Details */}
      <Wrapper style={{ display: selectedProduct ? "flex" : "none" }}>
        <ImgContainer>
          <Image src={selectedProduct?.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{selectedProduct?.title}</Title>
          <Desc>{selectedProduct?.desc}</Desc>
          <Price>$ {selectedProduct?.price * quantity}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color={selectedProduct?.color} />
            </Filter>
          </FilterContainer>
          <AddContainer>
  <AmountContainer>
    <span onClick={() => setQuantity(quantity - 1 > 1 ? quantity - 1 : 1)}>-</span>
    <Amount>{quantity}</Amount>
    <span onClick={() => setQuantity(quantity + 1)}>+</span>
  </AmountContainer>

  <Button onClick={() => {
    console.log(selectedProduct?._id); // Log the selected product ID to check if it exists
    addToCart(selectedProduct?._id);
  }}>
    ADD TO CART
  </Button>
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

export default Accessories;
