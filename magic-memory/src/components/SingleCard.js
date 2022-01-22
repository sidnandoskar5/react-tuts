import "./SingleCard.css"

export default function SingleCard({card, handleChoice, flipped, disabled}) {
    const handleClick = () => {
        if(!disabled){
            handleChoice(card)
        }
    }

    return (
        <div className="card" key={card.id}>
            <div className={ flipped ? "flipped" : "" }>
                <img className="front" src={card.src} alt="Card Front" />
                <img 
                    className="back" 
                    src="/img/cover.png" 
                    alt="Card Back" 
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}