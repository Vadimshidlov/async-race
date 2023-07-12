import createElement from '../element/element-creator';
import './create-block.scss';

export class ColorPicker {
  private picker: HTMLElement;

  constructor() {
    this.picker = createElement({
      tag: 'input',
      classNames: ['create-block__input__color-picker'],
      text: '',
    });
    this.configureElement();
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

  public getElement(): HTMLElement {
    return this.picker;
  }
}
