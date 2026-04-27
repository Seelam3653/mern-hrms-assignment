import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, 'src');

const translations = {
    // Menus
    '>Data Pegawai<': '>Employees<',
    '>Data Jabatan<': '>Positions<',
    '>Data Kehadiran<': '>Attendance<',
    '>Data Potongan<': '>Deductions<',
    '>Data Gaji<': '>Salary<',
    '>Laporan Gaji<': '>Salary Report<',
    '>Laporan Absensi<': '>Attendance Report<',
    '>Slip Gaji<': '>Payslip<',
    '>Ubah Password<': '>Change Password<',
    '>Pengaturan<': '>Settings<',
    '>Transaksi<': '>Transactions<',
    '>Laporan<': '>Reports<',
    '>Log Out<': '>Log Out<',
    '>Keluar<': '>Log Out<',
    'Apakah Anda yakin ingin keluar?': 'Are you sure you want to log out?',
    'Konfirmasi': 'Confirmation',
    'Ya': 'Yes',
    'Tidak': 'No',
    'Logout Berhasil': 'Logout Successful',
    'Anda telah berhasil keluar.': 'You have successfully logged out.',

    // Breadcrumbs & Titles
    "'Data Pegawai'": "'Employees'",
    "'Data Jabatan'": "'Positions'",
    "'Data Kehadiran'": "'Attendance'",
    "'Data Potongan'": "'Deductions'",
    "'Data Gaji'": "'Salary'",
    "'Laporan Gaji'": "'Salary Report'",
    "'Laporan Absensi'": "'Attendance Report'",
    "'Slip Gaji'": "'Payslip'",
    "'Form Data Pegawai'": "'Employee Form'",
    "'Form Data Jabatan'": "'Position Form'",
    "'Form Data Kehadiran'": "'Attendance Form'",
    "'Form Data Potongan'": "'Deduction Form'",

    // Table Headers & Labels
    '>Nama Pegawai<': '>Employee Name<',
    '>Jenis Kelamin<': '>Gender<',
    '>Tanggal Masuk<': '>Join Date<',
    '>Status<': '>Status<',
    '>Hak Akses<': '>Role<',
    '>Aksi<': '>Action<',
    '>Gaji Pokok<': '>Basic Salary<',
    '>Tj. Transport<': '>Transport Allowance<',
    '>Uang Makan<': '>Meal Allowance<',
    '>Total<': '>Total<',
    '>Total Gaji<': '>Total Salary<',
    '>Potongan<': '>Deduction<',
    '>Jumlah Potongan<': '>Deduction Amount<',
    '>Hadir<': '>Present<',
    '>Sakit<': '>Sick<',
    '>Alpha<': '>Absent<',
    '>Bulan<': '>Month<',
    '>Tahun<': '>Year<',
    '>Cetak<': '>Print<',

    // Buttons
    '>Tambah Pegawai<': '>Add Employee<',
    '>Tambah Jabatan<': '>Add Position<',
    '>Tambah Kehadiran<': '>Add Attendance<',
    '>Tambah Potongan<': '>Add Deduction<',
    '>Simpan<': '>Save<',
    '>Kembali<': '>Back<',
    '>Cari<': '>Search<',

    // Sweet Alert
    "'Berhasil'": "'Success'",
    "'Gagal'": "'Failed'",
    "'Apakah Anda yakin ingin Menghapus?'": "'Are you sure you want to delete?'",
    "'Data berhasil dihapus.'": "'Data successfully deleted.'",

    // Options
    '>Laki-Laki<': '>Male<',
    '>Perempuan<': '>Female<',
    '>Laki-laki<': '>Male<',
    '>Karyawan Tetap<': '>Permanent Employee<',
    '>Karyawan Tidak Tetap<': '>Contract Employee<',
    '>Pilih jenis kelamin<': '>Select gender<',
    '>Pilih status<': '>Select status<',
    '>Pilih hak akses<': '>Select role<',
    '>Pilih bulan<': '>Select month<',
    '>Pilih tahun<': '>Select year<',

    // Placeholders
    "'Masukkan nomor nik'": "'Enter NIK'",
    "'Masukkan nama lengkap'": "'Enter full name'",
    "'Masukkan username'": "'Enter username'",
    "'Masukkan password'": "'Enter password'",
    "'Konfirmasi password'": "'Confirm password'",
    "'Masukkan jabatan'": "'Enter position'",
    "'Masukkan gaji pokok'": "'Enter basic salary'",
    "'Masukkan tunjangan transport'": "'Enter transport allowance'",
    "'Masukkan uang makan'": "'Enter meal allowance'",
    "'Masukkan potongan'": "'Enter deduction name'",
    "'Masukkan jumlah potongan'": "'Enter deduction amount'",
    "'Cari Nama Pegawai...'": "'Search Employee Name...'",
    // Login Page
    'Sistem Penggajian Karyawan Online': 'Online Employee Salary System',
    'Sign In ke SiPeKa': 'Sign In to SiPeKa',
    'Silahkan masukkan username dan password Anda.': 'Please enter your username and password.',

    // More UI Elements
    '>Menampilkan<': '>Showing<',
    '>dari<': '>of<',
    '>Data tidak ditemukan<': '>Data not found<',
    '>Tambah<': '>Add<',
    '>Edit<': '>Edit<',
    '>Hapus<': '>Delete<',
    '>Peringatan<': '>Warning<',
    '>Konfirmasi Password<': '>Confirm Password<',
    '>Konfirmasi password<': '>Confirm password<',
    '>Ubah<': '>Update<',
    '>Dashboard<': '>Dashboard<',
    '>Master Data<': '>Master Data<',
    '>Admin<': '>Admin<',
    '>Pegawai<': '>Employee<',
    '>Semua Data<': '>All Data<',
    // Missing texts from Data Pegawai / SweetAlert / Breadcrumbs
    '"Data Pegawai"': '"Employees"',
    "'Data pegawai berhasil dihapus.'": "'Employee data successfully deleted.'",
    "'Data jabatan berhasil dihapus.'": "'Position data successfully deleted.'",
    "'Data kehadiran berhasil dihapus.'": "'Attendance data successfully deleted.'",
    "'Data potongan berhasil dihapus.'": "'Deduction data successfully deleted.'",
    "'Data overtime berhasil dihapus.'": "'Overtime data successfully deleted.'",
    "'Menampilkan '": "'Showing '",
    "' dari '": "' of '",
    "' Data Pegawai'": "' Employees'",
    "' Data Jabatan'": "' Positions'",
    "' Data Kehadiran'": "' Attendance'",
    "' Data Potongan'": "' Deductions'",
    "' Data Gaji'": "' Salary Data'",
    "' Data Overtime'": "' Overtime Data'",

    // CSV Headers
    "'Nama Pegawai'": "'Employee Name'",
    "'Jenis Kelamin'": "'Gender'",
    "'Jabatan'": "'Position'",
    "'Tanggal Masuk'": "'Join Date'",
    "'Hak Akses'": "'Role'",
    "'Gaji Pokok'": "'Basic Salary'",
    "'Tj. Transport'": "'Transport Allowance'",
    "'Uang Makan'": "'Meal Allowance'",
    "'Total Gaji'": "'Total Salary'",
    "'Potongan'": "'Deduction'",
    "'Jumlah Potongan'": "'Deduction Amount'",

    // Breadcrumbs
    'pageName="Data Pegawai"': 'pageName="Employees"',
    'pageName="Data Jabatan"': 'pageName="Positions"',
    'pageName="Data Kehadiran"': 'pageName="Attendance"',
    'pageName="Data Potongan"': 'pageName="Deductions"',
    'pageName="Data Gaji"': 'pageName="Salary"',
    'pageName="Data Overtime"': 'pageName="Overtime"',
    'pageName="Laporan Gaji"': 'pageName="Salary Report"',
    'pageName="Laporan Absensi"': 'pageName="Attendance Report"',
    'pageName="Slip Gaji"': 'pageName="Payslip"',

    // Form Titles
    '>Tambah Data Pegawai<': '>Add Employee<',
    '>Edit Data Pegawai<': '>Edit Employee<',
    '>Tambah Data Jabatan<': '>Add Position<',
    '>Edit Data Jabatan<': '>Edit Position<',
    '>Tambah Data Kehadiran<': '>Add Attendance<',
    '>Edit Data Kehadiran<': '>Edit Attendance<',
    '>Tambah Data Potongan<': '>Add Deduction<',
    '>Edit Data Potongan<': '>Edit Deduction<',
    '>Tambah Data Overtime<': '>Add Overtime<',
    '>Edit Data Overtime<': '>Edit Overtime<',

    // Other missing
    '>Pilih Bulan<': '>Select Month<',
    '>Pilih Tahun<': '>Select Year<',
};

function translateFiles(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            translateFiles(filePath);
        } else if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let modified = false;

            for (const [id, en] of Object.entries(translations)) {
                // simple global replace
                const regex = new RegExp(id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                if (regex.test(content)) {
                    content = content.replace(regex, en);
                    modified = true;
                }
            }

            if (modified) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Translated UI text in ${filePath}`);
            }
        }
    });
}

translateFiles(directoryPath);
console.log('UI Translation complete.');
