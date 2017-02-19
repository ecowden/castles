'use strict'

const BattlePlan = require('./BattlePlan')

module.exports = {
  get allToCastleTen() {
    return new BattlePlan({
      allocations: [0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
      name: 'All to Castle Ten',
      author: 'Samples'
    })
  },

  get allToCastleOne() {
    return new BattlePlan({
      allocations: [100, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      name: 'All to Castle One',
      author: 'Samples'
    })
  },

  get allToCastleFive() {
    return new BattlePlan({
      allocations: [0, 0, 0, 0, 100, 0, 0, 0, 0, 0],
      name: 'All to Castle Five',
      author: 'Samples'
    })
  },

  get all() {
    return [
      this.allToCastleOne,
      this.allToCastleFive,
      this.allToCastleTen
    ]
  }
}
