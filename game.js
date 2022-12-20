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

  //Criando nosso objeto de resposta
  // {
  //   playerId: 'player id here', 
  //   playerToken: 'player token here',
  //   isPlayerOnline: 'player online here',
  //   playerPositons: ' array com as posições do player',
  // }

  //Objeto de dinámica do jogo
  playerOneInfo = null;
  playerTwoInfo = null;


  cleanupPlayers(){
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
    // console.log("player one info setted", info)
  }

  setPlayerTwoInfo(info) {
    this.playerTwoInfo = info;
    // console.log("player two info setted", info)
  }

  verifyWalls() {

  }

  verifySnakesCollisions() {

  }

  verifyEndOfGame() {

  }

  verifyWaiting() {
    console.log("playerOneInfo ->",this.playerOneInfo)
    console.log("playerTwoInfo ->",this.playerTwoInfo)

    if (this.playerOneInfo == null || this.playerTwoInfo == null) {
      return {
        'gameStatus': 'waiting',
        'gameMessage': 'Aguardando demais jogadores na partida',
        'playerOnePosition': null,
        'playerTwoPositon': null,
        'playerOnePoints': null,
        'playerTwoPoints': null,
        'playerOneName': null,
        'playerTwoName': null,
      }
    }
    return false;
  }

  getPlayerPoints(array) {
    return 0;
  }

  getPlayerNames(playerID) {



  }

  getNextApplePosition() {

  }

  regularGame() {
    console.log("Player 1", this?.playerOneInfo)
    console.log("Player 2", this?.playerTwoInfo)
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

    if (this.verifyWaiting(PlayerOneData, PlayerTwoData)) return this.verifyWaiting(PlayerOneData, PlayerTwoData);
    return this.regularGame()

  }

  verifyPlayers() {
    //Verificar se ambos os jogadores estão jogando

  }

}


module.exports = Game;