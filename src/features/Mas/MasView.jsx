
import BarraMasOpciones from './components/BarraMasOpciones';
import { useEffect } from 'react';
import LayoutBase from '../common/LayoutBase';

export default function MasView() {
  useEffect(()=>{
    console.log("estamos dentro de mas view")
  })

  return (
    <LayoutBase title={"Más"}>
            <BarraMasOpciones></BarraMasOpciones>
    </LayoutBase>
  );
}
