$(function(){
  // initial values
  var tile = $(".tile");

  var updateMessage = function(playerMessage) {
    $('.player-message').html(playerMessage);

    var msg = "Roll Total: " + game.dice.sum;
    $('.roll-total').html(msg);
  };

  // change dice image
  var rollDice = function() {
    game.roll();
    $('#dice1').attr('src', 'img/face' + game.dice.dice1 +'.png');
    $('#dice2').attr('src', 'img/face' + game.dice.dice2 +'.png');
  };

  // Smaller or equal the dice roll, AND not used
  var titleisActive = function(tile) {
    return (tile <= game.dice.sum);
  };

  // if tile > dice roll then disable tiles
  var updateTiles = function() {
    for(var tile = 1; tile < 10; tile ++) {
      $tile = $('#p1-tile'+tile);

      if (titleisActive(tile)) {
        $tile.addClass('tile-active');
        $tile.removeClass('tile-disabled');
      } else {
        $tile.addClass('tile-disabled');
        $tile.removeClass('tile-active');
      }
    }
  };

  //add or remove player selected tiles
  $("a.tile").click(function( event ) {
    var tileValue = parseInt($(this).html());
    var index = game.tilesPlayerSelected.indexOf(tileValue);

      if (index === -1) {
        $(this).addClass('player-selected');
        game.tilesPlayerSelected.push(tileValue);
      } else {
        game.tilesPlayerSelected.splice(index, 1);
        $(this).removeClass('player-selected');
      }
  });

  //check player selection with dice roll total and disable player selected tiles
  var confirmPlayerTileSelection = function () {

  }


  $('#roll-btn').on('click', function () {

    rollDice();
    updateMessage();
    updateTiles();

  });

  var game = new Game();

});