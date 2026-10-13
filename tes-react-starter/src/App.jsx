import { useState, useEffect } from 'react';
import { semuaMenu } from './data/menu';
import FilterBar from './components/FilterBar';
import MenuList from './components/MenuList';
import Keranjang from './components/Keranjang';
import TimerSesi from './components/TimerSesi';
import FormTambahMenu from './components/FormTambahMenu';

function App() {
  const [menuData, setMenuData] = useState(semuaMenu);
  const [keyword, setKeyword] = useState('');
  const [kategoriAktif, setKategoriAktif] = useState('semua');
  const [tampilTimer, setTampilTimer] = useState(true);

  const [keranjang, setKeranjang] = useState(() => {
    const simpanan = localStorage.getItem('keranjang');
    return simpanan ? JSON.parse(simpanan) : [];
  });

  useEffect(() => {
    localStorage.setItem('keranjang', JSON.stringify(keranjang));
    const totalItem = keranjang.reduce((sum, item) => sum + item.qty, 0);
    document.title = totalItem > 0 ? `(${totalItem}) KantinKita` : 'KantinKita';
  }, [keranjang]);

  const daftarKategori = ['semua', ...new Set(menuData.map(m => m.kategori))];

  const tambahKeKeranjang = (itemMenu) => {
    if (itemMenu.stok === 0) return;
    
    const indexAda = keranjang.findIndex(k => k.id === itemMenu.id);
    if (indexAda !== -1) {
      const keranjangBaru = [...keranjang];
      keranjangBaru[indexAda] = { ...keranjangBaru[indexAda], qty: keranjangBaru[indexAda].qty + 1 };
      setKeranjang(keranjangBaru);
    } else {
      setKeranjang([...keranjang, { ...itemMenu, qty: 1 }]);
    }
  };

  const ubahQty = (id, delta) => {
    setKeranjang(keranjang.map(item => {
      if (item.id === id) {
        return { ...item, qty: item.qty + delta };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const hapusItem = (id) => {
    setKeranjang(keranjang.filter(item => item.id !== id));
  };

  const tambahMenuBaru = (menuBaru) => {
    setMenuData([...menuData, menuBaru]);
  };

  const menuTampil = menuData.filter(m => {
    const matchKeyword = m.nama.toLowerCase().includes(keyword.toLowerCase());
    const matchKategori = kategoriAktif === 'semua' || m.kategori === kategoriAktif;
    return matchKeyword && matchKategori;
  });

  return (
    /* Perubahan di sini: container di-tengahin dan dikasih max-width */
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px', display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
      
      <div style={{ flex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ margin: 0, color: '#2c3e50' }}>🍔 KantinKita</h1>
          <div>
            {tampilTimer && <TimerSesi />}
            <button 
              onClick={() => setTampilTimer(!tampilTimer)}
              style={{ padding: '8px 12px', marginLeft: '10px', borderRadius: '6px', border: '1px solid #ccc', cursor: 'pointer', background: 'white' }}
            >
              {tampilTimer ? 'Sembunyikan Timer' : 'Tampilkan Timer'}
            </button>
          </div>
        </div>

        <FormTambahMenu 
          onTambah={tambahMenuBaru} 
          kategoriTersedia={daftarKategori.filter(k => k !== 'semua')} 
        />

        <FilterBar 
          keyword={keyword}
          setKeyword={setKeyword}
          kategoriAktif={kategoriAktif}
          setKategoriAktif={setKategoriAktif}
          daftarKategori={daftarKategori}
          dataMenuUtuh={menuData}
        />

        <MenuList 
          data={menuTampil} 
          onTambah={tambahKeKeranjang}
          keyword={keyword}
          kategoriAktif={kategoriAktif}
        />
      </div>

      <div style={{ flex: 1, position: 'sticky', top: '30px' }}>
        <Keranjang 
          items={keranjang} 
          onUbahQty={ubahQty} 
          onHapus={hapusItem} 
        />
      </div>
    </div>
  );
}

export default App;