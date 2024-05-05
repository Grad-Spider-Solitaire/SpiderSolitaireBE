class GameResult {
  constructor(id, userId, score, difficultyLevelId, gameDate, gameDuration) {
    this.id = id;
    this.userId = userId;
    this.score = score;
    this.difficultyLevelId = difficultyLevelId;
    this.gameDate = gameDate;
    this.gameDuration = gameDuration;
  }
}

module.exports = GameResult;
