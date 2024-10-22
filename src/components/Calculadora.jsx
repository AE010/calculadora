import React, { useState } from "react";
import DisplayWindow from "./DisplayWindow";
import KeysWindow from "./KeysWindow";

const Calculadora =() =>{
  const[expression, setExpression] = useState("");
  const[displayEXP, setDisplayEXP] = useState("");
  const[result, setResult] = useState("0");

  const sciFunc = {
    sin: "Math.sin",
    cos: "Math.cos",
    tan: "Math.tan",
    asin: "Math.asin",
    acos: "Math.acos",
    atan: "Math.atan",
    ln: "Math.log",
    log: "Math.log10",
    π: "Math.PI",
    e: "Math.E",
    "^":"**",
    "√":"Math.sqrt",
  };

  const funcionesConParentesis = ["sin", "cos", "tan", "asin", "acos", "atan", "ln", "log", "√"];
  const operadores = ["+", "-", "*", "/"];

  function calcResult(){
    if (expression.length !== 0){
      try{
        let compute = eval(expression);
        setResult(compute);
      } catch (error){
        setResult("¡Un Error Ocurrió! ");
      }
    }else{
      setResult("¡Un Error Ocurrió!");
    }
  }

  function handleButton(value) {
    const lastChar = expression.slice(-1);

    if (value === "AC") {
      setExpression("");
      setDisplayEXP("");
      setResult("0");
    }
    else if (value === "DEL") {
      setDisplayEXP(displayEXP.slice(0, -1));
      setExpression(expression.slice(0, -1));
    }
    else if (operadores.includes(value)) {
      if (operadores.includes(lastChar)) {
        return;
      } else {
        setExpression(expression + value);
        setDisplayEXP(displayEXP + value);
      }
    }
    else if (sciFunc.hasOwnProperty(value)) {
      if (funcionesConParentesis.includes(value)) {
        setDisplayEXP(displayEXP + value + "(");
        setExpression(expression + sciFunc[value] + "(");
      } else {
        setDisplayEXP(displayEXP + value);
        setExpression(expression + sciFunc[value]);
      }
    }
    else if (value === "=") {
      const openParenthesis = (expression.match(/\(/g) || []).length;
      const closeParenthesis = (expression.match(/\)/g) || []).length;
      if (openParenthesis === closeParenthesis) {
        calcResult();
      } else {
        setResult("¡Paréntesis desbalanceados!");
      }
    }
    else {
      setExpression(expression + value);
      setDisplayEXP(displayEXP + value);
    }
  }

  return (
    <div className="calculadora">
      <DisplayWindow expression={displayEXP} result={result} />
      <KeysWindow handleButton={handleButton} />
    </div>
  );
};

export default Calculadora;