class Game {
  constructor() {
  }

  verifyIsPlayerOne(userId) {
    if (userId == 1) {
      return true;
    } return false;
  }

  verifyIsPlayerTwo(userId) {
    if (userId == 2) {
      return true;
    } return false;
  }

  playerOneInfo = null;
  playerTwoInfo = null;


  cleanupPlayers() {
    this.playerOneInfo = null;
    this.playerTwoInfo = null;
  }

  setPlayersInfo(info) {
    let { player_id, player_token, player_position } = info;

    if (player_id == 1) this.setPlayerOneInfo(info);
    if (player_id == 2) this.setPlayerTwoInfo(info);


  }

  setPlayerOneInfo(info) {
    this.playerOneInfo = info;
  }

  setPlayerTwoInfo(info) {
    this.playerTwoInfo = info;
  }

  verifyWalls() {
    let coordsPlayer1 = this?.playerOneInfo?.player_position;
    let coordsPlayer2 = this?.playerTwoInfo?.player_position;
    if (coordsPlayer1 != undefined) {
      let head = coordsPlayer1[0];
      let x = head[0];
      let y = head[1];
      if (x == 19 || x == 0 || y == 19 || y == 0) {
        return true;
      }
    }
    if (coordsPlayer2 != undefined) {
      let head = coordsPlayer2[0];
      let x = head[0];
      let y = head[1];
      if (x == 19 || x == 0 || y == 19 || y == 0) {
        return true;
      }

    }

    return false;
  }


  hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
  }

  verifySnakesCollisions() {

    let coordsPlayer1 = this?.playerOneInfo?.player_position;
    let coordsPlayer2 = this?.playerTwoInfo?.player_position;
    if (coordsPlayer1 != undefined && coordsPlayer2 != undefined) {
      const coordsJoin = coordsPlayer1.concat(coordsPlayer2);
      coordsJoin.sort();
      for (let i = 0; i < coordsJoin.length; i++) {
        if (i > 0) {
          let actual = coordsJoin[i]
          let last = coordsJoin[i - 1]
          if (actual[0] == last[0] && actual[1] == last[1]) {
            return true;
          }
        }
      }
      return false;
    }

  }



  verifyWaiting() {
    if (this.playerOneInfo == null || this.playerTwoInfo == null) {
      return {
        'gameStatus': 'waiting',
        'gameMessage': 'Aguardando demais jogadores na partida',
        'playerOnePosition': null,
        'playerTwoPosition': null,
        'playerOnePoints': null,
        'playerTwoPoints': null,
        'playerOneName': null,
        'playerTwoName': null,
      }
    }
    return false;
  }

  getPlayerPoints(array) {
    return array.length - 2;
  }


  regularGame() {
    return {
      'gameStatus': 'running',
      'gameMessage': '',
      'playerOnePosition': this?.playerOneInfo?.player_position,
      'playerTwoPositon': this?.playerTwoInfo?.player_position,
      'playerOnePoints': this?.getPlayerPoints(this?.playerOneInfo?.player_position),
      'playerTwoPoints': this?.getPlayerPoints(this?.playerTwoInfo?.player_position),
      'playerOneName': 'user1@mail.com',
      'playerTwoName': 'user2@mail.com',
    }
  }

  //Essa função vai servir para determinar o estado da partida
  getGameStatus(PlayerOneData, PlayerTwoData) {
    this.verifyWalls();
    this.verifySnakesCollisions();
    if (this.verifyWaiting(PlayerOneData, PlayerTwoData)) return this.verifyWaiting(PlayerOneData, PlayerTwoData);
    if (this.verifyWalls() || this.verifySnakesCollisions()) {
      return {
        'gameStatus': 'done',
        'gameMessage': 'fim de jogo',
        'playerOnePosition': this?.playerOneInfo?.player_position,
        'playerTwoPositon': this?.playerTwoInfo?.player_position,
        'playerOnePoints': this?.getPlayerPoints(this?.playerOneInfo?.player_position),
        'playerTwoPoints': this?.getPlayerPoints(this?.playerTwoInfo?.player_position),
        'playerOneName': 'user1@mail.com',
        'playerTwoName': 'user2@mail.com',
      }
    }
    return this.regularGame();
  }
}


module.exports = Game;