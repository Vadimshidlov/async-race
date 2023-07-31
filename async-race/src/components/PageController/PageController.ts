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

    private readonly pageControllerClassnamesList: string[] = ['header__page-controller', 'page-controller']

    private readonly PAGE_CONTROLLER_TAG: string = 'div';

    public getPageControllerHTML(): HTMLElement {
        const pageControllerBlock: HTMLElement = createElement({
            tag: this.PAGE_CONTROLLER_TAG,
            classNames: this.pageControllerClassnamesList,
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
