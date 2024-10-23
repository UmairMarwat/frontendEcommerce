import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function() {
    return (
        <>
            <Navbar/>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
                backgroundColor: "#fcfcfc"
            }}>
                <div style={{
                    width: "500px",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                    padding: "3rem 1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "#333"
                }}>
                    <h2>Congratulations! 🧨</h2>
                    <br/>
                    <br/>
                    <h3>Your order has been placed!</h3>
                    <p style={{marginTop: "8px"}}>
                        Your shipment tracking id will be sent via SMS shortly
                    </p>
                    <br/>
                    <br/>
                    <br/>
                    <Link to="/">
                        <button style={{
                            padding: "0.5rem 1rem",
                            border: "1px solid rgba(150, 150, 150, 0.2)",
                            borderRadius: "4px",
                            fontWeight: "bold",
                            background: "#f9f9f9",
                            color: "#222"
                        }}>Continue Shopping</button>
                    </Link>
                </div>
            </div>
        </>
    )
}