````markdown
# 🎭 Sri Krishna Costume Backend

A production-ready **Node.js + Express + TypeScript + MongoDB** backend for managing costumes and categories with **admin authentication**, **Cloudinary uploads**, **Zod validation**, and **JWT security**.

---

## 🚀 Features

✅ Admin authentication (JWT-based)  
✅ Add, update, delete, and list costumes  
✅ Add and manage categories (linked with costumes)  
✅ Cloudinary integration for image uploads  
✅ Pagination support for costume listing  
✅ Rate limiting, CORS, and error handling  
✅ Zod-based request validation  
✅ TypeScript + clean service-controller architecture

---

## 📦 Tech Stack

| Layer         | Tech                              |
| ------------- | --------------------------------- |
| Language      | **TypeScript (Node.js)**          |
| Framework     | **Express.js**                    |
| Database      | **MongoDB (Mongoose)**            |
| Validation    | **Zod**                           |
| File Uploads  | **Multer + Cloudinary**           |
| Auth          | **JWT (Access + Refresh Tokens)** |
| Logger        | **Winston / Console**             |
| Rate Limiting | **express-rate-limit**            |
| Environment   | **dotenv**                        |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/sri-krishna-costume-backend.git
cd sri-krishna-costume-backend
```
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Add Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/sri_krishna_costume_db
JWT_ACCESS_SECRET=your_access_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4️⃣ Run Development Server

```bash
npm run dev
```

### 5️⃣ Build for Production

```bash
npm run build
npm start
```

---

## 🧩 API Endpoints

### 👑 Admin

| Method | Endpoint              | Description    |
| ------ | --------------------- | -------------- |
| `POST` | `/api/v1/admin/login` | Login as admin |

### 🎭 Costume

| Method   | Endpoint              | Description                     |
| -------- | --------------------- | ------------------------------- |
| `POST`   | `/api/v1/costume`     | Add costume (with image upload) |
| `GET`    | `/api/v1/costume`     | Get all costumes (paginated)    |
| `GET`    | `/api/v1/costume/:id` | Get single costume              |
| `PUT`    | `/api/v1/costume/:id` | Update costume                  |
| `DELETE` | `/api/v1/costume/:id` | Delete costume                  |

### 🧺 Category

| Method   | Endpoint               | Description         |
| -------- | ---------------------- | ------------------- |
| `POST`   | `/api/v1/category`     | Create category     |
| `GET`    | `/api/v1/category`     | Get all categories  |
| `GET`    | `/api/v1/category/:id` | Get single category |
| `PUT`    | `/api/v1/category/:id` | Update category     |
| `DELETE` | `/api/v1/category/:id` | Delete category     |

---

## 🧠 Folder Structure

```
sri-krishna-costume-backend/
│
├── src/
│   ├── config/
│   │   ├── db.ts
│   │   ├── corsOptions.ts
│   │   └── cloudinary.ts
│   │
│   ├── controllers/
│   │   ├── admin.controller.ts
│   │   ├── costume.controller.ts
│   │   └── category.controller.ts
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── rateLimit.middleware.ts
│   │   └── upload.middleware.ts
│   │
│   ├── models/
│   │   ├── admin.model.ts
│   │   ├── costume.model.ts
│   │   └── category.model.ts
│   │
│   ├── routes/
│   │   ├── admin.routes.ts
│   │   ├── costume.routes.ts
│   │   └── category.routes.ts
│   │
│   ├── schemas/
│   │   ├── admin.schema.ts
│   │   ├── costume.schema.ts
│   │   └── category.schema.ts
│   │
│   ├── services/
│   │   ├── admin.service.ts
│   │   ├── costume.service.ts
│   │   └── category.service.ts
│   │
│   ├── utils/
│   │   ├── jwt.ts
│   │   ├── response.ts
│   │   └── logger.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── uploads/
├── .env
├── .gitignore
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🔐 Security Features

- JWT Access + Refresh tokens
- Rate limiting (100 requests/min per IP)
- Zod validation for all payloads
- Centralized error handler
- CORS restrictions (configured in `corsOptions.ts`)

---

## ☁️ Cloudinary Integration

- Image uploads handled via `upload.middleware.ts`
- Files stored securely in Cloudinary
- Public URLs linked to costumes in MongoDB

---
