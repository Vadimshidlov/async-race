import {CreateButtonElement} from '../create-input/create-button';
import createElement from '../element/element-creator';

export interface IPageController {
    getPageControllerHTML: () => HTMLElement
    getGarageButton: () => HTMLButtonElement
    getWinnersButton: () => HTMLButtonElement
}

export class PageController implements IPageController {
    private toGarageButtonElement: HTMLButtonElement = new CreateButtonElement('Garage').getElement();

    private toWinnersButtonElement: HTMLButtonElement = new CreateButtonElement(
        'Winners',
    ).getElement();

    public getPageControllerHTML(): HTMLElement {
        const pageControllerBlock = createElement({
            tag: 'div',
            classNames: ['header__page-controller', 'page-controller'],
            text: '',
        });
        pageControllerBlock.append(this.toGarageButtonElement, this.toWinnersButtonElement);

        return pageControllerBlock;
    }

    public getGarageButton(): HTMLButtonElement {
        return this.toGarageButtonElement;
    }

    public getWinnersButton(): HTMLButtonElement {
        return this.toWinnersButtonElement;
    }
}
