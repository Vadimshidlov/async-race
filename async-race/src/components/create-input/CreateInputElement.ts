import createElement from '../element/createElement';

export interface ICreateInputElement {
  getInputValue: () => string;
  setInputValue: (value: string) => void;
  clearInputValue: () => void;
  getElement: () => HTMLInputElement;
  setFailedState: () => void;
}

export class CreateInputElement implements ICreateInputElement {
  private readonly element: HTMLInputElement;

  private readonly INPUT_TAG = 'input';

  private readonly INPUT_PLACEHOLDER = 'Write name';

  private readonly FAILED_STATE_TIMEOUT = 500;

  private readonly INPUT_CLASSNAME = 'create-block__input';

  private readonly INPUT_FAILED_CLASSNAME = 'create-block__input__failed';

  constructor() {
    this.element = createElement({
      tag: this.INPUT_TAG,
      classNames: [this.INPUT_CLASSNAME],
      text: '',
    });
    this.configureElement();
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
    this.element.classList.add(this.INPUT_FAILED_CLASSNAME);
    setTimeout(() => {
      this.element.classList.remove(this.INPUT_FAILED_CLASSNAME);
    }, this.FAILED_STATE_TIMEOUT);
  }

  private configureElement(): void {
    this.element.placeholder = this.INPUT_PLACEHOLDER;
  }
}
