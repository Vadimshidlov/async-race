import {createButtonElement} from '../create-input/createButtonElement';
import createElement from '../element/createElement';

export interface IPageController {
    getPageControllerHTML: () => HTMLElement
    getGarageButton: () => HTMLButtonElement
    getWinnersButton: () => HTMLButtonElement
}

export class PageController implements IPageController {
    private toGarageButtonElement: HTMLButtonElement = createButtonElement('Garage');

    private toWinnersButtonElement: HTMLButtonElement = createButtonElement('Winners');

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
