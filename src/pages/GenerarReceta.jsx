import React, { useEffect, useState } from "react";

const GenerarReceta = () => {
  const [doctores, setDoctores] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [estado, setEstado] = useState("");

  const [formData, setFormData] = useState({
    id_paciente: "",
    nombre_pac: "",
    correo_pac: "",
    id_doctor: "",
    nombre_doc: "",
    fecha: "",
    nombre_medicamento: "",
    dosis: "",
    instrucciones: "",
  });

  // Cargar pacientes y doctores
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resPac, resDoc] = await Promise.all([
          fetch(
            "https://q8zfwxp68j.execute-api.us-west-2.amazonaws.com/dev/pacientes"
          ),
          fetch(
            "https://q8zfwxp68j.execute-api.us-west-2.amazonaws.com/dev/doctores"
          ),
        ]);
        const dataPac = await resPac.json();
        const dataDoc = await resDoc.json();
        setPacientes(dataPac);
        setDoctores(dataDoc);
      } catch (err) {
        console.error(err);
        setEstado("Error al cargar pacientes o doctores");
      }
    };
    fetchData();
  }, []);

  // Manejadores
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectPaciente = (e) => {
    const id = e.target.value;
    const paciente = pacientes.find((p) => p.id_paciente === id);
    setFormData((prev) => ({
      ...prev,
      id_paciente: id,
      nombre_pac: paciente?.nombre_pac || "",
      correo_pac: paciente?.correo_pac || "",
    }));
  };

  const handleSelectDoctor = (e) => {
    const id = e.target.value;
    const doctor = doctores.find((d) => d.id_doctor === id);
    setFormData((prev) => ({
      ...prev,
      id_doctor: id,
      nombre_doc: doctor?.nombre_doc || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstado("Enviando...");

    const recetaPayload = {
      id_paciente: formData.id_paciente,
      id_doctor: formData.id_doctor,
      fecha: formData.fecha,
      medicamento: {
        nombre_medicamento: formData.nombre_medicamento,
        dosis: formData.dosis,
        instrucciones: formData.instrucciones,
      },
    };

    try {
      // 1. Guardar la receta
      const res = await fetch(
        "https://q8zfwxp68j.execute-api.us-west-2.amazonaws.com/dev/recetas",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recetaPayload),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        setEstado("Error del servidor: " + text);
        return;
      }

      // 2. Construir el enlace al PDF (a reemplazar por URL real en producción)
      const pdfUrl = `https://main.d2au1aklitxvxj.amplifyapp.com/`;

      // 3. Enviar correo al paciente usando Lambda SES
      const correoPayload = {
        correo_paciente: formData.correo_pac,
        nombre_paciente: formData.nombre_pac,
        fecha: formData.fecha,
        pdf_url: pdfUrl,
      };

      const correoRes = await fetch(
        "https://q8zfwxp68j.execute-api.us-west-2.amazonaws.com/dev/enviar-receta",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(correoPayload),
        }
      );

      if (!correoRes.ok) {
        const text = await correoRes.text();
        setEstado("Receta guardada, pero error al enviar correo: " + text);
        return;
      }

      // 4. Éxito total
      setEstado("Receta generada y correo enviado exitosamente");
      setFormData({
        id_paciente: "",
        nombre_pac: "",
        correo_pac: "",
        id_doctor: "",
        nombre_doc: "",
        fecha: "",
        nombre_medicamento: "",
        dosis: "",
        instrucciones: "",
      });
    } catch (err) {
      console.error(err);
      setEstado("Error de red o backend");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Generar Receta Médica</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Paciente</label>
          <select
            className="form-select"
            value={formData.id_paciente}
            onChange={handleSelectPaciente}
            required
          >
            <option value="">Seleccionar paciente</option>
            {pacientes.map((p) => (
              <option key={p.id_paciente} value={p.id_paciente}>
                {p.nombre_pac}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Correo del Paciente</label>
          <input
            type="email"
            className="form-control"
            value={formData.correo_pac}
            disabled
          />
        </div>

        <div className="mb-3">
          <label>Doctor</label>
          <select
            className="form-select"
            value={formData.id_doctor}
            onChange={handleSelectDoctor}
            required
          >
            <option value="">Seleccionar doctor</option>
            {doctores.map((d) => (
              <option key={d.id_doctor} value={d.id_doctor}>
                {d.nombre_doc}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Fecha</label>
          <input
            type="date"
            className="form-control"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Nombre del Medicamento</label>
          <input
            type="text"
            className="form-control"
            name="nombre_medicamento"
            value={formData.nombre_medicamento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Dosis</label>
          <input
            type="text"
            className="form-control"
            name="dosis"
            value={formData.dosis}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Instrucciones</label>
          <textarea
            className="form-control"
            name="instrucciones"
            rows="3"
            value={formData.instrucciones}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Enviar Receta
        </button>
      </form>

      {estado && <div className="alert alert-info mt-3">{estado}</div>}
    </div>
  );
};

export default GenerarReceta;
