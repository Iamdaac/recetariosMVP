import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/Navbar";
import AgregarPaciente from "./pages/AgregarPaciente";
import GenerarReceta from "./pages/GenerarReceta";
import DashboardDoctor from "./pages/DashboardDoctor";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="ms-5 ps-5">
        <Routes>
          <Route path="/" element={<Navigate to="/DashboardDoctor" />} />
          <Route path="/AgregarPaciente" element={<AgregarPaciente />} />
          <Route path="/GenerarReceta" element={<GenerarReceta />} />
          <Route path="/DashboardDoctor" element={<DashboardDoctor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
