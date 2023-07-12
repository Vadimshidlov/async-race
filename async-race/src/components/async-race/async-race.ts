import getHeader from '../header/header';
import '../../styles.scss';
import createElement from '../element/element-creator';
import { CreateInputElement } from '../create-input/create-input';
import { CreateButtonElement } from '../create-input/create-button';
import { ColorPicker } from '../create-input/color-picker';

export class AsyncRace {
  private body = document.body;

  private createInput: CreateInputElement = new CreateInputElement();

  private updateInput: CreateInputElement = new CreateInputElement();

  private createButton: CreateButtonElement = new CreateButtonElement('Create');

  private updateButton: CreateButtonElement = new CreateButtonElement('Update');

  private createColorPicker = new ColorPicker();

  private updateColorPicker = new ColorPicker();

  constructor() {
    this.getHtmlPAge();
  }

  public getHtmlPAge(): void {
    const header: HTMLElement = getHeader();
    const main = createElement({
      tag: 'main',
      classNames: ['main', '_container'],
      text: '',
    });
    const controllerSection = createElement({
      tag: 'section',
      classNames: ['controller'],
      text: '',
    });

    const createBlock = createElement({
      tag: 'div',
      classNames: ['controller__block', 'create-block'],
      text: '',
    });
    const createInput = this.createInput.getElement();
    createBlock.append(createInput);
    const createColorInput = this.createColorPicker.getElement();
    createBlock.append(createColorInput);

    const createButton = this.createButton.getElement();
    createBlock.append(createButton);

    const updateBlock = createElement({
      tag: 'div',
      classNames: ['controller__block', 'update-block'],
      text: '',
    });
    const updateInput = this.updateInput.getElement();
    updateBlock.append(updateInput);
    const updateColorInput = this.updateColorPicker.getElement();
    updateBlock.append(updateColorInput);

    const updateButton = this.updateButton.getElement();
    updateBlock.append(updateButton);

    controllerSection.append(createBlock);
    controllerSection.append(updateBlock);

    main.append(controllerSection);

    this.body.append(header);
    this.body.append(main);
  }
}
