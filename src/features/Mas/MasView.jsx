
import BarraMasOpciones from './components/BarraMasOpciones';

import { useEffect } from 'react';

export default function MasView() {
  useEffect(()=>{
    console.log("estamos dentro de mas view")
  })

  return (
    <div>
      <header className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark sticky top-0 z-10 border-b border-primary/20 dark:border-primary/30">
        <h2 className="text-xl font-bold text-black dark:text-white flex-1 text-center">
          Más herramientas
        </h2>
      </header>


            <BarraMasOpciones></BarraMasOpciones>
  
   
    </div>
  );
}
