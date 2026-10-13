import MenuCard from './MenuCard';
import styles from './MenuCard.module.css';

export default function MenuList({ data, onTambah, keyword, kategoriAktif }) {
  if (data.length === 0) {
    return (
      <p>
        Menu {keyword && `dengan kata kunci "${keyword}"`} 
        {kategoriAktif !== 'semua' && ` di kategori "${kategoriAktif}"`} tidak ditemukan.
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      {data.map(item => (
        <MenuCard key={item.id} item={item} onTambah={onTambah} />
      ))}
    </div>
  );
}