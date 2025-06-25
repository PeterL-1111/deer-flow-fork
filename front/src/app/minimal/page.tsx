export default function MinimalPage() {
  return (
    <div style={{ 
      padding: "20px", 
      maxWidth: "800px", 
      margin: "0 auto",
      fontFamily: "system-ui, sans-serif"
    }}>
      <h1 style={{ color: "#5046E5" }}>Minimal Next.js Page</h1>
      <p>This is a minimal Next.js page with no client-side components or styling dependencies.</p>
      <div style={{ 
        marginTop: "20px", 
        padding: "20px", 
        border: "1px solid #e2e8f0", 
        borderRadius: "8px",
        background: "#f8fafc"
      }}>
        <h2>Testing Static Rendering</h2>
        <p>Current timestamp (server-side): {new Date().toISOString()}</p>
      </div>
      <div style={{ marginTop: "20px" }}>
        <a 
          href="/"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            background: "#5046E5",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none"
          }}
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}