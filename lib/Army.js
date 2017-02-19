'use strict'

module.exports = class Army {

  constructor(battlePlan) {
    this.battlePlan = battlePlan
    this.wins = 0
    this.losses = 0
    this.ties = 0
  }

  get record() {
    return `${this.wins}-${this.losses}-${this.ties}`
  }

  get score() {
    return this.wins + this.ties / 2
  }

  fight(opponent) {
    const outcome = this.battlePlan.fight(opponent.battlePlan)
    if (outcome === 'win') {
      this.wins++
      opponent.losses++
    } else if (outcome === 'lose') {
      this.losses++
      opponent.wins++
    } else { // tie
      this.ties++
      opponent.ties++
    }
  }
}
