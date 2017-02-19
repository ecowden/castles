'use strict'

const test = require('ava')

const index = require('./index')
const Army = require('./lib/Army')
const BattlePlan = require('./lib/BattlePlan')
const war = require('./lib/war')
const sampleBattlePlans = require('./lib/sampleBattlePlans')

function includes(t, property, value) {
  t.is(index[property], value, `index.${property} is wrong`)
}

includes.title = (providedTitle, property) => `index should export '${property}' property`.trim()

test(includes, 'Army', Army)
test(includes, 'BattlePlan', BattlePlan)
test(includes, 'war', war)
test(includes, 'sampleBattlePlans', sampleBattlePlans)
