import React from "react";
import Die from "./components/Die";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice);
  const diceElements = dice.map(die => {
    return (<Die key={die.id} value={die.value} isHeld={die.isHeld} toggleClick={() => holdDice(die.id)} />)
  })
  const [tenzies, setTenzies] = React.useState(false);
  const [count, setCount] = React.useState(0)

  function allNewDice() {
    const newArray = [];

    for (let i = 0; i < 10; i++) {
      newArray.push({
        id: i,
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      });
    }

    return newArray;
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice);
      setCount(0);
    } else {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : {
          id: die.id,
          value: Math.ceil(Math.random() * 6),
          isHeld: false
        }
      }))
      setCount(prevCount => prevCount+1)
    }
  }

  function holdDice(id) {
    setDice((prevDice) => prevDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice])

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <p>Rolled Count : {count}</p>
      <button className="roll-dice" onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
    </main>
  );
}

export default App;
