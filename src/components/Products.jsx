import styled from "styled-components";
import Product from "./Product";

const Container = styled.div`
    padding: 20px;
  
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = (props) => {
  console.log(props)
  return (
    <Container>
      {props.products?.map((item) => (
        <Product props={props.props} item={item} key={item?._id}/>
      ))}
    </Container>
  );
};

export default Products;