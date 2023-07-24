import createElement from '../element/element-creator';

export interface ICreateButtonElement {
    getElement: () => HTMLButtonElement
}

export class CreateButtonElement implements ICreateButtonElement {
    private readonly element: HTMLButtonElement;

    constructor(text: string) {
        this.element = createElement({tag: 'button', classNames: ['create-block__button'], text});
    }

    public getElement(): HTMLButtonElement {
        return this.element;
    }
}
