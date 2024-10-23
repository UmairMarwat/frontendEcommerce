import { AddressElement, PaymentElement, PaymentMethodMessagingElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { PlayCircleFilledWhite } from "@mui/icons-material";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [userinfo, setUserinfo] = useState({});
  const [flag, setFlag] = useState(false);
  var [total, setTotal] = useState(0);
  var [data, setData] = useState();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  var headers = new Headers();
  let t = JSON.parse(localStorage.getItem("user"));
  headers.append("token",t.accessToken);

  useEffect(()=>{
    fetch('http://localhost:4000/api/cart',{
      method: 'get',
      headers: headers
    })
    .then(x=>x.json())
    .then((y)=>{
      console.log(y)
      setData(y);
      setTotal(0);
      let sub_t = 0;
      y.products.forEach(x=>{
        sub_t=(sub_t) + (x.product.price*x.quantity);
      });
      setTotal((sub_t)+(props?.charges)-(props?.discount));
    })
    .catch((err)=>{
    });
  },[flag])
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      toast("please wait! payment form is loading... ")
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/cart`,
      },
      redirect: 'if_required'
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    if(paymentIntent && paymentIntent.status == "succeeded") {
      setMessage("Payment Status: "+paymentIntent.status+" 🎉");
      handleOrder();
    }

    setIsProcessing(false);
  };

  const handleOrder = ()=>{
    var myHeaders = headers;
    myHeaders.append("Content-Type", "application/json");
    var ui = {};
    ui["userinfo"] = userinfo;
    ui["amount"]=total;
    ui["products"]=data?.products?.map(x=>{
      return ({
        productId: x.productId, 
        quantity: x.quantity
      })
    });
    fetch("http://localhost:4000/api/order",{
      method: "post",
      headers: myHeaders,
      body: JSON.stringify(ui)
    })
    .then(x=>x.json())
    .then(y=>{
      if(!y.includes("error")) {
        console.log("not error");
        navigate("/Completed")
        return;
      }
      toast(y)
    })
    .catch(err=>{
      console.log(err);
    })
  }
  return (
    <>
      <Navbar/>
      <div className="checkout-container" style={{display:'flex',backgroundColor:"#1e1f24",justifyContent:'center'}}>
        
        <form id="payment-form" onSubmit={handleSubmit} style={
            {width: '450px',
            border:'1px solid rgba(0,0,0,0.1)',
            backgroundColor:'white',
            padding: '3rem 1rem',
            borderRadius: '7px',
            marginTop: '1rem'}
          }>
          <div style={{
            display:"flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#444"
          }}>
            <p style={{fontSize: "14px"}}>TOTAL BILL:</p>
            <h3 style={{fontSize: "1rem"}}>
              &nbsp;&nbsp;${total && total}
            </h3>
          </div>
          <div style={{
            marginTop: "8px",
            display:"flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#444"
          }}>
            <p style={{fontSize: "14px"}}>TOTAL PRODUCTS:</p>
            <h3 style={{fontSize: "1rem"}}>
              &nbsp;&nbsp;{data?.products?.length}
            </h3>
          </div>
          <br/>
          <br/>
          <AddressElement onChange={(event)=>{
            if (event.complete) {
              // Extract potentially complete address
              const name = event.value.name;
              const phone = event.value.phone;
              const address = event.value.address;
              let json = {
                name: name,
                phone: phone,
                address: address,
              }
              setUserinfo(json);
            }
          }} 
          options={{
            mode: "shipping",
            fields: {
              phone: 'always',
              postal_code: 'never'
            },
            validation: {
              phone: {
                required: 'never',
              },
            },
          }} id="address-element"/>
          <PaymentElement id="payment-element" />
          <button disabled={isProcessing || !stripe || !elements} id="submit" style={{
            padding: '0.5rem 1rem',
            outline: 'none',
            border: '1px solid gray',
            borderRadius: '4px',
            marginTop: '1rem',
            backgroundColor: '#f2f2'

          }}>
            <span id="button-text">
              {isProcessing ? "Processing ... " : "Pay now"}
            </span>
          </button>
          <br/>
          <br/>
          {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
        </form>
      </div>
    </>
  );
}