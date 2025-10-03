import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";
import authRoutes from "./routes/auth.routes.js";
import cuentasRoutes from "./routes/cuentas.routes.js";
import operacionesRoutes from "./routes/operaciones.routes.js";
import solicitudesRoutes from "./routes/solicitudes.routes.js";

dotenv.config(); // carga variables del .env
const app = express();

app.use(cors({ origin: "http://localhost:4200" })); // permite peticiones del frontend
app.use(express.json()); // parsea JSON en req.body

// Health check (para verificar API y DB)
app.get("/api/health", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok"); // ping a MySQL
    res.json({ ok: rows[0].ok === 1 });
  } catch (e) {
    res.status(500).json({ error: "DB no disponible", detail: e.message });
  }
});

// Montaje de rutas principales
app.use("/api/auth", authRoutes);
app.use("/api/cuentas", cuentasRoutes);
app.use("/api/operaciones", operacionesRoutes);
app.use("/api/solicitudes", solicitudesRoutes);

// 404 por defecto
app.use((_req, res) => res.status(404).json({ error: "No encontrado" }));

// Inicio del servidor (puerto de .env o 3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));
