import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config(); // carga variables de entorno desde .env a process.env

// Crea un pool de conexiones a MySQL (versión con Promesas)
export const pool = mysql.createPool({
  host: process.env.DB_HOST, // ej: 'localhost'
  port: process.env.DB_PORT, // ej: '3306' (string desde .env)
  user: process.env.DB_USER, // usuario de MySQL
  password: process.env.DB_PASS, // contraseña de MySQL
  database: process.env.DB_NAME, // base de datos (BancoDB)
  waitForConnections: true, // espera si no hay conexiones libres
  connectionLimit: 10, // máximo de conexiones simultáneas en el pool
  queueLimit: 0 // 0 = sin límite de peticiones en cola
});
