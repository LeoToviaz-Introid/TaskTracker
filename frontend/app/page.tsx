'use client';

import { useState } from 'react';

export default function Board() {
  let [turn, setTurn] = useState(0);  // impares para "X", pares para "O", 
  const [squares, setSquares] = useState(Array(9).fill(null));
  // no se usa estado porque esta funcion se ejecuta con cada renderizado
  // del componente; el componente solo se renderiza cuando hay click
  // en una casilla
  const winner = calculateWinner(squares);
  let status;
  if (winner) status = `Ganador ${winner}!`;
  else {
    if (turn & 1) status = `Turno de X`;
    else status = `Turno de O`;
  }

  function handleClick(squareIndex) {
    // que no haga nada la funcion en casillas ya marcadas
    if (squares[squareIndex] || calculateWinner(squares)) return;

    // implementacion con inmutabilidad (cambiar todo del objeto de una
    // para que react compare referencias y sepa en un nanosegundo que
    // el objeto cambió para asi re-renderizarlo)
    const newSquares = squares.slice();
    if (turn & 1) newSquares[squareIndex] = "X";
    else newSquares[squareIndex] = "O";
    setTurn(++turn);
    setSquares(newSquares);
    // implementacion con mutabilidad (se modifica el objeto en memoria
    // directamente), react tiene que hacer un ciclo lineal para saber
    // si el objeto cambio en memoria y como es una operacion muy lenta
    // no renderiza de nuevo el componente, "en teoria segun gemini"
    //squares[squareIndex] = "O";
    //setSquares(squares);
  }

  return <>
  <div>Status: {status}</div> {/* ganador x o sig. turno x */}
  <div className="square-row flex">
    {/* <Square value={1} /> */}
    {/*<Square value={squares[0]} onSquareClick={handleClick(0)} />*/}
    <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
    <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
    <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
  </div>
  <div className="square-row flex">
    <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
    <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
    <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
  </div>
  <div className="square-row flex">
    <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
    <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
    <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
  </div>
  </>;
}
// funcion copiada de https://react.dev/learn/tutorial-tic-tac-toe#declaring-a-winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square({ value, onSquareClick }) {
  //const [value, setValue] = useState(null);

  return (
    <button
      className="square border border-b-gray-500 w-10 h-10"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
