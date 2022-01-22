import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  {"src" : "/img/helmet-1.png", "matched": false},
  {"src" : "/img/potion-1.png", "matched": false},
  {"src" : "/img/ring-1.png", "matched": false},
  {"src" : "/img/scroll-1.png", "matched": false},
  {"src" : "/img/shield-1.png", "matched": false},
  {"src" : "/img/sword-1.png", "matched": false}
]

function App() {
	const [cards, setCards] = useState([])
	const [turns, setTurns] = useState(0)
	const [choiceOne, setChoiceOne] = useState(null)
	const [choiceTwo, setChoiceTwo] = useState(null)
	const [disabled, setDisabled] = useState(false)


	// Shuffle Cards
	const shuffleCards = () => {
		const shuffledCard = [...cardImages,...cardImages]
			.sort(() => { return (Math.random() - 0.5) })
			.map((card) => {
				return {...card, "id": Math.random()}
			})
		
		setChoiceOne(null)
		setChoiceTwo(null)
		setCards(shuffledCard)
		setTurns(0)
	}

	// Handle Choices
	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
	}

	useEffect(() => {
		if(choiceOne && choiceTwo){
			setDisabled(true)
			if(choiceOne.src === choiceTwo.src){
				setCards((prevCard) => {
					return (
						prevCard.map(card => {
							if(card.src === choiceOne.src){
								return {...card, "matched": true}
							}else{
								return card
							}
						})
					)
				})
			}
			setTimeout(() => resetTurns() , 1000)
		}
	},[choiceOne,choiceTwo])

	useEffect(() => {
		shuffleCards()
	},[])

	const resetTurns = () => {
		setChoiceOne(null)
		setChoiceTwo(null)
		setTurns((prevTurn) => prevTurn+1 )
		setDisabled(false)
	}

	return (
		<div className="App">
			<h1>Magic Match</h1>
			<button onClick={shuffleCards}>New Game</button>
			<div className="card-grid">
			{
				cards.map((card) => (
					<SingleCard 
						key={card.id} 
						card={card} 
						handleChoice={handleChoice}
						flipped={card.matched || card === choiceOne || card === choiceTwo }
						disabled={disabled}
					/>
				))
			}
			</div>
			<p>Turns: {turns}</p>
		</div>
	);
}

export default App