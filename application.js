$(function(){

var game = new Game();

$('.player-message').html("Player: Click Dice to Roll");

$('div.dice').on('click', function rollDice () {
  game.diceFace();
  // console.log(game.rollTotal());
  changeDiceImage(game.dice.dice1, $('#dice1') );
  changeDiceImage(game.dice.dice2, $('#dice2') );
  $('.roll-total').html("Roll Total: " + game.rollTotal());
  checkOpenTiles();
});

function checkOpenTiles(){
  var tile = $(".tile");
  for (var i = 0; i < tile.length; i++){
    console.log(parseInt(tile.eq(i).val()));
    game.tilesOpenTotal += parseInt(tile.eq(i).val());
  }

  if (game.rollTotal() > game.tilesOpenTotal) {
    console.log("Game Over");
  } else {
    addClickEvent();
  }
}

function addClickEvent(){
  var tile = $(".tile");
  for (var i = 0; i < tile.length; i++){
    tile[i].addEventListener("click", closeTile);
  }
}

function closeTile(e){
  var value = $(e.target).val();
  var selectedValue = parseInt($(e.target).html());
  var index = game.tempPlayerSelected.indexOf(selectedValue);
  if (index === -1) {
    game.tempPlayerSelected.push(selectedValue);
    ($(e.target).val(0).toggleClass("font-color"));
  } else {
    game.tempPlayerSelected.splice(index, 1);
    ($(e.target).removeClass("font-color"));
    }
  //console.log("The array ", game.tempPlayerSelected);
  game.playerTotal();
  //console.log(game.tempPlayerSelected);
  //console.log("After sum ", game.tempPlayerTotal);
  checkTileDiceMatch();
}

function checkTileDiceMatch(){
  if (game.rollTotal === game.tempPlayerTotal) {
    console.log("roll total and tiles closed match!");
  }
}

function changeDiceImage(dice, element){
  switch (dice) {
    case 1:
      element.attr("src", "img/face1.png");
      break;
    case 2:
      element.attr("src", "img/face2.png");
      break;
    case 3:
      element.attr("src", "img/face3.png");
        break;
    case 4:
      element.attr("src", "img/face4.png");
        break;
    case 5:
      element.attr("src", "img/face5.png");
        break;
    case 6:
      element.attr("src", "img/face6.png");
        break;
  }
}

});