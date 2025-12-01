import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import carrito from "../assets/carrito.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      alert("El email no es válido");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="login-container">

      <img src={carrito} alt="carrito" className="logo" />

      <h1 className="title">🛒 SUPER PERONCHO</h1>

      <form className="login-form" onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="toggle-pass"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <div className="extra-options">
          
         <div class="remember-container">
  <label class="switch">
    <input type="checkbox" />
    <span class="slider round"></span>
  </label>
  <span class="remember-text">Recordarme</span>
</div>


          <span className="forgot" onClick={() => alert("Aún no disponible")}>
            ¿Olvidaste tu contraseña?
          </span>
        </div>

        <button type="submit" className="btn-login">Iniciar sesión</button>
      </form>

      <button className="btn-register" onClick={() => navigate("/register")}>
        Registrarse
      </button>
    </div>
  );
}

<div className="switch-box">
  <label className="switch">
    <input type="checkbox" />
    <span className="slider"></span>
  </label>
  <p>Recordarme</p>
</div>

