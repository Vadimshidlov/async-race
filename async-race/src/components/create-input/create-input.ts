import createElement from '../element/element-creator';

export class CreateInputElement {
  private element: HTMLElement;

  private readonly inputPlaceholder = 'Write name';

  constructor() {
    this.element = createElement({ tag: 'input', classNames: ['create-block__input'], text: '' });
    this.configureElement();
  }

  private configureElement(): void {
    if (this.element instanceof HTMLInputElement) {
      this.element.placeholder = this.inputPlaceholder;
    }
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
