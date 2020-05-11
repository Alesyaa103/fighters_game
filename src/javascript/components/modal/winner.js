import { showModal } from './modal'
import { createElement } from "../../helpers/domHelper";
import { createFighterImage} from "../fighterPreview";

export function showWinnerModal(fighter) {

  const bodyElement = createElement({
    tagName: "div",
    className: "modal-body"
  });

  const fighterImg = createFighterImage(fighter);

  bodyElement.append(fighterImg)

  showModal({
    title: `The Winner of this epic fight: ${fighter.name}`,
    bodyElement,
    onClose
  });
}

function onClose() {
  window.location.reload()
};