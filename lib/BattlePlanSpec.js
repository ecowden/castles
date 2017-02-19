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

test('throws an Error if opts.allocations is not an Array', function* (t) {
  const err = t.throws(() => {
    new BattlePlan({ // eslint-disable-line no-new
      allocations: null,
      name: 'test-plan',
      author: 'Genghis Khan'
    })
  })
  t.is(err.message, "a new BattlePlan's 'allocations' option must be an array")
})

test('allocations must include exactly 10 castles', function* (t) {
  const err = t.throws(() => {
    new BattlePlan({ // eslint-disable-line no-new
      allocations: [20, 20, 20, 20, 20],
      name: 'test-plan',
      author: 'Genghis Khan'
    })
  })
  t.is(err.message, 'A BattlePlan must allocate armies to exactly 10 castles, not 5')
})

test('allocations must total exactly 100', function* (t) {
  const err = t.throws(() => {
    new BattlePlan({ // eslint-disable-line no-new
      allocations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      name: 'test-plan',
      author: 'Genghis Khan'
    })
  })
  t.is(err.message, 'A BattlePlan must allocate exactly 100 armies, not 10')
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
