import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search'; 
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
  
  const IconContainer = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
     background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
  `;
  
  const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 250px;
    box-sizing:border-box;
    display: flex;
    align-items: center;
    justify-content: center;
 background-color: #1e1f24;
    position: relative;
    &:hover ${IconContainer}{
      opacity: 1;
    }
  `;
 
  
  const Image = styled.img`
    height: 100%;
    width:100%;
    object-fit:contain;
  `;
  
  const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5 ease;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
  `;
  
  const Product = (props) => {
    const key = props?.item?._id;
    const navigate = useNavigate();
    const handleClick = (e)=>{
      navigate("/productPage/"+key);
    }
    const addToCart = (pid)=>{
      var headers = new Headers();
      let t = JSON.parse(localStorage.getItem("user"));
      headers.append("token",t.accessToken);

      let formData = new URLSearchParams();
      formData.append("productId",pid)

      fetch('http://localhost:4000/api/cart',{
        method: 'post',
        body: formData,
        headers: headers
      })
      .then(x=>x.json())
      .then((y)=>{
        console.log(y,"harami");
        if(y.includes("error")) {
          toast(y);
          return;
        }
        props?.props?.setMainFlag(!props?.props?.mainFlag);
        toast("successfully added to cart");
      })
      .catch((err)=>{
        toast("error occured adding to cart!");
      });
    }
    const searchSimilar = (e)=>{
      e.stopPropagation();
      console.log("searching similar produts")
    }
    const addToFav = (e)=>{
      e.stopPropagation();
      toast("added to favourite!")
    }
    return (
      <Container key={props?.item?._id} onClick={handleClick}>
        <Image src={props?.item.img}/>
        <IconContainer>
          <Icon>
            <ShoppingCartIcon  pid={props?.item?._id} onClick={(e)=>{
              e.stopPropagation();
              addToCart(props?.item?._id)
            }}/>
          </Icon>
          <Icon onClick={searchSimilar}>
              <SearchIcon/>                                    
          </Icon>
          <Icon onClick={addToFav}>
            <FavoriteBorderIcon/>
          </Icon>
        </IconContainer>
      </Container>
    );
  };
  
  export default Product;