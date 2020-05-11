import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  const {
    PlayerOneAttack,
    PlayerTwoAttack,
    PlayerOneBlock,
    PlayerTwoBlock,
    PlayerOneCriticalHitCombination,
    PlayerTwoCriticalHitCombination
  } = controls;
  let firstFighterProgress = document.getElementById('left-fighter-indicator');
  let secondFighterProgress = document.getElementById('right-fighter-indicator');

  return new Promise((resolve) => {
    let FirstPlayerIsAttacking = false;
    let SecondPlayerIsAttcking = false;
    let FirstPlayerIsBlocking = false;
    let SecondPlayerIsBlocking = false;
    let firstFighterHealth = firstFighter.health;
    let secondFighterHealth = secondFighter.health;
    let keyPress = []

    function showCurrentHealth(current, basic, el) {
      let healthPercent = current / basic * 100
      el.style.width = `${healthPercent > 0 ? healthPercent : 0}%`;
    }

    document.addEventListener('keydown', function (e) {
      keyPress.push(e.code);
      switch (e.code) {
        case PlayerOneBlock:
          FirstPlayerIsBlocking = true;
          break;
        case PlayerTwoBlock:
          SecondPlayerIsBlocking = true;
          break;
        case PlayerOneAttack:
          if (!FirstPlayerIsBlocking && !SecondPlayerIsBlocking) {
            secondFighterHealth -= getDamage(firstFighter, secondFighter);
            showCurrentHealth(secondFighterHealth, secondFighter.health, secondFighterProgress);
          }
          break;
        case PlayerTwoAttack:
          if (!SecondPlayerIsBlocking && !FirstPlayerIsBlocking) {
            firstFighterHealth -= getDamage(secondFighter, firstFighter)
            showCurrentHealth(firstFighterHealth, firstFighter.health, firstFighterProgress);
          }
          break;
        default:
      }
    })

    document.addEventListener('keyup', function (e) {
      switch (e.code) {
        case PlayerOneBlock:
          FirstPlayerIsBlocking = false;
          break;
        case PlayerTwoBlock:
          SecondPlayerIsBlocking = false;
          break;
        default:
      }

      if (keyPress.length === 3) {
        if (keyPress.sort().join() === PlayerOneCriticalHitCombination.sort().join() && !FirstPlayerIsAttacking) {
          secondFighterHealth -= firstFighter.attack * 2;
          showCurrentHealth(secondFighterHealth, secondFighter.health, secondFighterProgress);
          FirstPlayerIsAttacking = true;
          setTimeout(() => FirstPlayerIsAttacking = false, 10000);
        }
        if (keyPress.sort().join() === PlayerTwoCriticalHitCombination.sort().join() && !SecondPlayerIsAttcking) {
          firstFighterHealth -= secondFighter.attack * 2;
          showCurrentHealth(firstFighterHealth, firstFighter.health, firstFighterProgress);
          SecondPlayerIsAttcking = true;
          setTimeout(() => SecondPlayerIsAttcking = false, 10000)
        }
      }

      keyPress = [];

      if (firstFighterHealth <= 0 || secondFighterHealth <= 0) {
        resolve(firstFighterHealth > 0 ? firstFighter : secondFighter);
      }
    })
  });
}

export function getDamage(attacker, defender) {
  let damage = getHitPower(attacker) - getBlockPower(defender)
  return damage < 0 ? 0 : damage;
}

export function getHitPower(fighter) {
  return fighter.attack * (Math.random() + 1)
}

export function getBlockPower(fighter) {
  return fighter.defense * (Math.random() + 1)
}