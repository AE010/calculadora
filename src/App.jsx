import React from "react";
import Calculadora from "./components/Calculadora";

const App =() =>{
  return (
    <div className="App">
      <Calculadora/>
      <p className="developer">
        *Los resultados trigonometricos son en radianes</p>
        <p className="developer">
        Diseñado por <span>Armas Trujillo Emiliano</span>
      </p>
    </div>
  )
}

export default App;