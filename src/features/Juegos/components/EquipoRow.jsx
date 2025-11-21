export default function EquipoRow({ equipo }) {
  return (
    <div
      style={{
        border: "1px solid #aaa",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <p><strong>{equipo.nombre}</strong></p>

      <p>Puntos: {equipo.puntos}</p>

      <p>
        Estado:{" "}
        {equipo.yaCargado ? (
          <span style={{ color: "green" }}>Cargado</span>
        ) : (
          <span style={{ color: "orange" }}>Pendiente</span>
        )}
      </p>
    </div>
  );
}
