import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CheckoutForm from "./pages/CheckoutForm";
import Completed from "./pages/Completed";

// Import your new category pages
import AccessoriesPage from "./pages/AccessoriesPage.jsx";
import GraphicCardsPage from "./pages/GraphicCardsPage";
import PackagesPage from "./pages/PackagesPage";
import ShopForm from "./admin/Dashboard.jsx";


const App = () => {
  const [mainFlag, setMainFlag] = useState(false);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [charges, setCharges] = useState(5.2);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:4000/api/config-stripe")
      .then((res) => res.json())
      .then((publishableKey) => {
        setStripePromise(loadStripe(publishableKey));
      });
  }, []);

  useEffect(() => {
    var formData = new URLSearchParams();
    fetch("http://localhost:4000/api/create-payment-intent", {
      method: "post",
      body: formData,
    }).then(async (res) => {
      const client_secret = await res.json();
      setClientSecret(client_secret);
    });
  }, []);

  return (
    <div className="App">
      <Routes>
        {/* Existing routes */}
        <Route
          exact
          path="/"
          element={
            <Home
              mainFlag={mainFlag}
              setMainFlag={setMainFlag}
              ThreeDots={ThreeDots}
            />
          }
        />
        <Route
          path="/ProductPage/:id"
          element={
            <ProductPage
              mainFlag={mainFlag}
              setMainFlag={setMainFlag}
              ThreeDots={ThreeDots}
            />
          }
        />
        <Route
          path="/ProductList"
          element={
            <ProductList
              mainFlag={mainFlag}
              setMainFlag={setMainFlag}
              ThreeDots={ThreeDots}
            />
          }
        />
        <Route
          path="/Cart"
          element={
            <ProtectedRoute>
              <Cart
                mainFlag={mainFlag}
                setMainFlag={setMainFlag}
                charges={charges}
                discount={discount}
                ThreeDots={ThreeDots}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Checkout"
          element={
            <ProtectedRoute>
              {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm charges={charges} discount={discount} />
                </Elements>
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Completed"
          element={
            <ProtectedRoute>
              <Completed />
            </ProtectedRoute>
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        {/* New routes for category pages */}
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/graphic-cards" element={<GraphicCardsPage />} />
        <Route path="/shops" element={<PackagesPage />} />
       
        <Route path="/dashboard" element={<ShopForm />} />

        {/* 404 route */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>

      <ToastContainer
        theme="dark"
        hideProgressBar={true}
        position="bottom-right"
        autoClose={2000}
      />
    </div>
  );
};

const ProtectedRoute = ({ redirectPath = "/login", children }) => {
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

export default App;