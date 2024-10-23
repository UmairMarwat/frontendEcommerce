import { AiOutlineSearch } from "react-icons/ai";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, NavLink, useNavigate, Navigate } from "react-router-dom";
import "./Navbar.css";
import { toast } from "react-toastify";

const Container = styled.div`
  height: 70px;
  font-size: 36px;
  background-color: #000;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  color: white;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  padding: 5px;
  margin-left: 15px;
`;

const Input = styled.input`
  border: none;
`;

const Center = styled.div`
  flex: 1;
  font-weight: bold;
  text-align: center;
  color: #e31b21;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItems = styled.div`
  font-size: 14px;
  margin: 10px;
  cursor: pointer;
  color: white;
`;

const BecomeSellerButton = styled.button`
  background-color: #e31b21;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
  margin-left: 10px;
  &:hover {
    background-color: #d11a1a;
  }
`;

const Navbar = (props) => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    handleSearch();
  }, [keyword]);

  useEffect(() => {
    if (user && user.accessToken) {
      fetch("http://localhost:4000/api/cart", {
        method: "GET",
        headers: {
          token: user.accessToken,
        },
      })
        .then((res) => res.json())
        .then((cartData) => {
          setData(cartData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props?.props?.mainFlag]);

  const handleFocus = () => {
    navigate("/productList");
  };

  const handleSearch = () => {
    if (!keyword) return;

    const formData = new URLSearchParams();
    formData.append("keyword", keyword);

    fetch("http://localhost:4000/api/searchByKeyword", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((searchData) => {
        props.setData(searchData);
      })
      .catch(() => {
        toast.error("Error occurred while searching products!");
      });
  };

  return (
    <Container className="container">
      <Wrapper className="wrapper">
        <Left>
          <Language>Search</Language>
          <SearchContainer>
            <Input
              onChange={(e) => setKeyword(e.target.value)}
              onFocus={handleFocus}
            />
            <AiOutlineSearch style={{ color: "white", fontSize: 16 }} />
          </SearchContainer>
        </Left>

        <NavLink to="/" style={{ textDecoration: "none" }}>
          <Center>E-Commerce Gaming Store</Center>
        </NavLink>

        <Right>
          <NavLink style={{ textDecoration: "none" }} to="/">
            <MenuItems>Home</MenuItems>
          </NavLink>
          {!user && (
            <>
              <NavLink style={{ textDecoration: "none" }} to="/Register">
                <MenuItems>Register</MenuItems>
              </NavLink>
              <NavLink style={{ textDecoration: "none" }} to="/login">
                <MenuItems>Login</MenuItems>
              </NavLink>
            </>
          )}
          <NavLink style={{ textDecoration: "none" }} to="/cart">
            <MenuItems>Cart</MenuItems>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }} to="/productlist">
            <MenuItems>Product List</MenuItems>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }} to="/dashboard">
            <BecomeSellerButton>Become Seller</BecomeSellerButton>
          </NavLink>
          {user && (
            <NavLink to="/cart">
              <MenuItems
                className="shopping-cart-icon"
                data-total={data?.products?.length}
              >
                <ShoppingCartOutlinedIcon />
              </MenuItems>
            </NavLink>
          )}
          <Profile />
        </Right>
      </Wrapper>
    </Container>
  );
};

const Profile = () => {
  let user = localStorage.getItem("user");
  if (user) {
    let u = JSON.parse(user);
    if (u?.accessToken) {
      return (
        <div className="user-profile">
          <img
            src="https://api.lorem.space/image/face"
            width="40"
            height="40"
            style={{ borderRadius: "50%", cursor: "pointer" }}
          />
          <ul>
            <li
              onClick={() => {
                localStorage.clear();
                window.location = "/login";
              }}
            >
              Sign Out
            </li>
          </ul>
        </div>
      );
    }
  }
  return null;
};

const ProtectedRoute = ({ redirectPath = "/Login", children }) => {
  let user = localStorage.getItem("user");
  if (user) {
    let u = JSON.parse(user);
    if (u?.accessToken) {
      return children;
    } else {
      return <Navigate to={redirectPath} replace />;
    }
  } else {
    return <Navigate to={redirectPath} replace />;
  }
};

export default Navbar;