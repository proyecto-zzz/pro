import { Router } from "express";
import { pool } from "../db.js";
const router = Router();

// GET /api/solicitudes/cuenta/:id
router.get("/cuenta/:id", async (req, res) => {
  try {
    // Lista solicitudes de una cuenta (más recientes primero)
    const [rows] = await pool.query(
      "SELECT * FROM solicitud WHERE cuenta_id = ? ORDER BY fecha DESC",
      [req.params.id]
    );
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: "Error consultando solicitudes", detail: e.message });
  }
});

// POST /api/solicitudes
router.post("/", async (req, res) => {
  const { cuenta_id, tipo } = req.body;        // datos mínimos
  if (!cuenta_id || !tipo) return res.status(400).json({ error: "Faltan campos" });

  try {
    // Crea solicitud con estado por defecto 'PENDIENTE' (según tu schema)
    const [result] = await pool.query(
      "INSERT INTO solicitud (cuenta_id, tipo) VALUES (?,?)",
      [cuenta_id, tipo]
    );

    // Devuelve la fila recién creada
    const [row] = await pool.query(
      "SELECT * FROM solicitud WHERE solicitud_id = ?",
      [result.insertId]
    );
    res.status(201).json(row[0]);
  } catch (e) {
    res.status(500).json({ error: "Error creando solicitud", detail: e.message });
  }
});

export default router;
