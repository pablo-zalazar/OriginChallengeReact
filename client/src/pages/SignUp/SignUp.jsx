import { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import style from "./SignUp.module.css";

const initialValues = { username: "", password: "", password2: "" };

export default function SignUp() {
  const [state, setState] = useState(initialValues);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { signUpContext } = useContext(UserContext);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (key, e) => {
    if (error) setError("");
    setState({ ...state, [key]: e.target.value });
  };

  const validation = () => {
    if (!state.username || !state.password || !state.password2) {
      setError("Todos campos son requeridos");
      return false;
    } else if (state.username.length < 4) {
      setError("El usuario debe tener al menos 4 caracteres");
      return false;
    } else if (state.password.length < 8 || state.password2.length < 8) {
      setError("Los passwords deben tener al menos 8 caracteres");
      return false;
    } else if (state.password !== state.password2) {
      setError("Los passwords tienen que coincidir");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      try {
        e.preventDefault();
        await signUpContext(state);
        setState(initialValues);
        navigate("/", { replace: true });
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>
        {error && <p className={style.error}>{error}</p>}
        <div>
          <label htmlFor="username">Usuario</label>
          <input
            className={style.input}
            id="username"
            name="username"
            value={state.username}
            onChange={(e) => handleChange("username", e)}
            placeholder="4 caracteres minimo"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className={style.input}
            type={showPassword1 ? "text" : "password"}
            id="password"
            name="password"
            placeholder="8 caracteres minimo"
            value={state.password}
            onChange={(e) => handleChange("password", e)}
          />

          <button className={style.show} type="button" tabIndex="-1" onClick={() => setShowPassword1(!showPassword1)}>
            {showPassword1 ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        <div>
          <label htmlFor="password2">Repetir password</label>
          <input
            className={style.input}
            type={showPassword2 ? "text" : "password"}
            id="password2"
            name="password2"
            placeholder="8 caracteres minimo"
            value={state.password2}
            onChange={(e) => handleChange("password2", e)}
          />
          <button className={style.show} type="button" tabIndex="-1" onClick={() => setShowPassword2(!showPassword2)}>
            {showPassword2 ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        <input type="submit" value="SignUp" />
        <p>
          ¿Ya tienes cuenta? <Link to="/">Login</Link>
        </p>
      </form>
    </>
  );
}
