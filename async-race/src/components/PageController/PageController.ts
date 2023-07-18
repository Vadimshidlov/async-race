import { CreateButtonElement } from '../create-input/create-button';
import createElement from '../element/element-creator';

export class PageCOntroller {
  private toGarageButtonElement: HTMLButtonElement = new CreateButtonElement('Garage').getElement();

  private toWinnersButtonElement: HTMLButtonElement = new CreateButtonElement(
    'Winners',
  ).getElement();

  public getPageControlleHTML(): HTMLElement {
    const pageControllerblock = createElement({
      tag: 'div',
      classNames: ['header__page-controller', 'page-controller'],
      text: '',
    });

    pageControllerblock.append(this.toGarageButtonElement, this.toWinnersButtonElement);

    return pageControllerblock;
  }

  public getGarageButton(): HTMLButtonElement {
    return this.toGarageButtonElement;
  }

  public getWinnersButton(): HTMLButtonElement {
    return this.toWinnersButtonElement;
  }
}
