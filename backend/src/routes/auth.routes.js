import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// POST /api/auth/login  {correo, contraseña}
router.post("/login", async (req, res) => {
  // Extrae credenciales del cuerpo de la petición
  const { correo, contrasena } = req.body;

  // Valida campos obligatorios
  if (!correo || !contrasena) return res.status(400).json({ error: "Faltan campos" });

  try {
    // Consulta en MySQL un usuario activo que coincida con correo y contraseña (texto plano)
    const [rows] = await pool.query(
      `SELECT usuario_id, rol_id, nombre, ape_pat, ape_mat
       FROM usuario
       WHERE correo = ? AND contrasena = ? AND activo = 1`,
      [correo, contrasena]
    );

    // Si no encontró coincidencias, credenciales inválidas
    if (rows.length === 0) return res.status(401).json({ error: "Credenciales inválidas" });

    // Retorna el usuario (sin contraseña) al cliente
    res.json({ user: rows[0] });
  } catch (e) {
    // Error inesperado (por ejemplo, de conexión o sintaxis SQL)
    res.status(500).json({ error: "Error en login", detail: e.message });
  }
});

export default router;
