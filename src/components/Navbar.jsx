import React from "react";
import { Link } from "react-router-dom";
import LogoMed from "../assets/logoMed.jpeg";

const NavBar = () => {
  return (
    <div
      className="bg-light d-flex flex-column align-items-center position-fixed top-0 start-0 h-100 p-3"
      style={{ width: "80px" }}
    >
      <Link
        to="/"
        className="mb-4 link-dark text-decoration-none"
        title="Inicio"
        data-bs-toggle="tooltip"
        data-bs-placement="right"
      >
        <img src={LogoMed} alt="Logo Hospital" className="fluid w-100" />
      </Link>

      <ul className="nav nav-pills nav-flush flex-column text-center">
        <li className="nav-item mb-3">
          <Link
            to="/DashboardDoctor"
            className="nav-link py-2 px-0"
            title="Dashboard"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
          >
            <i className="bi bi-speedometer2 fs-4"></i>
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link
            to="/AgregarPaciente"
            className="nav-link py-2 px-0"
            title="Pacientes"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
          >
            <i className="bi bi-person-lines-fill fs-4"></i>
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link
            to="/GenerarReceta"
            className="nav-link py-2 px-0"
            title="Recetas"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
          >
            <i className="bi bi-file-medical fs-4"></i>
          </Link>
        </li>
      </ul>

      <div className="mt-auto">
        <Link
          to="/salir"
          className="d-flex align-items-center justify-content-center link-dark text-decoration-none"
          title="Salir"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
        >
          <i className="bi bi-box-arrow-left fs-4"></i>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
