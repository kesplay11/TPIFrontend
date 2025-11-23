import { useLocation } from "wouter";
import { useState } from "react";
import useForm from "../../../hooks/useForm";
import categoriasService from "../../../services/categorias/CategoriasService";
import CategoriaForm from "../components/CategoriaForm";
import LayoutSubView from "../../common/LayoutSubView";

export default function AgregarCategoriaView() {
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
      await categoriasService.crearCategoria(values.nombre.trim());
      resetForm();
      alert("Categoria Creada")
      // 🔁 Volver a la lista de categorías
      setLocation("/dashboard/mas/categorias");
    } catch (error) {
      console.error("Error al crear categoría:", error);
      setServerError("Ocurrió un error al crear la categoría.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setLocation("/dashboard/mas/categorias");
  };

  return (
    <LayoutSubView title={"Agregar Categoria"}>
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
