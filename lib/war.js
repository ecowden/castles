'use strict'

module.exports = function war(armies) {
  // Have each army fight each other
  for (let i = 0; i < armies.length; i++) {
    const attacker = armies[i]
    for (let j = i + 1; j < armies.length; j++) {
      const defender = armies[j]
      attacker.fight(defender)
    }
  }

  // Determine the winner
  let sortedArmies = armies.slice().sort((a, b) => b.score - a.score)
  return sortedArmies[0]
}
