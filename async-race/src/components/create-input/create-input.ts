import createElement from '../element/element-creator';

export class CreateInputElement {
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
}
