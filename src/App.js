import React, { Component } from 'react';
import Card from './Card/Card.js';
import DrawButton from './DrawButton/DrawButton.js';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

import dbConfig from './Config/Firebase/db_config.js';
//import { throwStatement } from '@babel/types';

class App extends Component {
  constructor(props){
    super(props);

    this.app = dbConfig;
    this.database = this.app.database().ref().child('cards');
    this.updateCard = this.updateCard.bind(this);

    this.state = {
      cards: [],
      curretCard: {}
    }
  }

  componentWillMount(){
    const currentCards = this.state.cards;
    //console.log(firebase.name);
    console.log(firebase.database());
    this.database.on('child_added', snapshot => {
      var data = snapshot.val();
      //console.log(data);
      currentCards.push({
        id: data.id,
        question: data.question,
        answer: data.answer,
        gth: data.gth,
        link: data.link
      })
      //console.log(currentCards);
      this.setState({
        cards: currentCards,
        currentCard: this.getRandomCard(currentCards)
      })
      //console.log(this.state.currentCard)
    })
  }

  getRandomCard(currentCards){
    var randomInd = Math.floor(Math.random() * currentCards.length);
    var card = currentCards[randomInd];
    if(card === this.state.currentCard) {
      this.getRandomCard(currentCards);
    }
    //console.log(currentCards);
    return (card);
  }

  updateCard(){
    const currentCards = this.state.cards;
    this.setState({
      cards: currentCards,
      currentCard: this.getRandomCard(currentCards)
    })
  }

  render() {
    return (
      <div className="App">
        <div className="cardRow">
          <Card question={this.state.cards.question}
                answer={this.state.cards.answer}
                gth={this.state.cards.gth}
                link={this.state.cards.link}
          />
        </div>
        <div className="buttonRow">
          <DrawButton drawCard={this.updateCard} />
        </div>
      </div>
    );
  }
}

export default App;
