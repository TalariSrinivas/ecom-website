import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

// ✅ Connect Database
connectDB();

const app = express();

// ✅ Enable CORS for React Frontend
app.use(cors(
{
  origin: process.env.FRONTEND_URL,  // MUST be exact frontend deployed url with https://
  credentials: true,
}
));


// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Enable file upload (for Cloudinary)
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/' // Required for Render
}));

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Remove local uploads folder for Render (Cloudinary handles storage)
// ❌ app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// ✅ Health Check Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// ✅ Start Server
app.listen(port, () => console.log(`✅ Server running on port: ${port}`));
