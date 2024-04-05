import { useEffect, useState } from "react";
import "./App.css";
import SingelCards from "./Components/SingelCards/SingelCards";

const cardIamges = [
  {
    src: "https://www.dpsainiflorist.com/wp-content/uploads/2021/05/dp5108.jpg",
    matched: false,
  },
  {
    src: "https://imgcdn.floweraura.com/DSC_6641.jpg",
    matched: false,
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYTBTDnoMSvd02F9xmoh5WqM_UovqEfWjYlv3tf-fGG3xEtcJkXrxS9EeMO0mbX1HKZ6A&usqp=CAU",
    matched: false,
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS85leSdHPdRhtxkV2kiSAk5CH4Rltm4gBx9qJCQOaxAdv7s6ozYlb38hkGri1A10xkarI&usqp=CAU",
    matched: false,
  },
  {
    src: "https://content.hy-vee.com/remote.axd/www.hy-vee.com/webres/Image/catalog/10995_2_Classic%20Dozen%20Deluxe24.jpg?v=1&mode=crop&quality=75&width=500&height=500",
    matched: false,
  },
  {
    src: "https://assets.winni.in/product/primary/2023/1/81951.jpeg?dpr=2&w=220",
    matched: false,
  },
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disable, setDisable] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardIamges, ...cardIamges]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.floor(Math.random() * 2000) }));

    setCards(shuffledCards);
    setTurns(0);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const handelChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisable(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCard) => {
          return prevCard.map((card) => {
            if (card.src === choiceTwo.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurns();
      } else {
        setTimeout(() => {
          resetTurns();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisable(false);
  };
  return (
    <>
      <button className="btn-newGame" onClick={shuffleCards}>
        New Game
      </button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingelCards
            key={card.id}
            card={card}
            handelChoice={handelChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disable}
          />
        ))}
      </div>
    </>
  );
};

export default App;
