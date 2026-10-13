import { useRef } from 'react';

export default function FilterBar({ keyword, setKeyword, kategoriAktif, setKategoriAktif, daftarKategori, dataMenuUtuh }) {
  const inputRef = useRef(null);

  const handleBersihkan = () => {
    setKeyword('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Fungsi untuk menghitung jumlah item per kategori (Bonus +1)
  const hitungJumlah = (kat) => {
    if (kat === 'semua') return dataMenuUtuh.length;
    return dataMenuUtuh.filter(m => m.kategori === kat).length;
  };

  return (
    <div style={{ margin: '20px 0', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input 
          type="text" 
          placeholder="Cari nama menu..." 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          ref={inputRef}
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={handleBersihkan} style={{ padding: '8px 15px', cursor: 'pointer' }}>Bersihkan</button>
      </div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {daftarKategori.map(kat => (
          <button 
            key={kat} 
            onClick={() => setKategoriAktif(kat)}
            style={{ 
              fontWeight: kategoriAktif === kat ? 'bold' : 'normal',
              padding: '5px 10px',
              backgroundColor: kategoriAktif === kat ? '#007bff' : '#fff',
              color: kategoriAktif === kat ? '#fff' : '#333',
              border: '1px solid #007bff',
              borderRadius: '20px',
              cursor: 'pointer'
            }}
          >
            {/* Bonus: Menampilkan jumlah menu */}
            {kat} ({hitungJumlah(kat)})
          </button>
        ))}
      </div>
    </div>
  );
}