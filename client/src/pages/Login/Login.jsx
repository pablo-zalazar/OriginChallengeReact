import { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import style from "./Login.module.css";

const initialValues = { username: "", password: "" };

export default function Login() {
  const [state, setState] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const { loginContext } = useContext(UserContext);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (key, e) => {
    if (error) setError("");
    setState({ ...state, [key]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.username || !state.password) {
      setError("Ambos campos son requeridos");
    } else {
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
          {showPassword ? (
            <button className={style.show} type="button" onClick={() => setShowPassword(!showPassword)}>
              <AiFillEyeInvisible />
            </button>
          ) : (
            <button className={style.show} type="button" onClick={() => setShowPassword(!showPassword)}>
              <AiFillEye />
            </button>
          )}
        </div>
        <input type="submit" value="login" />
        <p>
          ¿No tienes cuenta? <Link to="/signup">Registrarse</Link>
        </p>
      </form>
    </>
  );
}
