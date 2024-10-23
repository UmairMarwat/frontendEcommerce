import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcements from "../components/Announcements";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios'; // For API requests

// Styled components
const Container = styled.div`
  color: #e31b21;
`;

const Title = styled.h1`
  margin: 20px;
  text-align: center;
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
  background-color: grey;
  color: white;
  margin-right: 20px;
`;

const Option = styled.option`
  color: black;
`;

const Packages = (props) => {
  const [shops, setShops] = useState([]); // Store shops
  const [data, setData] = useState([]);  // Store products
  const [selectedShop, setSelectedShop] = useState('');  // Selected shop ID

  // Fetch shops
  useEffect(() => {
    axios.get('http://localhost:5000/api/shop')
      .then(response => setShops(response.data)) // Set fetched shops
      .catch(error => console.error("Error fetching shops:", error));
  }, []);

  // Fetch products when a shop is selected
  useEffect(() => {
    if (selectedShop) {
      axios.get(`http://localhost:5000/api/package?shopId=${selectedShop}`)
        .then(response => setData(response.data))
        .catch(error => console.error("Error fetching packages:", error));
    }
  }, [selectedShop]);

  return (
    <Container>
      <Navbar props={props} />
      <Announcements />
      <Title>Select a Shop</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Select Shop by ID:</FilterText>
          <Select
            onChange={(e) => setSelectedShop(e.target.value)}
            value={selectedShop}
          >
            <Option value="" disabled>Select a shop</Option>
            {shops.map((shop) => (
              <Option key={shop.id} value={shop.id}>
                {shop.id} - {shop.name} {/* Displaying shop by ID and Name */}
              </Option>
            ))}
          </Select>
        </Filter>
      </FilterContainer>

      {/* Loader when fetching products */}
      <ThreeDots
        wrapperClass="react-spinner"
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        visible={!data.length && selectedShop}
      />

      {/* Show products or no products message */}
      {data.length > 0 ? (
        <Products
          props={props}
          products={data} // Pass product data to the Products component
        />
      ) : (
        selectedShop && <p>No products available for this shop.</p>
      )}

      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Packages;
