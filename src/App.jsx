import { useEffect, useState } from "react"
import Die from "./components/Die"
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"


function App() {
  
  const [dice, setDice] = useState(allNewDice())
  const [isWon, setIsWon] = useState(false)


  useEffect(() => {
    checkWin() && setIsWon(true)
  }, [dice])

  function generateRandomNumber() {
    return Math.floor(Math.random()*6 + 1)
  }
  function newDieFace() {
    

    return {id:nanoid(), value:generateRandomNumber(), isHeld:false}
  }
  function allNewDice() {
    const arr = new Array(10).fill(0)
    return arr.map(() => newDieFace())
  }

  function holdDie(id) {
    setDice(oldDice => oldDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld}: die))
    
  }

function checkWin() {
  const arrValues = dice.map(die => die.value)
  const firstValue = arrValues[0]
  return dice.every(val => val.isHeld)  ? arrValues.every(value => value == firstValue): false;
}

function rollDice() {
  
  setDice(oldDice => oldDice.map(die => die.isHeld ? die : newDieFace()))
}

function startGame() {
  render()
}
function render() {
  setIsWon(false)
  setDice(allNewDice())
}

  const diceElements = dice.map(die => <Die isHeld={die.isHeld} key={die.id} id={die.id} value={die.value} handleClick={e => {holdDie(e.target.id)}} />)
 
   
  return (
    <main>
      {isWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <h4 className="subtitle">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h4>
     {!isWon && <div className="dies">
      
          {diceElements}
        
      </div> }
      {isWon && <h2 className="congratulate">Congratulations You have Won!!</h2>}
      <button className={`roll-btn ${isWon&&"hidden"}`} onClick={rollDice}>Roll</button>
      <button className={`start-btn ${!isWon&&"hidden"}`} onClick={startGame}>Start New Game</button>
       
    </main>
  )
}

export default App
