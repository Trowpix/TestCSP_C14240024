A1.
Penulisan useState di dalam blok if melanggar aturan karena React selalu 
mencocokkan state dengan Hook berdasarkan urutan panggilannya pada setiap proses render. 
Jika ada kondisi, urutannya bisa berantakan. Perbaikannya, pindahkan const [nama, setNama] = useState(""); 
ke bagian paling atas di dalam komponen, di luar blok kondisi if

A2.
Penyebab layarnya tidak berubah adalah items.push(baru) memutasi array secara langsung, 
sehingga referensi variabel array tersebut di memori tetap sama. 
React menganggap tidak ada perubahan data, sehingga tidak memicu render ulang. 
Perbaikannya menggunakan spread operator agar menghasilkan referensi array baru: setItems([...items, baru]);.

A3.
Perbedaannya: bentuk (a) dieksekusi pada setiap kali ada render ulang, bentuk (b) 
hanya dieksekusi satu kali saat komponen pertama kali dipasang ke layar (mount), 
dan bentuk (c) dieksekusi saat pertama dipasang serta setiap kali nilai variabel 
kota mengalami perubahan. Cleanup function berjalan pada dua waktu: sebelum komponen 
dilepas (unmount) dan sesaat sebelum effect yang sama dieksekusi lagi pada render selanjutnya.

A4.
State kata kunci harus disimpan di komponen induknya karena FilterBar dan DaftarMenu
posisinya sejajar (sibling) dan sama-sama membutuhkan akses ke data tersebut. 
Sesuatu yang "naik" dari FilterBar ke induknya adalah event pemanggilan fungsi 
(callback) untuk memperbarui state, bukan datanya itu sendiri.

A5.
Controlled component adalah elemen form yang nilai inputnya dikendalikan 
sepenuhnya oleh state di React. Satu handleChange bisa menangani banyak 
input karena memanfaatkan atribut name pada tiap input dan menggunakan 
computed property name pada objek state.
