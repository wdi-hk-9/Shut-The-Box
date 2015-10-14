'use strict';

var Game = function(){
  this.dice = null;
  this.tilesPlayerSelected = [];
  this.playerTileTotal = 0;
  this.currentPlayer = "Player1";
  this.players = {
    Player1: {
      points: 0,
    },
    Player2: {
      points: 0,
    }
  };
};

// assign random number to dices
Game.prototype.roll = function(){
  this.dice = {
    dice1: Math.floor(Math.random() * (6 - 1 + 1)) + 1,
    dice2: Math.floor(Math.random() * (6 - 1 + 1)) + 1
  };
  this.dice.sum = this.dice.dice1 + this.dice.dice2;
};

// check player tile selection equals dice roll total
Game.prototype.calculatePlayerTileSelection = function(){
  this.playerTileTotal = 0;
  for (var i = 0; i < this.tilesPlayerSelected.length; i++) {
    this.playerTileTotal += this.tilesPlayerSelected[i];
  }
}