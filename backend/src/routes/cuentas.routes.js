import { Router } from "express";
import { pool } from "../db.js";
const router = Router();

// GET /api/cuentas/usuario/:id
router.get("/usuario/:id", async (req, res) => {
  try {
    // Consulta todas las cuentas de un usuario, ordenadas por fecha más reciente
    const [rows] = await pool.query(
      "SELECT * FROM cuenta WHERE usuario_id = ? ORDER BY fecha_creacion DESC",
      [req.params.id]
    );
    res.json(rows); // devuelve array de cuentas
  } catch (e) {
    res.status(500).json({ error: "Error consultando cuentas", detail: e.message });
  }
});

// POST /api/cuentas
router.post("/", async (req, res) => {
  // Extrae campos del body; saldo por defecto en 0
  const { usuario_id, numero_cuenta, tipo, saldo = 0 } = req.body;

  // Validación mínima
  if (!usuario_id || !numero_cuenta || !tipo) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  try {
    // Inserta nueva cuenta
    const [result] = await pool.query(
      "INSERT INTO cuenta (usuario_id, numero_cuenta, tipo, saldo) VALUES (?,?,?,?)",
      [usuario_id, numero_cuenta, tipo, saldo]
    );

    // Recupera y devuelve la cuenta recién creada
    const [row] = await pool.query("SELECT * FROM cuenta WHERE cuenta_id = ?", [result.insertId]);
    res.status(201).json(row[0]);
  } catch (e) {
    res.status(500).json({ error: "Error creando cuenta", detail: e.message });
  }
});

export default router;
