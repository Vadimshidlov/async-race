import createElement from '../element/element-creator';

export interface ICreateInputElement {
    getInputValue: () => string
    setInputValue: (value: string) => void
    clearInputValue: () => void
    getElement: () => HTMLInputElement
    setFailedState: () => void
}

export class CreateInputElement implements ICreateInputElement {
    private readonly element: HTMLInputElement;

    private readonly inputPlaceholder = 'Write name';

    constructor() {
        this.element = createElement({tag: 'input', classNames: ['create-block__input'], text: ''});
        this.configureElement();
    }

    private configureElement(): void {
        this.element.placeholder = this.inputPlaceholder;
    }

    public getInputValue(): string {
        return this.element.value;
    }

    public setInputValue(value: string): void {
        this.element.value = value;
    }

    public clearInputValue(): void {
        this.element.value = '';
    }

    public getElement(): HTMLInputElement {
        return this.element;
    }

    public setFailedState(): void {
        this.element.classList.add('create-block__input__failed');
        setTimeout(() => {
            this.element.classList.remove('create-block__input__failed');
        }, 500);
    }
}
