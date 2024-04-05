import React from "react";
import "./SingelCards.css";

const SingelCards = ({ card, handelChoice, flipped, disabled }) => {
  const handelClick = () => {
    !disabled && handelChoice(card);
  };

  return (
    <>
      <div className="card" key={card.id}>
        <div className={flipped ? "flipped" : ""}>
          <img className="front" src={card.src} alt="image" />
          <img
            className="back"
            src="cover.jpg"
            alt="cover"
            onClick={handelClick}
          />
        </div>
      </div>
    </>
  );
};

export default SingelCards;
