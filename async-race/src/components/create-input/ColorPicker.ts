import createElement from '../element/createElement';

import './create-block.scss';

export interface IColorPicker {
    getInputValue: () => string;
    clearInputValue: () => void;
    setColorPickerValue: (value: string) => void;
    getElement: () => HTMLInputElement;
}

export class ColorPicker implements IColorPicker {
    private readonly pickerElement: HTMLInputElement;

    private colorHex = '';

    constructor() {
        this.pickerElement = createElement<HTMLInputElement>({
            tag: 'input',
            classNames: ['create-block__input__color-picker'],
            text: '',
        });
        this.configureElement();
        this.addEventListeners();
    }

    public getInputValue(): string {
        const inputValue: string = this.colorHex;

        return inputValue || '';
    }

    public clearInputValue(): void {
        this.pickerElement.value = `#000000`;
    }

    public setColorPickerValue(value: string): void {
        this.pickerElement.value = value;
        this.colorHex = value;
    }

    public getElement(): HTMLInputElement {
        return this.pickerElement;
    }

    private configureElement(): void {
        this.pickerElement.id = `color-picker`;
        this.pickerElement.type = 'color';
        this.pickerElement.insertAdjacentHTML(
            'afterbegin',
            `
        <input id="color-picker" type="color">
    `,
        );
    }

    private addEventListeners(): void {
        this.pickerElement.addEventListener('input', () => {
            this.colorHex = this.pickerElement.value;
        });
    }
}
