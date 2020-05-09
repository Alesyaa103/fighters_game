import { createElement } from '../helpers/domHelper';
import { fighters } from '../helpers/mockData';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
  if (fighter) {
    fighterElement.appendChild(createFighterImage(fighter));
    fighterElement.appendChild(createFighterInfo(fighter));
  }
  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { src: source };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    title: name,
    alt: name,
    attributes,
  });

  return imgElement;
}

function createFighterInfo(fighter) {
  const data = {
    name: fighter.name,
    health: fighter.health,
    attack: fighter.attack,
    defense: fighter.defense,
  }
  const features = createElement({
    tagName: 'ul',
    className: 'feature-block'
  });

  for (let key in data) {
    let feature = createElement({
      tagName: 'li',
      className: 'feature-block__item'
    })
    let featureName = createElement({
      tagName: 'span',
    })
    let featureValue = createElement({
      tagName: 'span'
    })
    featureName.innerText = key;
    featureValue.innerText = data[key];
    feature.appendChild(featureName);
    feature.appendChild(featureValue);
    features.appendChild(feature);
  }
  
  return features
}