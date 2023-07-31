import createElement from '../element/createElement';

export interface ICreateInputElement {
    getInputValue: () => string;
    setInputValue: (value: string) => void;
    clearInputValue: () => void;
    getElement: () => HTMLInputElement;
    setFailedState: () => void;
}

export class CreateInputElement implements ICreateInputElement {
    private readonly inputElement: HTMLInputElement;

    private readonly INPUT_TAG: string = 'input';

    private readonly INPUT_PLACEHOLDER: string = 'Write name';

    private readonly FAILED_STATE_TIMEOUT: number = 500;

    private readonly INPUT_CLASSNAME: string = 'create-block__input';

    private readonly INPUT_FAILED_CLASSNAME: string = 'create-block__input__failed';

    constructor() {
        this.inputElement = createElement({
            tag: this.INPUT_TAG,
            classNames: [this.INPUT_CLASSNAME],
        });
        this.configureElement();
    }

    public getInputValue(): string {
        return this.inputElement.value;
    }

    public setInputValue(value: string): void {
        this.inputElement.value = value;
    }

    public clearInputValue(): void {
        this.inputElement.value = '';
    }

    public getElement(): HTMLInputElement {
        return this.inputElement;
    }

    public setFailedState(): void {
        this.inputElement.classList.add(this.INPUT_FAILED_CLASSNAME);
        setTimeout(() => {
            this.inputElement.classList.remove(this.INPUT_FAILED_CLASSNAME);
        }, this.FAILED_STATE_TIMEOUT);
    }

    private configureElement(): void {
        this.inputElement.placeholder = this.INPUT_PLACEHOLDER;
    }
}
