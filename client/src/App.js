import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./pages/Details/Details";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import SignUp from "./pages/SignUp/SignUp";
import RequireAuth from "./Routing/RequireAuth";
import "./App.css";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route element={<RequireAuth />}>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/details/:name/:symbol/:currency" element={<Details />} />
          </Route>
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
