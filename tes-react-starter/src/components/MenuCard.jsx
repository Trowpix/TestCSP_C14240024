import styles from './MenuCard.module.css';

export default function MenuCard({ item, onTambah }) {
  const hargaRp = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.harga);
  const habis = item.stok === 0;

  return (
    <div className={`${styles.card} ${habis ? styles.habis : ''}`}>
      <h3>{item.nama}</h3>
      <p>Kategori: {item.kategori}</p>
      <p>{hargaRp}</p>
      
      {habis ? (
        <span className={styles.badgeHabis}>Habis</span>
      ) : (
        <p>Stok: {item.stok}</p>
      )}

      <button 
        onClick={() => onTambah(item)} 
        disabled={habis}
      >
        Tambah
      </button>
    </div>
  );
}