# 🚀 Backend Setup Guide (Node.js + PostgreSQL + Docker Compose)

ระบบ Backend สำหรับการจัดการข้อมูลผู้ใช้และบริษัท  
ใช้ **Express.js + PostgreSQL**  

---

## 📂 โครงสร้างโปรเจกต์

```
backend/
├── src/
│   ├── server.ts
|   ├── controller
│   ├── models 
│   ├── routers
│   ├── index.ts
├── .env
├── docker-compose.yml
├── package.json
└── README.md
```

---

## ⚙️ 1. Requirements

ก่อนเริ่มต้น ให้ติดตั้ง:

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

---

## 🐘 2. Setup Database (PostgreSQL via Docker)

ไฟล์ `docker-compose.yml`

```yaml
version: "3.9"
services:
  postgres:
    image: postgres:16
    container_name: my_postgres
    restart: always
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    volumes:
      - ./data/postgres:/var/lib/postgresql/data
```

### ▶️ รัน Database

```bash
docker compose up -d
```

ตรวจสอบว่า container รันแล้ว:

```bash
docker ps
```

---

## 🔑 3. ตั้งค่า Environment Variables

สร้างไฟล์ `.env` ภายในโฟลเดอร์ `backend`

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=mydb

ACCESS_TOKEN_SECRET=EiKf9vBVMW0Qiu6EWgzwU7PyCdD0BLxv7ks4kTe4fXvGPDYsS3QT3wugV4ReGopt
REFRESH_TOKEN_SECRET=0ueUlWRDDjvu7188rORSqZVuwWUVvJSyPGWw84J3HxgWmW9VKRP4RFzW2Imvb1Jr
```

---

## 💾 4. ติดตั้ง Dependencies

```bash
npm install
```

---

## 🏗️ 5. Database Initialization

ไฟล์ `src/db/initTables.ts` จะสร้าง table อัตโนมัติเมื่อ server เริ่มทำงาน

### ตารางที่สร้าง:
#### 🧍‍♂️ Table: `users`
```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 🏢 Table: `company_detail`
```sql
CREATE TABLE IF NOT EXISTS company_detail (
  created_by_user_id INTEGER NOT NULL
    REFERENCES users(id) ON DELETE CASCADE,
  company_type TEXT,
  company_name TEXT,
  house_number TEXT,
  village_number TEXT,
  village_name TEXT,
  alley TEXT,
  road TEXT,
  sub_district TEXT,
  district TEXT,
  province TEXT,
  post_code TEXT,
  contact_prefix TEXT,
  contact_firstname TEXT,
  contact_lastname TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  ref_code TEXT
);
```

---

## 🚀 6. Run Backend Server

### Development Mode
```bash
npm run dev
```

หรือถ้าใช้ `ts-node-dev`:
```bash
npx ts-node-dev src/server.ts
```

Server จะรันที่:
```
http://localhost:3000
```

เมื่อรันครั้งแรก ระบบจะสร้าง Table อัตโนมัติ

---

## 🧪 7. ทดสอบ API เบื้องต้น

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/user/login` | เข้าสู่ระบบ |
| `GET`  | `/company/:userId` | ดึงข้อมูลบริษัทตามผู้ใช้ |


ตัวอย่างทดสอบด้วย `curl`:
```bash
curl -X POST http://localhost:3000/user/login   -H "Content-Type: application/json"   -d '{"username":"admin","password":"1234"}'
```
---
# 🌐 Frontend Guide (HTML + CSS + jQuery)

ระบบ frontend สำหรับการจัดการ **สมัครสมาชิก, login และข้อมูลบริษัท**  
เชื่อมต่อกับ backend ผ่าน **AJAX** (Express + PostgreSQL)

---

## 📂 โครงสร้างโปรเจกต์

```
frontend/
├── register.html
├── login.html
├── profile.html
├── css/
│   └── *.css
├── js/
│   └── *.js
```

---

## ⚙️ 1. Requirements

- Browser รุ่นใหม่ (Chrome, Edge, Firefox)
- Backend Server รันอยู่ที่ `http://localhost:3000`

---

## 📝 2. Page Flow

### 2.1 Register Page (`register.html`)

1. กรอกข้อมูล username / password / email (หรือ fields อื่นตาม backend)  
2. กด **Register** → ส่ง POST `/user/register`  
3. ถ้า register สำเร็จ → redirect ไปหน้า `login.html`


### 2.2 Login Page (`login.html`)

1. กรอก username / password  
2. กด **Login** → POST `/user/login`  
3. ถ้า login สำเร็จ → เก็บ `userId` ใน `localStorage` → redirect ไปหน้า `profile.html`

### 2.3 Profile Page (`profile.html`)

1. โหลดหน้า → ตรวจสอบ `userId` จาก localStorage  
2. GET `/company/:userId` → เติมฟอร์มข้อมูลบริษัท  
3. แก้ไขข้อมูล → Submit → PUT `/company/:userId`

