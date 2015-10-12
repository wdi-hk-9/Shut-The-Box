$(function(){

var game = new Game();

game.diceFace();

console.log(game);

console.log(game.dice.dice1);
console.log(game.dice.dice2);
var rollTotal = (game.dice.dice1) + (game.dice.dice2);
console.log(rollTotal);

var tilesOpen = $(".tile");


for (var i = 0; i < tilesOpen.length; i++){
  console.log(parseInt(tilesOpen.eq(i).html()));
  game.tilesOpenTotal += parseInt(tilesOpen.eq(i).html());
  console.log(game.tilesOpenTotal);
}

if game.tilesOpenTotal < rollTotal {
  alert("Game Over");
}



});