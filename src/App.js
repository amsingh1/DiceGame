import "./App.css";

import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const generateNewDice = () => {
    return { value: Math.ceil(Math.random() * 6), select: false, id: nanoid() };
  };

  const allNewDice = () => {
    const newArr = [];
    for (let i = 0; i < 10; i++) {
      newArr.push(generateNewDice());
    }

    return newArr;
  };

  const [nums, setNums] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  React.useEffect(() => {
    const allHeld = nums.every((die) => die.select);
    const firstValue = nums[0].value;
    const allSameValue = nums.every((die) => die.value === firstValue);
    console.log("game on");
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("you won!");
    }
  }, [nums]);

  const handleRoll = () => {
    if (!tenzies) {
      setNums((oldDice) =>
        oldDice.map((die) => {
          return die.select ? die : generateNewDice();
        })
      );
    } else {
      setTenzies(false);
      setNums(allNewDice());
    }
  };
  const changeColor = (id) => {
    setNums((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, select: !die.select } : die;
      })
    );
  };

  const newnumber = nums.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      changeColor={() => changeColor(die.id)}
      select={die.select}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti width={1500} height={1000} />}
      <h1 className="title">Tenzies</h1>
      <p className="instruction">
        Roll until all the dice are same.Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{newnumber}</div>
      <div className="rollBtn">
        <button className="btn btn-primary" onClick={handleRoll}>
          {tenzies ? "New Game" : "ROLL"}
        </button>
      </div>
    </main>
  );
}

export default App;
