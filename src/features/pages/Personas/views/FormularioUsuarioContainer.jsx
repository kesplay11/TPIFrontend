// FormularioUsuarioContainer.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import FormularioPersona from '../components/FormularioPersona';
import useForm from '../../../../hooks/useForm';
import personasService from '../../../../services/personas/PersonasServices';
import rolesService from '../../../../services/roles/RolesService';
import equiposService from '../../../../services/equipos/EquiposService';

const SCHOOL_YEARS = ['1ro', '2do', '3ro', '4to', '5to', '6to', '7mo'];

const FormularioUsuarioContainer = ({ 
  usuarioParaEditar, 
  onGuardar, 
  onCancelar 
}) => {
  const { values, handleChange, resetForm } = useForm({
    documento: "",
    nombre: "",
    correo: "",
    anio_escolar: "", 
    rol_id: "",       
    equipo_id: "",    
  });

  const [, setLocation] = useLocation();

  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [roles, setRoles] = useState([]);
  const [equipos, setEquipos] = useState([]);

  // Cargar roles y equipos
  useEffect(() => {
    const fetchDependencies = async () => {
      setDataLoading(true);
      try {
        const fetchedEquipos = await equiposService.obtenerEquipos(0);
        setEquipos(fetchedEquipos);

        const fetchedRoles = await rolesService.obtenerRoles();
        setRoles(fetchedRoles);
      } catch (err) {
        setError("Error al cargar roles y equipos. Revise la conexión.");
      } finally {
        setDataLoading(false);
      }
    };

    fetchDependencies();
  }, []);

  // Si estamos en modo edición, cargamos los datos del usuario a editar
  useEffect(() => {
    if (usuarioParaEditar) {
      // Suponemos que usuarioParaEditar tiene los mismos campos que el formulario
      resetForm(usuarioParaEditar);
    }
  }, [usuarioParaEditar, resetForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    const dataToSend = {
      documento: values.documento,
      rol_id: values.rol_id,
      equipo_id: values.equipo_id,
      correo: values.correo,
      anio_escolar: values.anio_escolar,
      nombre: values.nombre
    };

    try {
      if (usuarioParaEditar) {
        // Modo edición: llamar al servicio de actualización
        // Nota: Necesitaríamos un servicio para actualizar, por ejemplo: personasService.actualizarPersona
        // await personasService.actualizarPersona(usuarioParaEditar.id, dataToSend);
        // setSuccessMessage("Usuario actualizado con éxito");
      } else {
        // Modo creación
        await personasService.crearPersonaConMail(dataToSend);
        setSuccessMessage("¡Usuario creado y correo de bienvenida enviado con éxito!");
        resetForm();
      }

      // Si se proporciona una función onGuardar, la llamamos
      if (onGuardar) {
        onGuardar(dataToSend);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || (usuarioParaEditar ? "Error al actualizar la persona." : "Error al crear la persona. Verifique los datos."));
    } finally {
      setLoading(false);
    }
  };

  // Pasamos las opciones de roles, equipos y school years al componente presentacional
  return (
    <FormularioPersona
      valores={values}
      errores={{}}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancelar={onCancelar}
      modoEdicion={!!usuarioParaEditar}
      loading={loading}
      dataLoading={dataLoading}
      error={error}
      successMessage={successMessage}
      roles={roles}
      equipos={equipos}
      schoolYears={SCHOOL_YEARS}
    />
  );
};

export default FormularioUsuarioContainer;