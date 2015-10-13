'use strict';

var Game = function(){
  this.dice = null;
  this.tilesOpenTotal = 0;
  this.tilesPlayerSelected = [];
  this.tempPlayerTotal = 0;
};

var diceTileCombos = {
  "2": [[2], [1,1]],
  "3": [[3], [1,2]],
  "4": [[4], [1,3]],
  "5": [[5], [4,1], [2,3]],
  "6": [[6], [1,5], [2,4], [3,2,1]],
  "7": [[7], [6,1], [5,2], [4,3], [4,2,1]],
  "8": [[8], [7,1], [6,2], [5,3], [3,4,1], [5,2,1]],
  "9": [[9], [8,1], [7,2], [6,3], [5,4], [6,2,1], [5,3,1], [6,2,1], [4,3,2]],
  "10": [[10], [9,1], [8,2], [7,3], [6,4], [7,2,1], [6,3,1], [5,4,1], [7,2,1], [5,3,2], [4,3,2,1]],
  "11": [[11], [10,1], [9,2], [8,3], [7,4], [6,5], [8,2,1], [7,3,1], [6,4,1], [5,3,2,1], [6,3,2], [5,4,2], [5,3,1,2], [5,3,2,1]],
  "12": [[12], [11,1], [10,2], [9,3], [8,4], [7,5], [9,2,1], [8,3,1], [7,4,1], [6,5,1], [6,3,2,1], [5,4,2,1], [9,2,1], [7,3,2] [6,4,2], [6,3,2,1], [5,4,3], [8,3,1], [7,3,2]]
}

// assign random number to dices
Game.prototype.roll = function(){
  this.dice = {
    dice1: Math.floor(Math.random() * (6 - 1 + 1)) + 1,
    dice2: Math.floor(Math.random() * (6 - 1 + 1)) + 1
  };

  this.dice.sum = this.dice.dice1 + this.dice.dice2;
};

Game.prototype.reCalculatePlayerTotal = function(){
  this.tempPlayerTotal = 0;
  for (var i = 0; i < this.tempPlayerSelected.length; i++) {
    this.tempPlayerTotal += this.tempPlayerSelected[i];
  }
}