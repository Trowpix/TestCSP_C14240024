export default function CardContainer({ children }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
      {children}
    </div>
  );
}