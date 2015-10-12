'use strict';

var Game = function(){
  this.dice = null;
  this.maxDice = 6;
  this.tilesOpenTotal = 0;



};

 // generate random number
Game.prototype.randomDice = function(min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// assign random number to dices
Game.prototype.diceFace = function(){
  this.dice = {
    dice1: this.randomDice(1, this.maxDice),
    dice2: this.randomDice(1, this.maxDice)
  };
};

// retrieve sum of dices
Game.prototype.rollTotal = function(){
  return (this.dice.dice1) + (this.dice.dice2);
}