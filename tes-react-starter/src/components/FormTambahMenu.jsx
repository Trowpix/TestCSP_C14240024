import { useState } from 'react';

export default function FormTambahMenu({ onTambah, kategoriTersedia }) {
  const [formData, setFormData] = useState({
    nama: '',
    kategori: '',
    harga: '',
    stok: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    let valid = true;
    let newErrors = {};

    if (formData.nama.length < 3) {
      newErrors.nama = 'Nama minimal 3 karakter';
      valid = false;
    }
    if (!formData.kategori) {
      newErrors.kategori = 'Kategori wajib dipilih';
      valid = false;
    }
    if (Number(formData.harga) <= 0) {
      newErrors.harga = 'Harga harus lebih dari 0';
      valid = false;
    }
    if (Number(formData.stok) < 0 || formData.stok === '') {
      newErrors.stok = 'Stok tidak boleh negatif';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      onTambah({
        id: Date.now(), 
        nama: formData.nama,
        kategori: formData.kategori,
        harga: Number(formData.harga),
        stok: Number(formData.stok)
      });

      setFormData({ nama: '', kategori: '', harga: '', stok: '' });
      setErrors({});
    }
  };

  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '20px', 
      marginBottom: '20px', 
      borderRadius: '12px', 
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)' 
    }}>
      <h3 style={{ marginTop: 0 }}>Tambah Menu Baru</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div>
          <label htmlFor="input-nama" style={{ display: 'block', marginBottom: '5px' }}>Nama Menu:</label>
          <input id="input-nama" type="text" name="nama" value={formData.nama} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
          {errors.nama && <span role="alert" style={{color: 'red', display: 'block', fontSize: '0.9em', marginTop: '4px'}}>{errors.nama}</span>}
        </div>

        <div>
          <label htmlFor="select-kategori" style={{ display: 'block', marginBottom: '5px' }}>Kategori:</label>
          <select id="select-kategori" name="kategori" value={formData.kategori} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
            <option value="">-- Pilih Kategori --</option>
            {kategoriTersedia.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
          {errors.kategori && <span role="alert" style={{color: 'red', display: 'block', fontSize: '0.9em', marginTop: '4px'}}>{errors.kategori}</span>}
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="input-harga" style={{ display: 'block', marginBottom: '5px' }}>Harga:</label>
            <input id="input-harga" type="number" name="harga" value={formData.harga} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
            {errors.harga && <span role="alert" style={{color: 'red', display: 'block', fontSize: '0.9em', marginTop: '4px'}}>{errors.harga}</span>}
          </div>

          <div style={{ flex: 1 }}>
            <label htmlFor="input-stok" style={{ display: 'block', marginBottom: '5px' }}>Stok:</label>
            <input id="input-stok" type="number" name="stok" value={formData.stok} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
            {errors.stok && <span role="alert" style={{color: 'red', display: 'block', fontSize: '0.9em', marginTop: '4px'}}>{errors.stok}</span>}
          </div>
        </div>

        <button type="submit" style={{ alignSelf: 'flex-start', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Simpan Menu</button>
      </form>
    </div>
  );
}