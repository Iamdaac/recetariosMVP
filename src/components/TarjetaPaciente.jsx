import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const TarjetaPaciente = ({ paciente }) => {
  return (
    <div className="card shadow-sm mb-3" style={{ width: "18rem" }}>
      <div className="card-body text-center">
        <i className="bi bi-person-circle fs-1 text-primary mb-3"></i>
        <h5 className="card-title">{paciente.nombre_pac}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{paciente.correo_pac}</h6>
        <p className="card-text">
          <strong>Fecha de nacimiento:</strong> {paciente.fecha_nacimiento}
          <br />
          <strong>Teléfono:</strong> {paciente.telefono_pac}
        </p>
      </div>
    </div>
  );
};

export default TarjetaPaciente;
