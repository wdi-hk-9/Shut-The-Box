$(function(){
  // initial values
  var tile = $("a.tile");

  var updateMessage = function(playerMessage) {
    $('.player-message').html(playerMessage);

    // var msg = "Roll Total: " + game.dice.sum;
    // $('.roll-total').html(msg);
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
  var bindActiveTiles = function(){
    $("a.tile").off();

    var tile = $("a.tile");

    for (var i = 0; i < tile.length; i++) {
      var has_selected_tile = tile.eq(i).hasClass("player-selected");
      var has_disabled_tile = tile.eq(i).hasClass("tile-disabled");

      if ( !has_selected_tile && !has_disabled_tile ){
        tile.eq(i).on("click",function( event ) {
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
      }
    };
  };
  //check player selection with dice roll total and disable player selected tiles
  var confirmPlayerTileSelection = function () {
    if (game.started === true ){
      game.calculatePlayerTileSelection();
      if (game.dice.sum === game.playerTileTotal) {
        console.log("continue");

        for(var tile = 1; tile < 10; tile ++) {
          $tile = $('.player-selected');
          $tile.addClass('tile-disabled');
          $tile.removeClass('tile-active');
        }
      game.started = true;
      }
    }
  };

  //end player turn, calculate score and switch players
  $('#end-turn').on('click', function () {
    //console.log("end game");
    var points = 0
      for (var i = 0; i < tile.length; i++) {
        if (!tile.eq(i).hasClass('player-selected')) {
          var openTile = parseInt(tile.eq(i).html());
          points += openTile;
          console.log(points);
          //return points;
        }
      }
    game.players[game.currentPlayer]['points'] = points;
    //console.log(game.players[game.currentPlayer]['points']);
    $('h3.player1').html("Player 1: " + game.players[game.currentPlayer]['points']);
      if (game.currentPlayer === "Player1"){
        game.currentPlayer = "Player2";
      }

      game.tilesPlayerSelected = [];
      console.log(game.currentPlayer);
      refreshBoard();
      if (currentPlayer = "player2") {
        $('h3.player2').html("Player 2: " + game.players[game.currentPlayer]['points']);
      }
  });

  //click button to roll the dice
  $('#roll-btn').on('click', function () {
    confirmPlayerTileSelection();
    rollDice();
    updateMessage();
    updateTiles();
    bindActiveTiles();
  });

  // new game button function
  $('#new-game').on('click', function() {
      console.log("this should clear the game");
      refreshBoard();
      //game.dice = null;
      game.tilesPlayerSelected = [];
      game.playerTileTotal = 0;
      this.openTileValue = [];
      game.currentPlayer = "Player1";
      game.players[game.currentPlayer]['points'] = 0;

  });

  //refresh the tiles
  var refreshBoard = function () {
    var tile = $("a.tile");
      for (var i = 0; i < tile.length; i++) {
        tile.eq(i).removeAttr("class");
        tile.eq(i).addClass("tile");
        tile.eq(i).addClass("tile-active")
      }
    updateMessage(game.currentPlayer + ": Roll the Dice to Start Game");
  }

  var game = new Game();

});