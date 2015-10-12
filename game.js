'use strict';

var Game = function(){
  this.dice = null;
  this.maxDice = 6;
  this.tilesOpenTotal = 0;



};

Game.prototype.randomDice = function(min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

Game.prototype.diceFace = function(){
  this.dice = {
    dice1: this.randomDice(1, this.maxDice),
    dice2: this.randomDice(1, this.maxDice)
  };
};



