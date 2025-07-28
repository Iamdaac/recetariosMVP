import React, { useState } from "react";

const AgregarPaciente = () => {
  const [formData, setFormData] = useState({
    nombre_pac: "",
    correo_pac: "",
    fecha_nacimiento: "",
    telefono_pac: "",
  });

  const [estado, setEstado] = useState("");

  const generarIdPaciente = () => {
    const numero = Math.floor(1000 + Math.random() * 9000);
    return `P${numero}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstado("Enviando...");

    const pacienteConId = {
      ...formData,
      id_paciente: generarIdPaciente(),
    };

    try {
      const res = await fetch(
        "https://q8zfwxp68j.execute-api.us-west-2.amazonaws.com/dev/pacientes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pacienteConId),
        }
      );

      if (res.ok) {
        setEstado("✅ Paciente agregado exitosamente");
        setFormData({
          nombre_pac: "",
          correo_pac: "",
          fecha_nacimiento: "",
          telefono_pac: "",
        });
      } else {
        const error = await res.text();
        setEstado("❌ Error del servidor: " + error);
      }
    } catch (err) {
      console.error(err);
      setEstado("❌ Error de red o backend");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Nuevo Paciente</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre del Paciente</label>
          <input
            type="text"
            className="form-control"
            name="nombre_pac"
            value={formData.nombre_pac}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            name="correo_pac"
            value={formData.correo_pac}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Fecha de Nacimiento</label>
          <input
            type="date"
            className="form-control"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Teléfono</label>
          <input
            type="tel"
            className="form-control"
            name="telefono_pac"
            value={formData.telefono_pac}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Agregar Paciente
        </button>
      </form>

      {estado && <div className="alert alert-info mt-3">{estado}</div>}
    </div>
  );
};

export default AgregarPaciente;
