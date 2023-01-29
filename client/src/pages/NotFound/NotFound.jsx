import { Link } from "react-router-dom";
import style from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={style.container}>
      <h1>404</h1>
      <h2>Page not found</h2>
      <Link to="/home">Go Home</Link>
    </div>
  );
}
