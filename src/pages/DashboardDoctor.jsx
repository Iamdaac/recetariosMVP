import React, { useEffect, useState } from "react";
import TarjetaPaciente from "../components/TarjetaPaciente";

const DashboardDoctor = () => {
  const [pacientes, setPacientes] = useState([]);
  const [estado, setEstado] = useState("");

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const res = await fetch(
          "https://q8zfwxp68j.execute-api.us-west-2.amazonaws.com/dev/pacientes"
        );
        const data = await res.json();
        setPacientes(data);
      } catch (err) {
        console.error(err);
        setEstado("Error al cargar pacientes");
      }
    };

    fetchPacientes();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Pacientes Asignados</h2>
      {estado && <div className="alert alert-danger">{estado}</div>}

      <div className="d-flex flex-wrap gap-3">
        {pacientes.map((paciente) => (
          <TarjetaPaciente key={paciente.id_paciente} paciente={paciente} />
        ))}
      </div>
    </div>
  );
};

export default DashboardDoctor;
