import { useState } from "react";

/*
Cuando inicia el juego, la aplicación piensa un número del 1 al 10. Hay un campo de texto donde el 
jugador ingresa su intento. Si lo adivina sale un mensaje de éxito con el número de intentos que hizo 
el jugador y comienza nuevamente (vuelve a pensar un número). De lo contrario (si no lo adivina) sale 
un mensaje diciendo que lo vuelva a intentar.

Bonus: a la derecha sale una tabla con el número de intentos de cada juego. Y debajo un total que 
sume los intentos.

*/
var id = 1;
export default function App() {
  const generateRandom = () => Math.floor(Math.random() * (2 - 1) + 1);

  const [random, setRandom] = useState(generateRandom);
  const [number, setNumber] = useState("");
  const [tries, setTries] = useState(0);
  const [games, setGames] = useState([]);
  const [countTries, setCountTries] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (number && number > 0 && number < 11) {
      if (random === number) {
        if (tries < 1) {
          alert(
            `Felicidades, adivinaste el numero.
            En el intento # ${1}`
          );
        } else {
          alert(
            `Felicidades, adivinaste el numero.
            En el intento # ${tries + 1}`
          );
        }
        let auxGames = [...games];
        const newGame = { id, tries };
        auxGames.push(newGame);
        resetGame(auxGames);
      } else {
        alert(`Vuelve a intentarlo`);
        let newTries = tries + 1;
        setTries(newTries);
        setNumber("");
      }
    } else {
      alert("Debe ingresar un numero entre 1 y 10");
      setNumber("");
    }
  };

  const resetGame = (auxGames) => {
    id++;
    setGames(auxGames);
    setRandom(generateRandom);
    setNumber("");
    setTries(0);
    setCountTries(countTriesPerGame(auxGames));
  };

  const countTriesPerGame = (array) =>
    array
      .map((item) => item.tries)
      .reduce((acumulador, nextValue) => acumulador + nextValue, 0);

  return (
    <div className="App">
      <div className="bg-7">
        <h1>Adivinador</h1>
      </div>
      <div className="Game">
        <div className="Console__Game">
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Ingresa un Numero del 1 al 10"
              type="number"
              value={number}
              onChange={(e) => setNumber(parseInt(e.target.value))}
            />
          </form>
        </div>
        <div className="Results__Game">
          <ul className="todo">
            {games.map((item, index) => (
              <li key={item.id}>
                Juego # {item.id}
                <li className="Interno">Intentos: {item.tries + 1}</li>
              </li>
            ))}
            {games.length > 0 ? (
              <li>
                Total de intentos:<li className="Interno">{countTries}</li>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
