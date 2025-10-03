import { Router } from "express";
import { pool } from "../db.js";
const router = Router();

// GET /api/operaciones/cuenta/:id
router.get("/cuenta/:id", async (req, res) => {
  try {
    // Obtiene operaciones de una cuenta, más recientes primero
    const [rows] = await pool.query(
      "SELECT * FROM operacion WHERE cuenta_id = ? ORDER BY fecha DESC",
      [req.params.id]
    );
    res.json(rows); // devuelve array de operaciones
  } catch (e) {
    res.status(500).json({ error: "Error consultando operaciones", detail: e.message });
  }
});

// POST /api/operaciones
router.post("/", async (req, res) => {
  // Datos de la operación; monto/descripcion opcionales
  const { cuenta_id, tipo, monto = null, descripcion = null } = req.body;
  if (!cuenta_id || !tipo) return res.status(400).json({ error: "Faltan campos" });

  try {
    // Inserta nueva operación
    const [result] = await pool.query(
      "INSERT INTO operacion (cuenta_id, tipo, monto, descripcion) VALUES (?,?,?,?)",
      [cuenta_id, tipo, monto, descripcion]
    );

    // Recupera la fila creada y la retorna
    const [row] = await pool.query(
      "SELECT * FROM operacion WHERE operacion_id = ?",
      [result.insertId]
    );
    res.status(201).json(row[0]);
  } catch (e) {
    res.status(500).json({ error: "Error creando operación", detail: e.message });
  }
});

export default router;
