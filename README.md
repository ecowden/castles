# Castles

A competitive logic puzzle useful for teaching.

| Branch        | Status        |
| ------------- |:------------- |
| Master        | [![Build Status](https://travis-ci.org/ecowden/castles.png?branch=master)](https://travis-ci.org/ecowden/castles) [![Coverage Status](https://coveralls.io/repos/github/ecowden/castles/badge.svg?branch=master)](https://coveralls.io/github/ecowden/castles?branch=master) [![NSP Status](https://nodesecurity.io/orgs/ecowden/projects/5cff7ae1-a34a-49f7-bf18-f2b816180930/badge)](https://nodesecurity.io/orgs/ecowden/projects/5cff7ae1-a34a-49f7-bf18-f2b816180930) |
| All           | [![Build Status](https://travis-ci.org/ecowden/castles.png)](https://travis-ci.org/ecowden/castles) |

This project is inspired by an entry of FiveThirtyEight.com's weekly Riddler puzzle column.

> In a distant, war-torn land, there are 10 castles. There are two warlords: you and your archenemy. Each castle has its own strategic value for a would-be conqueror. Specifically, the castles are worth 1, 2, 3, ..., 9, and 10 victory points. You and your enemy each have 100 soldiers to distribute, any way you like, to fight at any of the 10 castles. Whoever sends more soldiers to a given castle conquers that castle and wins its victory points. If you each send the same number of troops, you split the points. You don't know what distribution of forces your enemy has chosen until the battles begin. Whoever wins the most points wins the war.

For more info, see the original post [here](https://fivethirtyeight.com/features/can-you-rule-riddler-nation/) and the results of the Riddler Nation battle royale [here](https://fivethirtyeight.com/features/can-you-save-the-drowning-swimmer/).

## How to Use

### Install the Package

```
npm install --save castles
```

### BattlePlans

A `BattlePlan` is an allocation of armies, plus some additional metadata. Two `BattlePlan`s can fight according to the rules above:

```javascript
const castles = require('castles')

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
```

### Armies

An `Army` has a `BattlePlan`, plus a running record:

```javascript
const castles = require('castles')

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
```

### War

Tying it all together, we can have each `Army` fight each other `Army` exactly once with the `.war(...)` function:

```javascript
const castles = require('castles')

// All sample battle plans are available
const allBattlePlans = castles.sampleBattlePlans.all
const allArmies = allBattlePlans.map(battlePlan => new castles.Army(battlePlan))

// .war(...) has each Army fight each other exactly once and returns the winner
const winner = castles.war(allArmies)

t.is(winner.battlePlan.name, 'All to Castle Ten')
t.is(winner.record, '2-0-0')
t.is(winner.score, 2)
```
