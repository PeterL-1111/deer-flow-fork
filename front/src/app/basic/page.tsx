export default function BasicPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#5046E5' }}>Basic Next.js Page</h1>
      <p>This is a basic Next.js page with no client components.</p>
      
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        border: '1px solid #ddd', 
        borderRadius: '0.5rem' 
      }}>
        <h2>Server-side rendering test</h2>
        <p>Current time (server-rendered): {new Date().toLocaleTimeString()}</p>
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