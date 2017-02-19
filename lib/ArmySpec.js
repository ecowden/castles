'use strict'

const test = require('ava')

const Army = require('./Army')
const samples = require('./sampleBattlePlans')

test('constructor assigns battlePlan', function* (t) {
  const instance = new Army(samples.allToCastleTen)
  t.deepEqual(instance.battlePlan, samples.allToCastleTen)
})

test('constructor sets `wins`, `losses`, and `ties` to 0', function* (t) {
  const instance = new Army(samples.allToCastleTen)
  t.is(instance.wins, 0)
  t.is(instance.losses, 0)
  t.is(instance.ties, 0)
})

test('.record returns the abbreviated win-loss-tie record', function* (t) {
  const instance = new Army(samples.allToCastleTen)
  instance.wins = 1
  instance.losses = 2
  instance.ties = 3

  t.is(instance.record, '1-2-3')
})

test('.score returns the total score', function* (t) {
  // A Win is one point, a loss is zero points, a tie is half a point
  const instance = new Army(samples.allToCastleTen)
  instance.wins = 5
  instance.losses = 2
  instance.ties = 3

  t.is(instance.score, 6.5)
})

test('.fight(opponent) updates win-loss records when the first army wins', function* (t) {
  const allToCastleTen = new Army(samples.allToCastleTen)
  const allToCastleOne = new Army(samples.allToCastleOne)

  allToCastleTen.fight(allToCastleOne)

  t.is(allToCastleTen.record, '1-0-0')
  t.is(allToCastleOne.record, '0-1-0')
})

test('.fight(opponent) updates win-loss records when the second army wins', function* (t) {
  const allToCastleTen = new Army(samples.allToCastleTen)
  const allToCastleOne = new Army(samples.allToCastleOne)

  allToCastleOne.fight(allToCastleTen)

  t.is(allToCastleOne.record, '0-1-0')
  t.is(allToCastleTen.record, '1-0-0')
})

test('.fight(opponent) updates win-loss records when the two armies tie', function* (t) {
  const allToCastleTen1 = new Army(samples.allToCastleTen)
  const allToCastleTen2 = new Army(samples.allToCastleTen)

  allToCastleTen1.fight(allToCastleTen2)

  t.is(allToCastleTen1.record, '0-0-1')
  t.is(allToCastleTen2.record, '0-0-1')
})
