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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.username || !state.password || !state.password2) {
      setError("Ambos campos son requeridos");
    } else if (state.password !== state.password2) {
      setError("los passwords tienen que coincidir");
    } else {
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
            placeholder="usuario"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className={style.input}
            type={showPassword1 ? "text" : "password"}
            id="password"
            name="password"
            placeholder="password"
            value={state.password}
            onChange={(e) => handleChange("password", e)}
          />
          {showPassword1 ? (
            <button className={style.show} type="button" onClick={() => setShowPassword1(!showPassword1)}>
              <AiFillEyeInvisible />
            </button>
          ) : (
            <button className={style.show} type="button" onClick={() => setShowPassword1(!showPassword1)}>
              <AiFillEye />
            </button>
          )}
        </div>
        <div>
          <label htmlFor="password2">Repetir password</label>
          <input
            className={style.input}
            type={showPassword2 ? "text" : "password"}
            id="password2"
            name="password2"
            placeholder="password"
            value={state.password2}
            onChange={(e) => handleChange("password2", e)}
          />
          {showPassword2 ? (
            <button className={style.show} type="button" onClick={() => setShowPassword2(!showPassword2)}>
              <AiFillEyeInvisible />
            </button>
          ) : (
            <button className={style.show} type="button" onClick={() => setShowPassword2(!showPassword2)}>
              <AiFillEye />
            </button>
          )}
        </div>
        <input type="submit" value="SignUp" />
        <p>
          ¿Ya tienes cuenta? <Link to="/">Login</Link>
        </p>
      </form>
    </>
  );
}
