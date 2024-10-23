import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styled components for the form
const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  background-color: white; /* Set the background color to white */
  padding: 20px; /* Add some padding */
  border-radius: 8px; /* Optional: add border-radius for rounded corners */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Optional: add a slight shadow */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 45%;
  background-color: white; /* Optional: set the form's background color to white */
  padding: 20px; /* Add padding to the form */
  border-radius: 8px; /* Optional: add border-radius for rounded corners */
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  margin: 10px 0;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const DataDisplay = styled.div`
  width: 45%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white; /* Set the background color to white */
`;

// Main Component
const ShopForm = () => {
  const [shop, setShop] = useState({
    shopName: '',
    phoneNumber: '',
    email: '',
    address: '',
    zipCode: '',
    password: '',
  });
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShop((prevShop) => ({ ...prevShop, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/shop', shop);
      setSubmittedData(response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response.data); // Server error details
      } else {
        console.error('Error submitting form', error);
      }
    }
  };
  

  const handleFetchShop = async () => {
    if (!submittedData) return; // Return if no submitted data
    try {
      const response = await axios.get(`http://localhost:5000/api/shop/${submittedData._id}`); // Fixed backtick
      setSubmittedData(response.data); // Update submitted data with fetched data
    } catch (error) {
      console.error('Error fetching shop data', error);
    }
  };
  

  const handleFetchAllShops = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/shop'); // Fetch all shops
      console.log(response.data); // Log or handle the response data as needed
      // You might want to display this data in your UI or process it further
    } catch (error) {
      console.error('Error fetching all shops', error);
    }
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <h2>Create Shop</h2>
        <Input
          type="text"
          name="shopName"
          placeholder="Shop Name"
          value={shop.shopName}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={shop.phoneNumber}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={shop.email}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="address"
          placeholder="Address"
          value={shop.address}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          value={shop.zipCode}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={shop.password}
          onChange={handleChange}
          required
        />
        <Button type="submit">Submit</Button>
        <Button type="button" onClick={handleFetchAllShops}>Fetch All Shops</Button> {/* Button to fetch all shops */}
      </Form>

      {submittedData && (
        <DataDisplay>
          <h2>Shop Details</h2>
          <p><strong>Shop Name:</strong> {submittedData.shopName}</p>
          <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Address:</strong> {submittedData.address}</p>
          <p><strong>Zip Code:</strong> {submittedData.zipCode}</p>
          <p><strong>Password:</strong> {submittedData.password}</p>
          <Button onClick={handleFetchShop}>Fetch Shop Details</Button>
        </DataDisplay>
      )}
    </FormWrapper>
  );
};

export default ShopForm;