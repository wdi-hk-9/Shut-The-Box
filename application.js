$( function() {
  // initial values
  var tile = $( "a.tile" );

  // update messages to players
  var updateMessage = function( playerMessage ) {
    $( '.player-message' ).html( playerMessage );
  };

  // change dice image
  var rollDice = function() {
    game.roll();
    $( '#dice1' ).attr( 'src', 'img/face' + game.dice.dice1 + '.png' );
    $( '#dice2' ).attr( 'src', 'img/face' + game.dice.dice2 + '.png' );
    var msg = "Roll Total: " + game.dice.sum;
    $( '.roll-total' ).html( msg );
  };

  // smaller or equal the dice roll, AND not used
  var titleisActive = function( tile ) {
    return ( tile <= game.dice.sum );
  };

  // if tile > dice roll then disable tiles
  var updateTiles = function() {
    for ( var tile = 1; tile < game.maxTile; tile++ ) {
      $tile = $( '#p1-tile' + tile );

      if ( titleisActive( tile ) ) {
        $tile.addClass( 'tile-active' );
        $tile.removeClass( 'tile-disabled' );
      } else {
        $tile.addClass( 'tile-disabled' );
        $tile.removeClass( 'tile-active' );
      }
    }
  };

  //add or remove player selected tiles
  var bindActiveTiles = function() {
    $( "a.tile" ).off();

    var tile = $( "a.tile" );

    for ( var i = 0; i < tile.length; i++ ) {
      var has_selected_tile = tile.eq( i ).hasClass( "player-selected" );
      var has_disabled_tile = tile.eq( i ).hasClass( "tile-disabled" );

      if ( !has_selected_tile && !has_disabled_tile ) {
        tile.eq( i ).on( "click", function( event ) {
          var tileValue = parseInt( $( this ).html() );
          var index = game.tilesPlayerSelected.indexOf( tileValue );

          if ( index === -1 ) {
            $( this ).addClass( 'player-selected' );
            game.tilesPlayerSelected.push( tileValue );
          } else {
            game.tilesPlayerSelected.splice( index, 1 );
            $( this ).removeClass( 'player-selected' );
          }
          confirmPlayerTileSelection();
        } );
      }
    };
  };

  //check player selection with dice roll total and disable player selected tiles
  var confirmPlayerTileSelection = function() {
    if ( game.started === true ) {
      game.calculatePlayerTileSelection();
      if ( game.dice.sum === game.playerTileTotal ) {
        $( '#confirm-tiles' ).removeAttr( "disabled" );
      }

      $( '#confirm-tiles' ).on( 'click', function() {
        for ( var tile = 1; tile < game.maxTile; tile++ ) {
          $tile = $( '.player-selected' );
          $tile.addClass( 'tile-disabled' );
          $tile.removeClass( 'tile-active' );
        }

        updateMessage( game.currentPlayer + ": click dice to roll" );
        $( '#roll-btn' ).removeClass( "hide" );
        $( '#end-turn' ).addClass( "hide" );
        $( '#confirm-tiles' ).addClass( "hide" );
        game.playerTileTotal = 0;
        game.tilesPlayerSelected = [];

      } )
    }
  };

  //end player turn, calculate score and switch players
  $( '#end-turn' ).on( 'click', function() {
    var points = 0
    for ( var i = 0; i < tile.length; i++ ) {
      if ( !tile.eq( i ).hasClass( 'player-selected' ) ) {
        var openTile = parseInt( tile.eq( i ).html() );
        points += openTile;
      }
    }

    game.players[ game.currentPlayer ][ 'points' ] = points;

    if ( game.currentPlayer === "Player1" ) {
      $( 'h3.player1' ).html( game.currentPlayer + ": " + game.players[ game.currentPlayer ][ 'points' ] );
    } else {
      $( 'h3.player2' ).html( game.currentPlayer + ": " + game.players[ game.currentPlayer ][ 'points' ] );
    }

    if ( game.currentPlayer === "Player1" ) {
      game.currentPlayer = "Player2";
      updateMessage( game.currentPlayer + ": Click Roll the Dice" );
      $( '#roll-btn' ).removeClass( "hide" );
      $( '#end-turn' ).addClass( "hide" );
      $( '#confirm-tiles' ).addClass( "hide" );
    } else {
      updateMessage( "Game Over" );
      if ( ( game.players[ 'Player1' ][ 'points' ] ) > ( game.players[ 'Player2' ][ 'points' ] ) ) {
        alert( "Player2 Wins!" );
      } else if ( ( game.players[ 'Player1' ][ 'points' ] ) < ( game.players[ 'Player2' ][ 'points' ] ) ) {
        alert( "Player1 Wins!" );
      } else {
        alert( "its a draw" );
      }
    }
    game.tilesPlayerSelected = [];
    refreshBoard();
  } );

  updateMessage( "Player1: Click Roll the Dice to Start Game" );

  //click button to roll the dice
  $( '#roll-btn' ).on( 'click', function() {
    game.started = true;
    $( '#roll-btn' ).addClass( "hide" );
    $( '#end-turn' ).removeClass( "hide" );
    $( '#confirm-tiles' ).removeClass( "hide" );
    $( '#confirm-tiles' ).attr( "disabled", "" );
    updateMessage( game.currentPlayer + ": Select tiles to win" );

    rollDice();
    updateTiles();
    bindActiveTiles();
  } );

  // new game button function
  $( '#new-game' ).on( 'click', function() {
    refreshBoard();
    game.maxTile = 0;
    game.tilesPlayerSelected = [];
    game.playerTileTotal = 0;
    this.openTileValue = [];
    game.currentPlayer = "Player1";
    game.players[ game.currentPlayer ][ 'points' ] = 0;
    $( 'h3.player2' ).html( "Player 2: " + game.players[ game.currentPlayer ][ 'points' ] );
    $( 'h3.player1' ).html( "Player 1: " + game.players[ game.currentPlayer ][ 'points' ] );
    updateMessage( game.currentPlayer + ": Roll the Dice to Start" );
    $( '#roll-btn' ).removeClass( "hide" );
    $( '#confirm-tiles' ).addClass( "hide" );
    $( '#end-turn' ).addClass( "hide" );
    $( 'section.intro-page' ).removeClass( "hide" );
    $( 'section.game-page' ).addClass( "hide" );
  } );

  //refresh the tiles
  var refreshBoard = function() {
    var tile = $( "a.tile" );
    for ( var i = 0; i < tile.length; i++ ) {
      tile.eq( i ).removeAttr( "class" );
      tile.eq( i ).addClass( "tile" );
      tile.eq( i ).addClass( "tile-active" )
    }
  }

  //intro page start game click event
  $( 'button#start-game' ).on( 'click', function() {
    // selectNumberOfTiles();
    $( 'section.intro-page' ).addClass( "hide" );
    $( 'section.game-page' ).removeClass( "hide" );


  } )

  //select number of tiles 9 or 12
  // var selectNumberOfTiles = function(){
  $( 'section.intro-page #9tile' ).on( 'click', function() {
    console.log( '9 tiles' );
    game.maxTile = 10
    console.log( game.maxTile );
    $( 'a#p1-tile10' ).detach().html(0);
    $( 'a#p1-tile11' ).detach().html(0);
    $( 'a#p1-tile12' ).detach().html(0);

  } );
  $( 'section.intro-page #12tile' ).on( 'click', function() {
    console.log( '12 tiles' );
    game.maxTile = 13
    console.log( game.maxTile );
    $( '#tiles' ).append( '<a class="tile tile-active" value="10" id="p1-tile10">10</a>' );
    $( '#tiles' ).append( '<a class="tile tile-active" value="11" id="p1-tile11">11</a>' );
    $( '#tiles' ).append( '<a class="tile tile-active" value="12" id="p1-tile12">12</a>' );
  } );
  // }


  var game = new Game();
} );
