export default function SimplePage() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Simple Next.js Page</h1>
      <p>This is a simple Next.js page with no client components.</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Back to Home</a>
      </div>
    </div>
  );
}