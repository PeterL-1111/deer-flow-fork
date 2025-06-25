"use client";

import { useState, useEffect } from "react";

export default function ClientPage() {
  const [time, setTime] = useState<string>("Loading...");
  
  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
    
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#5046E5' }}>Client Component Test</h1>
      <p>This is a client component with state and effects.</p>
      
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        border: '1px solid #ddd', 
        borderRadius: '0.5rem',
        background: '#f8f9fa'
      }}>
        <h2>Client-side rendering test</h2>
        <p>Current time (client-rendered): <strong>{time}</strong></p>
        <p>This time updates every second to demonstrate client-side interactivity.</p>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <a 
          href="/"
          style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: '#5046E5',
            color: 'white',
            borderRadius: '0.25rem',
            textDecoration: 'none'
          }}
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}