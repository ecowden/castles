'use strict'

const test = require('ava')

const sampleBattlePlans = require('./sampleBattlePlans')

test('Sample Battle Plans Exist', function* (t) {
  t.truthy(sampleBattlePlans.allToCastleTen)
  t.truthy(sampleBattlePlans.allToCastleOne)
  t.truthy(sampleBattlePlans.allToCastleFive)
})

test('.all gets an array of all sample battle plans', function* (t) {
  const all = sampleBattlePlans.all
  t.is(all.length, 3)
})
