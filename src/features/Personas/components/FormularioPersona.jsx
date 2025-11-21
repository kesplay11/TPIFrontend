
import { TextField, Button, Typography, Card, CircularProgress, MenuItem } from "@mui/material";

// Opciones de Año Escolar - Se mantiene aquí ya que es parte de la presentación
const SCHOOL_YEARS = ['1ro', '2do', '3ro', '4to', '5to', '6to', '7mo'];

export default function FormularioPersona({
    values,
    handleChange,
    handleSubmit,
    loading,
    error,
    successMessage,
    roles,
    equipos,
    title,
    submitButtonText,
    isDocumentDisabled = false, // Para deshabilitar el campo en edición
}) {
    // Determinar si los datos de dependencia están cargando/disponibles
    const dataLoading = roles.length === 0 || equipos.length === 0;

    return (
        <div className="flex items-center justify-center bg-withe-100 w-full border-none shadow-none outline-none p-2">
            <Card className="p-4 w-full max-w-lg border-none shadow-none outline-none" sx={{ boxShadow: 'none', border: 'none' }}>
                <Typography variant="h5" component="h3" className="mb-4 text-center">
                    {title}
                </Typography>

                <form
                    role="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    {/* Mensaje de Éxito */}
                    {successMessage && (
                        <Typography color="primary" className="text-center font-bold p-2 bg-green-100 rounded">
                            {successMessage}
                        </Typography>
                    )}

                    {/* Fila 1: Nombre */}
                    <TextField
                        variant="filled"
                        label="Nombre Completo"
                        name="nombre"
                        type="text"
                        value={values.nombre}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    {/* Fila 2: Documento y Correo */}
                    <div className="flex gap-4">
                        <TextField
                            variant="filled"
                            label="Documento (DNI)"
                            name="documento"
                            type="tel"
                            value={values.documento}
                            onChange={handleChange}
                            required
                            className="w-1/2"
                            disabled={isDocumentDisabled || loading} // Deshabilitar si estamos en modo edición o cargando
                        />
                        <TextField
                            variant="filled"
                            label="Correo electrónico"
                            name="correo"
                            type="email"
                            value={values.correo}
                            onChange={handleChange}
                            required
                            className="w-1/2"
                        />
                    </div>

                    {/* Fila 3: Selectores - Rol y Equipo */}
                    <div className="flex gap-4">
                        {/* Selector de Rol */}
                        <TextField
                            select
                            variant="filled"
                            label="Rol del Usuario"
                            name="rol_id"
                            value={values.rol_id}
                            onChange={handleChange}
                            required
                            className="w-1/2"
                            disabled={loading || dataLoading}
                        >
                            <MenuItem value="" disabled>Seleccione un Rol</MenuItem>
                            {roles.map((rol) => (
                                <MenuItem key={rol.rol_id} value={rol.rol_id}>
                                    {rol.rol_nombre}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Selector de Equipo */}
                        <TextField
                            select
                            variant="filled"
                            label="Equipo Asignado"
                            name="equipo_id"
                            value={values.equipo_id}
                            onChange={handleChange}
                            required
                            className="w-1/2"
                            disabled={loading || dataLoading}
                        >
                            <MenuItem value="" disabled>Seleccione un Equipo</MenuItem>
                            {equipos.map((equipo) => (
                                <MenuItem key={equipo.equipo_id} value={equipo.equipo_id}>
                                    {equipo.nombre}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    {/* Fila 4: Selector de Año Escolar */}
                    <TextField
                        select
                        variant="filled"
                        label="Año Escolar"
                        name="anio_escolar"
                        value={values.anio_escolar}
                        onChange={handleChange}
                        required
                        fullWidth
                        disabled={loading}
                    >
                        <MenuItem value="" disabled>Seleccione el Año</MenuItem>
                        {SCHOOL_YEARS.map((year, index) => (
                            <MenuItem key={index} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </TextField>


                    {/* Mensaje de Error (si existe) */}
                    {error && (
                        <Typography color="error" className="text-center font-medium">
                            {error}
                        </Typography>
                    )}

                    {/* Botón de Envío */}
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={loading || dataLoading || !values.rol_id || !values.equipo_id || !values.anio_escolar}
                        color="primary"
                        sx={{ textTransform: "none", fontSize: "23px", marginTop: "16px" }}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        {loading ? "Procesando..." : submitButtonText}
                    </Button>

                </form>
            </Card>
        </div>
    );
}