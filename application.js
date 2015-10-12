$(function(){

var game = new Game();

rollDice();

function rollDice () {
  game.diceFace();
  // console.log(game.rollTotal());
  changeDiceImage(game.dice.dice1, $('#dice1') );
  changeDiceImage(game.dice.dice2, $('#dice2') );
  $('.roll-total').html("Roll Total: " + game.rollTotal());
}

function changeDiceImage(dice, element){
  switch (dice) {
    case 1:
      element.attr("src", "file:///var/folders/ct/7_7rql1n1wz2jz37vvqd0cpm0000gn/T/noun_dice_116708.png");
      break;
    case 2:
      element.attr("src", "file:///var/folders/ct/7_7rql1n1wz2jz37vvqd0cpm0000gn/T/noun_dice_116707.png");
      break;
    case 3:
      element.attr("src", "file:///var/folders/ct/7_7rql1n1wz2jz37vvqd0cpm0000gn/T/noun_dice_116713.png");
        break;
    case 4:
      element.attr("src", "file:///var/folders/ct/7_7rql1n1wz2jz37vvqd0cpm0000gn/T/noun_dice_116712.png");
        break;
    case 5:
      element.attr("src", "file:///var/folders/ct/7_7rql1n1wz2jz37vvqd0cpm0000gn/T/noun_dice_116709.png");
        break;
    case 6:
      element.attr("src", "file:///var/folders/ct/7_7rql1n1wz2jz37vvqd0cpm0000gn/T/noun_dice_116710.png");
        break;
  }
}

var tilesOpen = $(".tile");
for (var i = 0; i < tilesOpen.length; i++){
  console.log(parseInt(tilesOpen.eq(i).html()));
  game.tilesOpenTotal += parseInt(tilesOpen.eq(i).html());
  //console.log(game.tilesOpenTotal);
}


// if game.tilesOpenTotal < rollTotal {
//   alert("Game Over");
// }

});