'use strict';

var Game = function(){
  this.dice = null;
  this.tilesOpenTotal = 0;
  this.tempPlayerSelected = [];
  this.tempPlayerTotal = 0;

};

 // generate random number
Game.prototype.randomDice = function(){
  return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
};

// assign random number to dices
Game.prototype.diceFace = function(){
  this.dice = {
    dice1: this.randomDice(),
    dice2: this.randomDice()
  };
};

// retrieve sum of dices
Game.prototype.rollTotal = function(){
  return (this.dice.dice1) + (this.dice.dice2);
}

Game.prototype.playerTotal = function(){
  this.tempPlayerTotal = 0;
  //console.log("Current Total ", this.tempPlayerTotal)
  for (var i = 0; i < this.tempPlayerSelected.length; i++) {
    this.tempPlayerTotal += this.tempPlayerSelected[i];
  }
  //console.log("After sum ", this.tempPlayerTotal);
}