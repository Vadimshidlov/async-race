import createElement from '../element/element-creator';
import './create-block.scss';

export interface IColorPicker {
    getInputValue: () => string
    clearInputValue: () => void
    setColorPickerValue: (value: string) => void
    getElement: () => HTMLInputElement
}

export class ColorPicker implements IColorPicker {
    private readonly picker: HTMLInputElement;

    private colorHEX = '';

    constructor() {
        this.picker = createElement<HTMLInputElement>({
            tag: 'input',
            classNames: ['create-block__input__color-picker'],
            text: '',
        });
        this.configureElement();
        this.addEventListeners();
    }

    private configureElement(): void {
        this.picker.id = `color-picker`;
        this.picker.type = 'color';
        this.picker.insertAdjacentHTML(
            'afterbegin',
            `
        <input id="color-picker" type="color">
    `,
        );
    }

    private addEventListeners(): void {
        this.picker.addEventListener('input', () => {
            this.colorHEX = this.picker.value;
        });
    }

    public getInputValue(): string {
        const value = this.colorHEX;

        return value || '';
    }

    public clearInputValue(): void {
        this.picker.value = `#000000`;
    }

    public setColorPickerValue(value: string): void {
        this.picker.value = value;
        // TODO ?
        this.colorHEX = value;
    }

    public getElement(): HTMLInputElement {
        return this.picker;
    }
}
