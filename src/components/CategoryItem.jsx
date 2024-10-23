import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px 10px;
  height: 65vh;
  position: relative;
  cursor: pointer; /* Add pointer to indicate it's clickable */
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const CategoryItem = ({ item }) => {
  const navigate = useNavigate();

  // Function to handle the navigation based on the category
  const handleClick = () => {
    if (item.title === "ACCESSORIES!") {
      navigate("/accessories"); // Navigate to Accessories Page
    } else if (item.title === "GRAPHIC CARDS") {
      navigate("/graphic-cards"); // Navigate to Graphic Cards Page
    } else if (item.title === "shops") {
      navigate("/shops"); // Navigate to Packages Page
    }
  };

  return (
    <Container onClick={handleClick}>
      <Image src={item.img} alt={item.title} />
      <Info>
        <Title>{item.title}</Title>
      </Info>
    </Container>
  );
};

export default CategoryItem;