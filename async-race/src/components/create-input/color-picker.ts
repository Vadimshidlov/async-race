import createElement from '../element/element-creator';
import './create-block.scss';

export class ColorPicker {
    private picker: HTMLElement;

    private colorHEX = '';

    constructor() {
        this.picker = createElement({
            tag: 'input',
            classNames: ['create-block__input__color-picker'],
            text: '',
        });
        this.configureElement();
        this.addEventListeners()
    }

    private configureElement(): void {
        if (!(this.picker instanceof HTMLInputElement)) {
            throw new Error();
        }

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
            if (this.picker instanceof HTMLInputElement) {
                this.colorHEX = this.picker.value
            }
        })
    }

    public getValue(): string {
        const value = this.colorHEX

        return value || ''
    }

    public getElement(): HTMLElement {
        return this.picker;
    }
}
