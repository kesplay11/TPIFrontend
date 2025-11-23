// src/features/Dashboard/pages/Equipos/AgregarEquipoView.jsx

import { useLocation } from "wouter";
import { useState } from "react";
import useForm from "../../../hooks/useForm";
import equiposService from "../../../services/equipos/EquiposService"; 
import CategoriaForm from "../../Categorias/components/CategoriaForm";
import LayoutSubView from "../../common/LayoutSubView";
// 👆 Reutilizamos el mismo formulario (tiene el mismo campo)

export default function AgregarEquipoView() {
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  // 🧠 Validación local
  const validate = (values) => {
    const errors = {};
    if (!values.nombre.trim()) {
      errors.nombre = "El nombre es obligatorio.";
    }
    return errors;
  };

  const {
    values,
    errors,
    handleChange,
    resetForm,
    validateForm,
  } = useForm({ nombre: "" }, validate);

  // 🧩 Enviar formulario
  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    setServerError("");

    try {
      await equiposService.crearEquipo(values.nombre.trim());
      resetForm();
      alert("Equipo Creado Exitosamente");
      // 🔁 Volver al listado de equipos
      setLocation("/dashboard/mas/equipos");

    } catch (error) {
      alert("El equipo no se creo");
      console.error("Error al crear equipo:", error);
      setServerError("Ocurrió un error al crear el equipo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setLocation("/dashboard/mas/equipos");
  };

  return (
    <LayoutSubView title={"Agregar Equipo"}>
      <CategoriaForm
        values={values}
        errors={errors}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel={isSubmitting ? "Guardando..." : "Aceptar"}
      />

      {serverError && (
        <p className="text-red-500 mt-4 text-center">{serverError}</p>
      )}
  </LayoutSubView>
  );
}
