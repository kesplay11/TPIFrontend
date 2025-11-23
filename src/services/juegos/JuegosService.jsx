import axiosInstance from "../../axiosInstance/axiosInstance";

class JuegosService {
/**
 * 🟢 Crear un juego completo con rondas y equipos
 * @param {Object} juego
 * @param {number} juego.persona_id
 * @param {number} juego.categoria_id
 * @param {number} juego.turno_id
 * @param {number} juego.estado_juego_id
 * @param {string} juego.fecha_de_creacion
 * @param {boolean} juego.visible
 * @param {Array<Object>} juego.rondas - Cada ronda con estado_ronda_id, numero_ronda y equipos
 * @returns {Promise<Object>}
 */
async crearJuego(juego) {
    try {
    const res = await axiosInstance.post("/api/juegos", juego);
    return res.data;
    } catch (error) {
    console.error("Error al crear el juego:", error);
    throw error;
    }
}

/**
 * 🟢 Obtener TODOS los juegos (visibles o no, activos o borrados)
 * Esta ruta DEBE ser utilizada solo por roles con permiso (Coordinador/Capitán).
 * Corresponde a la ruta GET /juegos/all
 * @param {boolean} borrado - Filtra por borrado lógico (true = 1, false = 0)
 * @returns {Promise<Array>}
 */
async obtenerTodosLosJuegos(borrado = false) { // Renombrado de obtenerJuegos
    try {
        const res = await axiosInstance.get("/api/juegos/all", { // RUTA CORREGIDA a /juegos/all
            params: { borrado: borrado ? "1" : "0" },
        });
        return res.data;
    } catch (error) {
        console.error("Error al obtener todos los juegos:", error);
        throw error;
    }
}

/**
 * 🟢 Obtener SÓLO los juegos marcados como visibles (para Alumnos/Público)
 * Corresponde a la ruta GET /juegos/visible
 * @returns {Promise<Array>}
 */
async obtenerJuegosVisibles() {
    try {
        // Por defecto, esta ruta en el backend ya filtra por borrado_logico = 0 y visible = 1.
        const res = await axiosInstance.get("/api/juegos/visible"); 
        return res.data;
    } catch (error) {
        console.error("Error al obtener juegos visibles:", error);
        throw error;
    }
}

/**
 * 🟢 Actualizar un juego
 * @param {number} juego_id
 * @param {Object} datos - { categoria_id, turno_id }
 * @returns {Promise<Object>}
 */
async actualizarJuego(juego_id, datos) {
    try {
    const res = await axiosInstance.put(`/api/juegos/${juego_id}`, datos);
    return res.data;
    } catch (error) {
    console.error("Error al actualizar juego:", error);
    throw error;
    }
}

/**
 * 🟢 Cambiar estado del juego
 * @param {number} juego_id
 * @param {number} estado_juego_id
 * @returns {Promise<Object>}
 */
// async cambiarEstadoJuego(juego_id, estado_juego_id) {
//     try {
//     const res = await axiosInstance.put(`/api/juegos/estado/${juego_id}`, { estado_juego_id });
//     return res.data;
//     } catch (error) {
//     console.error("Error al cambiar estado del juego:", error);
//     throw error;
//     }
// }

/**
 * 🟢 Cambiar visibilidad del juego
 * @param {number} juego_id
 * @param {boolean} visible
 * @returns {Promise<Object>}
 */
// async cambiarVisibilidad(juego_id, visible) {
//     try {
//     const res = await axiosInstance.put(`/api/juegos/visible/${juego_id}`, { visible });
//     return res.data;
//     } catch (error) {
//     console.error("Error al cambiar visibilidad del juego:", error);
//     throw error;
//     }
// }

/**
 * 🔴 Borrar o restaurar un juego (lógico)
 * @param {number} juego_id
 * @param {boolean} borrado_logico
 * @returns {Promise<Object>}
 */
async borrarJuego(juego_id, borrado_logico) {
    try {
    const res = await axiosInstance.put(`/api/juegos/borrar/${juego_id}`, { borrado_logico });
    return res.data;
    } catch (error) {
    console.error("Error al borrar/recuperar juego:", error);
    throw error;
    }
}

/**
 * 🟢 Agregar una ronda a un juego existente
 * @param {number} juego_id
 * @param {Object} ronda - { estado_ronda_id, numero_ronda, equipos: [equipo_id1, equipo_id2] }
 * @returns {Promise<Object>}
 */
async agregarRonda(juego_id, ronda) {
    try {
    const res = await axiosInstance.post(`/api/juegos/${juego_id}/rondas`, ronda);
    return res.data;
    } catch (error) {
    console.error("Error al agregar ronda:", error);
    throw error;
    }
}


async actualizarRonda(juego_ronda_id, datos) {
    try {
        const res = await axiosInstance.put(`/api/juegos/rondas/${juego_ronda_id}`, datos);
        return res.data;
    } catch (error) {
        console.error("Error al actualizar la ronda:", error);
        throw error;
    }
}

/**
 * 🔴 Borrar o restaurar una ronda (lógico)
 * @param {number} juego_ronda_id
 * @param {boolean} borrado_logico
 * @returns {Promise<Object>}
 */
async borrarRonda(juego_ronda_id, borrado_logico) {
    try {
    const res = await axiosInstance.put(`/api/juegos/borrar-ronda/${juego_ronda_id}`, { borrado_logico });
    return res.data;
    } catch (error) {
    console.error("Error al borrar/recuperar la ronda:", error);
    throw error;
    }
}

async getResultados(juego_id){
    try{
        const res = await axiosInstance.get(`/api/juegos/${juego_id}`);
        return res.data;
    }catch(err){
        console.error(err)
        throw err;
    }
}

async obtenerJuegoPorId(juego_id){
    try{
        const res = await axiosInstance.get(`/api/juegos/datos/${juego_id}`);
        return res.data;
    } catch(err){
        console.error("Error al obtener datos del juego :",err);
        throw err;
    }
}

async obtenerDatosParaEditarJuegoPorId(juego_id){
    try{
        const res = await axiosInstance(`/api/juegos/editar/${juego_id}`);
        return res.data;
    }catch(err){
        console.error("Erro al obtener los datos del juego", err);
        throw err;
    }
}

async obtenerRondaPorId(juego_ronda_id){
    try{
        const res = await axiosInstance.get(`/api/juegos/rondas/${juego_ronda_id}`);
        return res.data
    } catch(err){
        console.error("Erro al obtener datos de la ronda :",err);
        throw err;
    }
}

async obtenerRondaCompletaPorJuegoId(juego_ronda_id){
    try{
        const res = await axiosInstance.get(`/api/juegos/ronda-completa/${juego_ronda_id}`);
        return res.data;
    }catch(err){
        console.error("No se cargaron los datos de la ronda: ",err);
        throw err;
    }
}

}


const juegosService = new JuegosService();

export default juegosService;
