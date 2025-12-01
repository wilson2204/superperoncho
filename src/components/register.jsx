import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Registro exitoso 💚");
    navigate("/");
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h1 className="titulo">Super Peroncho 🛒</h1>
        <p className="sub">Crear nueva cuenta</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="dni"
            placeholder="DNI"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Correo"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-register">Registrarse</button>

          <p className="volver" onClick={() => navigate("/")}>
            ← Volver al Login
          </p>
        </form>
      </div>
    </div>
  );
}
