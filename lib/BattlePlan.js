'use strict'

module.exports = class BattlePlan {

  constructor(opts) {
    this.allocations = opts.allocations
    this.name = opts.name
    this.author = opts.author
  }

  fight(opponent) {
    let myScore = 0
    let opponentScore = 0

    // compare allocations to determine score
    for (let i = 0; i < 10; i++) {
      const myArmies = this.allocations[i]
      const opponentArmies = opponent.allocations[i]
      const castleValue = i + 1
      if (myArmies > opponentArmies) {
        myScore += castleValue
      } else if (myArmies < opponentArmies) {
        opponentScore += castleValue
      } else {
        myScore += castleValue / 2
        opponentScore += castleValue / 2
      }
    }

    // compare scores to determine result
    if (myScore > opponentScore) {
      return 'win'
    } else if (myScore < opponentScore) {
      return 'lose'
    } else {
      return 'tie'
    }
  }
}
