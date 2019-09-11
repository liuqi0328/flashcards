import React from 'react';
import './Card.css';

const Card = (props) => (
  <div className="card-container">
    <div className="card">
      <div className="front">
        <div className="question">{props.question}</div>
      </div>
      <div className="front back">
        <div className="answer">{props.answer}</div>
        <div className="gth">{props.gth}</div>
        <div className="link">{props.link}</div>
      </div>
    </div>
  </div>
);

export default Card;