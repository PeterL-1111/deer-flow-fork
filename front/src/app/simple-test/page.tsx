"use client";

import { useState } from "react";
import Link from "next/link";

export default function SimpleTestPage() {
  const [count, setCount] = useState(0);
  
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "20px",
      background: "linear-gradient(135deg, #5046E5 0%, #6366F1 100%)",
      color: "white",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
        Simple Test Page
      </h1>
      
      <div style={{
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "12px",
        padding: "30px",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        maxWidth: "500px",
        width: "100%"
      }}>
        <p style={{ marginBottom: "20px" }}>
          If you can see this page and interact with the counter below, 
          the React frontend is working correctly.
        </p>
        
        <div style={{ marginBottom: "30px" }}>
          <button 
            onClick={() => setCount(count - 1)}
            style={{
              background: "white",
              color: "#5046E5",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              marginRight: "10px"
            }}
          >
            -
          </button>
          
          <span style={{ 
            display: "inline-block", 
            width: "50px", 
            fontSize: "1.5rem",
            fontWeight: "bold"
          }}>
            {count}
          </span>
          
          <button 
            onClick={() => setCount(count + 1)}
            style={{
              background: "white",
              color: "#5046E5",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              marginLeft: "10px"
            }}
          >
            +
          </button>
        </div>
        
        <div>
          <Link href="/" style={{
            display: "inline-block",
            background: "transparent",
            color: "white",
            border: "2px solid white",
            padding: "10px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            transition: "all 0.3s ease"
          }}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}