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
  playerOneInfo;
  playerTwoInfo;

  setPlayerOneInfo(info){
    this.playerOneInfo = info; 
  }

  setPlayerTwoInfo(info){
    this.playerTwoInfo = info; 
  }

  verifyEndOfGame(PlayerOneData, PlayerTwoData) {

  }

  verifyWaiting(PlayerOneData, PlayerTwoData) {
    if (!PlayerOneData || !PlayerTwoData) {
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

  //Essa função vai servir para determinar o estado da partida
  getGameStatus(PlayerOneData, PlayerTwoData) {

    if (verifyWaiting(PlayerOneData, PlayerTwoData)) return verifyWaiting(PlayerOneData, PlayerTwoData);


  }

  verifyPlayers() {
    //Verificar se ambos os jogadores estão jogando

  }

}


module.exports = Game;