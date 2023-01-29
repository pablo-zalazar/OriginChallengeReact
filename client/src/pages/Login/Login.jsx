import { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import style from "./Login.module.css";

const initialValues = { username: "", password: "" };

export default function Login() {
  const { loginContext } = useContext(UserContext);

  const [state, setState] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (key, e) => {
    if (error) setError("");
    setState({ ...state, [key]: e.target.value });
  };

  const validation = () => {
    if (!state.username || !state.password) {
      setError("Todos campos son requeridos");
      return false;
    } else if (state.username.length < 4) {
      setError("El usuario debe tener al menos 4 caracteres");
      return false;
    } else if (state.password.length < 8) {
      setError("El password debe tener al menos 8 caracteres");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      try {
        await loginContext(state);
        setState(initialValues);
        navigate("/home", { replace: true });
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p className={style.error}>{error}</p>}
        <div>
          <label htmlFor="username">Usuario</label>
          <input
            className={style.input}
            id="username"
            name="username"
            value={state.username}
            onChange={(e) => handleChange("username", e)}
            placeholder="usuario"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className={style.input}
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="password"
            value={state.password}
            onChange={(e) => handleChange("password", e)}
          />

          <button className={style.show} type="button" tabIndex="-1" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        <input type="submit" value="login" />
        <p>
          ¿No tienes cuenta? <Link to="/signup">Registrarse</Link>
        </p>
      </form>
    </>
  );
}
