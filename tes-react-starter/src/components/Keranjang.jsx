import { useState } from 'react';

export default function Keranjang({ items, onUbahQty, onHapus }) {
  const [konfirmasiHapusId, setKonfirmasiHapusId] = useState(null);

  const totalItem = items.reduce((sum, i) => sum + i.qty, 0);
  const totalHarga = items.reduce((sum, i) => sum + (i.harga * i.qty), 0);
  const totalHargaRp = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalHarga);

  const handleKlikHapus = (id) => {
    if (konfirmasiHapusId === id) {
      onHapus(id);
      setKonfirmasiHapusId(null);
    } else {
      setKonfirmasiHapusId(id);
      setTimeout(() => {
        setKonfirmasiHapusId(null);
      }, 3000);
    }
  };

  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '20px', 
      borderRadius: '12px', 
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)' 
    }}>
      <h2 style={{ marginTop: 0 }}>Keranjang</h2>
      
      {items.length === 0 ? (
        <p>Keranjang kosong</p>
      ) : (
        <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
          {items.map(item => (
            <li key={item.id} style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px dashed #ccc' }}>
              <div style={{ fontWeight: 'bold' }}>{item.nama}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                <span>Rp {item.harga} x {item.qty}</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button onClick={() => onUbahQty(item.id, -1)} style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid #ccc', background: 'white', cursor: 'pointer' }}>-</button>
                  <span style={{ margin: '0 15px', fontWeight: 'bold' }}>{item.qty}</span>
                  <button onClick={() => onUbahQty(item.id, 1)} style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid #ccc', background: 'white', cursor: 'pointer' }}>+</button>
                  
                  <button 
                    onClick={() => handleKlikHapus(item.id)} 
                    style={{ 
                      marginLeft: '15px', 
                      backgroundColor: konfirmasiHapusId === item.id ? '#dc3545' : '#f8f9fa',
                      color: konfirmasiHapusId === item.id ? 'white' : 'black',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      cursor: 'pointer'
                    }}
                  >
                    {konfirmasiHapusId === item.id ? 'Yakin Hapus?' : 'Hapus'}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />
      <p style={{ margin: '10px 0 5px 0' }}>Total Item: {totalItem}</p>
      <h3 style={{ margin: '0', color: '#28a745' }}>Total: {totalHargaRp}</h3>
    </div>
  );
}