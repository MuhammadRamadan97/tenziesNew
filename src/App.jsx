import { useEffect, useState } from "react"
import Die from "./components/Die"
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

const diceDotsArr = ["⚀","⚁","⚂","⚃","⚄","⚅"]



function App() {
  
  const [dice, setDice] = useState(allNewDice())
  const [isWon, setIsWon] = useState(false)
  const [rounds, setRounds] = useState(0)
  const [time, setTime] = useState(0)
  

  useEffect(() => {
    checkWin() && setIsWon(true)
  }, [dice])

  useEffect(() => {
    let interval 
    if(!isWon){
       interval = setInterval(() => setTime(time +1), 1000)
    }
    
    return () => clearInterval(interval);
  }, [time])

  

  function generateRandomNumber() {
    return Math.floor(Math.random()*6)
  }


  function newDieFace() {
    

    return {id:nanoid(), value :diceDotsArr[generateRandomNumber()], isHeld:false}
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
  setRounds(prevRounds => prevRounds + 1)
  setDice(oldDice => oldDice.map(die => die.isHeld ? die : newDieFace()))
}

function startGame() {
  render()
}
function render() {
  setIsWon(false)
  setTime(0)
  setRounds(0)
  setDice(allNewDice())
}

  const diceElements = dice.map(die => <Die isHeld={die.isHeld} key={die.id} id={die.id} value={die.value} handleClick={e => {holdDie(e.target.id)}} />)
 
   
  return (
    <main>

      {isWon && <Confetti className="confetti"/>}
      <div className="head">
        <h3 className="rounds">Rounds: {rounds}</h3>
        <h3 className="time">time: {time} sec</h3>
      </div>
      
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
