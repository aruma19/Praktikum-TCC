# Gunakan image Node.js ringan
FROM node:20-alpine

# Tentukan direktori kerja
WORKDIR /app

# Salin package.json dan install dependensi
COPY package*.json ./
RUN npm install

# Salin semua file proyek
COPY . .

# Dokumentasikan port (tidak wajib, tapi informatif)
EXPOSE 5002

# Jalankan aplikasi
CMD ["node", "index.js"]
