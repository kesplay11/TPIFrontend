
import BarraGestionPuntos from "./components/BarraGestionPuntos";


export default function AdminPuntosView() {
  return (
    <div className="relative flex h-auto w-full flex-col justify-between bg-background-light dark:bg-background-dark font-display">
      <header className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark sticky top-0 z-10 border-b border-primary/20 dark:border-primary/30">
        <h2 className="text-xl font-bold text-black dark:text-white flex-1 text-center">
          Gestión de Puntos
        </h2>
      </header>

<BarraGestionPuntos></BarraGestionPuntos>
<h2>barrrrrraaaaaaaa</h2>
    </div>
  );
}
