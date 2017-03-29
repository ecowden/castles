'use strict'

const test = require('ava')

const castles = require('../index')

test('Create two battle plans and have them fight', function* (t) {
  // const castles = require('castles')

  // Create a BattlePlan that sends all armies to Castle #10
  const allToCastleTen = new castles.BattlePlan({
    allocations: [0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
    name: 'All to Castle Ten',
    author: 'Samples'
  })

  // Create a BattlePlan that sends all armies to Castle #1
  const allToCastleOne = new castles.BattlePlan({
    allocations: [100, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    name: 'All to Castle One',
    author: 'Samples'
  })

  // Have BattlePlans fight each other
  t.is(allToCastleTen.fight(allToCastleOne), 'win')
  t.is(allToCastleOne.fight(allToCastleTen), 'lose')
  t.is(allToCastleTen.fight(allToCastleTen), 'tie')
})

test('Create two Armies and have them fight', function* (t) {
  // const castles = require('castles')

  // Create an Army that sends all armies to Castle #10
  // Note that we're using the published sample battle plans for brevity
  const allToCastleTen = new castles.Army(castles.sampleBattlePlans.allToCastleTen)

  // Create a BattlePlan that sends all armies to Castle #1
  const allToCastleOne = new castles.Army(castles.sampleBattlePlans.allToCastleOne)

  // Have the two Armies fight each other.
  // Instead of returning an immediate result, they keep a running record.
  allToCastleTen.fight(allToCastleOne)

  // The `.record` property supplies a human-readable win-loss-tie record,
  // useful for debugging and testing.
  t.is(allToCastleTen.record, '1-0-0')
  t.is(allToCastleOne.record, '0-1-0')

  // The individual .wins, .losses, and .ties records are also accessible.
  t.is(allToCastleTen.wins, 1)
  t.is(allToCastleTen.losses, 0)
  t.is(allToCastleTen.ties, 0)

  // An army is given one point for each win and half a point for each tie
  t.is(allToCastleTen.score, 1)
})

test('Have each Army fight each other exactly once with war()', function* (t) {
  // const castles = require('castles')

  // All sample battle plans are available
  const allBattlePlans = castles.sampleBattlePlans.all
  const allArmies = allBattlePlans.map(battlePlan => new castles.Army(battlePlan))

  // .war(...) has each Army fight each other exactly once and
  // returns the armies sorted from best to worst
  const sortedArmies = castles.war(allArmies)
  const winner = sortedArmies[0]

  t.is(winner.battlePlan.name, 'All to Castle Ten')
  t.is(winner.record, '2-0-0')
  t.is(winner.score, 2)
})
