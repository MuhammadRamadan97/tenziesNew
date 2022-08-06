import Die from "./Die";
import React from "react";
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {


  function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
  function allNewDice() {
    let arr = []
    for(let i=0;i<10;i++){
      arr.push(generateNewDie())
    }
    
    return arr
  }
  const [state,setState] = React.useState(allNewDice())
  const [tenzies,setTenzies] =React.useState(false)
  React.useEffect(()=>{
    if(state.every(die => die.isHeld)&& state.every(die => die.value== state[0].value)){
      
      setTenzies(true)
    }
  },[state])
  let dice = state.map(die => <Die holdDice={() =>holdDice(die.id)} key={die.id} value={die.value} isHeld={die.isHeld}/>)
  function roll() {
    setState(state.map(die => die.isHeld?die:generateNewDie()))
  }
  function holdDice(id) {
    setState(prev => prev.map(die =>  die.id===id?{...die,isHeld:!die.isHeld}:die))
    
  }
  function newGame() {
    setState(allNewDice)
    setTenzies(false)
  }
 let btnText = tenzies?"New Game":"Roll"
  return (
    <div className="App">
      {tenzies && <div><Confetti /></div>}
      <main className="main">
        <h1 className="title">Tenzies</h1>
        {tenzies &&<h1 className="dina">💪💪💪عااااش يا دينا</h1>}
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice">
          {dice}
        </div>
        <button className="btn" onClick={tenzies?newGame:roll}>{btnText}</button>
      </main>
    </div>
  );
}

export default App;
