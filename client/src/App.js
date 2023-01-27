import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./pages/Details/Details";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import RequireAuth from "./Routing/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/details/:name" element={<Details />} />
        </Route>
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
