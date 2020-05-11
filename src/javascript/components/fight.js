import {
  controls
} from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  const {
    PlayerOneAttack,
    PlayerTwoAttack,
    PlayerOneBlock,
    PlayerTwoBlock,
    PlayerOneCriticalHitCombination,
    PlayerTwoCriticalHitCombination
  } = controls;
  let FirstPlayerIsAttacking = false;
  let SecondPlayerIsAttcking = false;
  let FirstPlayerIsBlocking = false;
  let SecondPlayerIsBlocking = false
  let firstFighterHealth = firstFighter.health;
  let secondFighterHealth = secondFighter.health;
  let firstFighterProgress = document.getElementById('left-fighter-indicator');
  let secondFighterProgress = document.getElementById('right-fighter-indicator');

  return new Promise((resolve) => {
    let keyPress = []

    document.addEventListener('keydown', function (e) {
      keyPress.push(e.code);
    })

    document.addEventListener('keyup', function (e) {
      switch (e.code) {
        case PlayerOneAttack:
          if (!FirstPlayerIsBlocking) {
            setTimeout(() => {
              if (SecondPlayerIsBlocking) {
                secondFighter.health -= getDamage(firstFighter, secondFighter);
              } else {
                secondFighter.health -= getDamage(firstFighter)
              }
              showCurrentHealth(secondFighter.health, secondFighterHealth, secondFighterProgress);
            }, 500);
          }
          break;
        case PlayerTwoAttack:
          if (!SecondPlayerIsBlocking) {
            setTimeout(() => {
              if (FirstPlayerIsBlocking) {
                firstFighter.health -= getDamage(secondFighter, firstFighter)
              } else {
                firstFighter.health -= getDamage(secondFighter)
              }
              showCurrentHealth(firstFighter.health, firstFighterHealth, firstFighterProgress);
            }, 500);
          }
          break;
        case PlayerOneBlock:
          FirstPlayerIsBlocking = true;
          setTimeout(() => FirstPlayerIsBlocking = false, 500)
          break;
        case PlayerTwoBlock:
          SecondPlayerIsBlocking = true;
          setTimeout(() => SecondPlayerIsBlocking = false, 500)
          break;
        default:
      }

      if (keyPress.length === 3) {
        if (keyPress.sort().toString() === PlayerOneCriticalHitCombination.sort().toString() && !FirstPlayerIsAttacking) {
          secondFighter.health -= firstFighter.attack * 2;
          showCurrentHealth(secondFighter.health, secondFighterHealth, secondFighterProgress);
          FirstPlayerIsAttacking = true;
          setTimeout(() => FirstPlayerIsAttacking = false, 10000);
        }
        if (keyPress.sort().toString() === PlayerTwoCriticalHitCombination.sort().toString() && !SecondPlayerIsAttcking) {
          firstFighter.health -= secondFighter.attack * 2;
          showCurrentHealth(firstFighter.health, firstFighterHealth, firstFighterProgress);
          SecondPlayerIsAttcking = true;
          setTimeout(() => SecondPlayerIsAttcking = false, 10000)
        }
      }
      keyPress = [];
      if (firstFighter.health <= 0 || secondFighter.health <= 0) {
        resolve(firstFighter.health > 0 ? firstFighter : secondFighter);
      }
    })
  });
}

export function getDamage(attacker, defender) {
  let damage = getHitPower(attacker)
  if (defender) {
    damage -= getBlockPower(defender)
  }
  return damage < 0 ? 0 : damage;
}

export function getHitPower(fighter) {
  return fighter.attack * (Math.random() + 1)
}

export function getBlockPower(fighter) {
  return fighter.defense * (Math.random() + 1)
}

function showCurrentHealth(current, basic, el) {
  el.style.width = `${current/basic*100}%`
}