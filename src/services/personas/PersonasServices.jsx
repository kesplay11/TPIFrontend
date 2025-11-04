// src/services/personas/PersonasService.jsx
import axiosInstance from "../../axiosInstance/axiosInstance";
import { auth } from "../../localStorage/localstorage";

class PersonasService {
  // 🔹 Crear persona (hash automático en backend)
  async crearPersona(data) {
    try {
      const response = await axiosInstance.post("/api/personas", data);
      return response.data;
    } catch (error) {
      console.error("Error al crear persona:", error);
      throw error;
    }
  }

  // 🔹 Crear persona y enviar mail de bienvenida
  async crearPersonaConMail(data) {
    try {
      const response = await axiosInstance.post("/api/personas/mail", data);
      return response.data;
    } catch (error) {
      console.error("Error al crear persona con envío de correo:", error);
      throw error;
    }
  }

  // 🔹 Verificar si una persona existe por DNI
  async verificarDNI(dni) {
    try {
      const response = await axiosInstance.get(`/api/personas/verificar/${dni}`);
      return response.data;
    } catch (error) {
      console.error("Error al verificar DNI:", error);
      throw error;
    }
  }

  // 🔹 Obtener todas las personas (con filtro opcional)
  async obtenerPersonas(busqueda = "") {
    try {
      const response = await axiosInstance.get("/api/personas", {
        params: { busqueda },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener personas:", error);
      throw error;
    }
  }

  // 🔹 Obtener persona por documento
  async obtenerPersonaPorDocumento(documento) {
    try {
      const response = await axiosInstance.get(`/api/personas/${documento}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener persona por documento:", error);
      throw error;
    }
  }

  // 🔹 Actualizar datos de una persona
  async actualizarPersona(persona_id, data) {
    try {
      const response = await axiosInstance.put(`/api/personas/${persona_id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar persona:", error);
      throw error;
    }
  }

  // 🔹 Cambiar estado (borrado lógico o reactivar)
  async cambiarEstado(persona_id, borrado_logico) {
    try {
      const response = await axiosInstance.put(`/api/personas/estado/${persona_id}`, {
        borrado_logico,
      });
      return response.data;
    } catch (error) {
      console.error("Error al cambiar estado de persona:", error);
      throw error;
    }
  }

  // 🔹 Establecer contraseña (set-password)
  async setPassword(nuevaPass) {
      const persona_id = auth.getUSerID();
      if(!persona_id){
        console.error("No se pudo obtener el id de la persona para cambiar la contraseña");
        throw new Error("ID de usuario no encontrado");
      }
      try{
        const response = await axiosInstance.put(`/api/personas/${persona_id}/set-password`, 
          { pass: nuevaPass }
      );
      return response.data;
      
    } catch (error) {
      console.error("Error al establecer contraseña:", error);
      throw error;
    }
  }
}

// Exporta una instancia única del servicio
const personasService = new PersonasService();
export default personasService;
