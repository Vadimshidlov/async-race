import createElement from '../element/element-creator';

export class CreateButtonElement {
  private element: HTMLElement;

  // private readonly buttonText = 'Create';

  constructor(text: string) {
    this.element = createElement({ tag: 'button', classNames: ['create-block__button'], text });
    // this.configureElement();
  }

  /* private configureElement(): void {
    this.element.textContent = this.buttonText;
  } */

  public getElement(): HTMLElement {
    return this.element;
  }
}
