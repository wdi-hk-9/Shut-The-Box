$(function(){

var game = new Game();
//var tile = $(".tile");

rollDice();

function rollDice () {
  game.diceFace();
  // console.log(game.rollTotal());
  changeDiceImage(game.dice.dice1, $('#dice1') );
  changeDiceImage(game.dice.dice2, $('#dice2') );
  $('.roll-total').html("Roll Total: " + game.rollTotal());
  checkOpenTiles();
}

function checkOpenTiles(){
  var tile = $(".tile");
  for (var i = 0; i < tile.length; i++){
    //console.log(parseInt(tile.eq(i).html()));
    game.tilesOpenTotal += parseInt(tile.eq(i).html());
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
  var selectedValue = parseInt($(e.target).val());
  var index = game.tempPlayerSelected.indexOf(selectedValue);

  if (index === -1) {
    game.tempPlayerSelected.push(selectedValue);
  } else {
    game.tempPlayerSelected.splice(index, 1);
  }
  console.log("The array ", game.tempPlayerSelected);
  game.playerTotal();
  // console.log(game.tempPlayerSelected);
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