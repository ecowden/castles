'use strict'

module.exports = class BattlePlan {

  constructor(opts) {
    validateOptions(opts)

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

function validateOptions(opts) {
  if (!Array.isArray(opts.allocations)) {
    throw new Error("a new BattlePlan's 'allocations' option must be an array")
  }
  if (opts.allocations.length !== 10) {
    throw new Error(`A BattlePlan must allocate armies to exactly 10 castles, not ${opts.allocations.length}`)
  }
  const allocationSum = opts.allocations.reduce((acc, val) => acc + val, 0)
  if (allocationSum !== 100) {
    throw new Error(`A BattlePlan must allocate exactly 100 armies, not ${allocationSum}`)
  }
}
