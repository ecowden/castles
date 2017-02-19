'use strict'

const test = require('ava')

const BattlePlan = require('./BattlePlan')
const samples = require('./sampleBattlePlans')

test('BattlePlan(opts) sets properties from options', function* (t) {
  const allocations = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
  const myPlan = new BattlePlan({
    allocations: allocations,
    name: 'test-plan',
    author: 'Genghis Khan'
  })

  t.is(myPlan.allocations, allocations)
  t.is(myPlan.name, 'test-plan')
  t.is(myPlan.author, 'Genghis Khan')
})

test('.fight(opponent) returns `win` when the first plan wins', function* (t) {
  t.is(samples.allToCastleTen.fight(samples.allToCastleOne), 'win')
})
test('.fight(opponent) returns `lose` when the second plan wins', function* (t) {
  t.is(samples.allToCastleOne.fight(samples.allToCastleTen), 'lose')
})
test('.fight(opponent) returns `tie` when the two plans tie', function* (t) {
  t.is(samples.allToCastleTen.fight(samples.allToCastleTen), 'tie')
})
