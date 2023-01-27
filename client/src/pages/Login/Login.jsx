import { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";

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
    try {
      e.preventDefault();
      await loginContext(state);
      setState(initialValues);
      navigate("/home", { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <div>
        <label htmlFor="username">username</label>
        <input id="username" name="username" value={state.username} onChange={(e) => handleChange("username", e)} placeholder="username" />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder="password"
          value={state.password}
          onChange={(e) => handleChange("password", e)}
        />
        {showPassword ? (
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            <AiFillEyeInvisible />
          </button>
        ) : (
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            <AiFillEye />
          </button>
        )}
      </div>
      <input type="submit" value="login" />
    </form>
  );
}
