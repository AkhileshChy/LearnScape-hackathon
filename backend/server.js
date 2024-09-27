import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";

import contentRoutes from "./routes/content.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/content", contentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
})