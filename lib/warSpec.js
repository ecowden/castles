'use strict'

const test = require('ava')

const war = require('./war')

const armyCount = 5

test('after a war(), no army has fought itself', function* (t) {
  const armies = createFakeArmies(armyCount)
  war(armies)

  for (const army of armies) {
    t.falsy(
      army.opponents.includes(army.id),
      `Army #${army.id} should not have fought itself. Opponents: ${army.opponents}.`
    )
  }
})

test('after a war(), each army has fought the right number of opponents', function* (t) {
  const armies = createFakeArmies(armyCount)
  war(armies)

  const expectedOpponentCount = armyCount - 1
  for (const army of armies) {
    const actualOpponentCount = army.opponents.length
    t.is(
      actualOpponentCount,
      expectedOpponentCount,
      `Army #${army.id} fought ${actualOpponentCount} opponents, not ${expectedOpponentCount}. Opponents: ${army.opponents}.`
    )
  }
})

test('after a war(), no army has fought the same opponent twice', function* (t) {
  const armies = createFakeArmies(armyCount)
  war(armies)

  for (const army of armies) {
    // super lazy way to check for duplicates
    const opponentSet = new Set(army.opponents)
    t.is(
      army.opponents.length,
      opponentSet.size,
      `Army #${army.id} fought duplicate opponents: ${army.opponents}.`
    )
  }
})

test('returns the armies sorted from best to worst', function* (t) {
  const armies = createFakeArmies(armyCount)
  armies[1].score = 100 // make sure we have a winner
  const sortedArmies = war(armies)
  const winner = sortedArmies[0]
  t.is(winner.id, 1)
  t.is(winner.score, 100)

  t.not(armies, sortedArmies, 'should clone the original armies array, not change it')
})

function createFakeArmies(count) {
  const armies = []
  for (let i = 0; i < count; i++) {
    armies.push(new FakeArmy(i))
  }
  return armies
}

class FakeArmy {
  constructor(id) {
    this.id = id
    this.score = 0
    this.opponents = []
  }

  fight(opponent) {
    this.opponents.push(opponent.id)
    opponent.opponents.push(this.id)
  }
}
