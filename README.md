# AIRA — Chatbot Project

Ringkasan singkat:

- AIRA adalah chatbot berbasis Flask (Python) untuk membantu mahasiswa. Frontend dibuat dengan React + Vite.

Struktur & teknologi:

- Frontend: `frontend/` (React, Vite)
- Backend: `backend/` (Flask app — `app.py`)
- Docs: `docs/`

Cara menjalankan (pengembangan, Windows PowerShell):

1. Backend (Python / Flask)

```powershell
# Buat virtual environment (jika belum)
python -m venv backend\.venv
backend\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python backend\app.py
```

2. Frontend (React / Vite)

```powershell
cd frontend
npm install
npm run dev
```

Environment variables:

- Buat file `.env` di `backend/` berdasarkan `.env.example`.

Catatan penting:

- `backend/venv` tidak seharusnya di-commit. Pastikan `.gitignore` mengabaikannya dan hapus dari repo jika sudah ter-commit.
- `requirement.txt` telah disalin ke `requirements.txt` (nama standar). Jika ada paket opsional (transformers/torch), sebutkan di README atau gunakan file requirements-dev.

Kontak dan kontribusi:

- Untuk kontribusi, buat issue atau PR pada repository ini. Tambahkan sisi testing (pytest) dan CI (GitHub Actions) untuk kualitas.

Selengkapnya: lihat `docs/` untuk proposal, laporan, dan referensi.
