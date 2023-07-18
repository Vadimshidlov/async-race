import { ColorPicker } from '../create-input/color-picker';
import { CreateButtonElement } from '../create-input/create-button';
import { CreateInputElement } from '../create-input/create-input';
import createElement from '../element/element-creator';

export type CreateCarValuesType = {
  textValue: string;
  colorValue: string;
};

export class GarageController {
  private createInput: CreateInputElement = new CreateInputElement();

  private readonly createInputElement: HTMLElement;

  private readonly updateInput: CreateInputElement = new CreateInputElement();

  private readonly updateInputElement: HTMLElement;

  private readonly createButtonElement: HTMLButtonElement = new CreateButtonElement(
    'Create',
  ).getElement();

  private readonly updateButtonElement: HTMLButtonElement = new CreateButtonElement(
    'Update',
  ).getElement();

  private raceStartButtonElement: HTMLButtonElement = new CreateButtonElement('Race').getElement();

  private raceResetButtonElement: HTMLButtonElement = new CreateButtonElement('Reset').getElement();

  private generateCarButtonElement: HTMLButtonElement = new CreateButtonElement(
    'Get Cars',
  ).getElement();

  private createColorPicker = new ColorPicker();

  private createColorPickerElement: HTMLInputElement;

  private updateColorPicker = new ColorPicker();

  private updateColorPickerElement: HTMLElement;

  constructor() {
    this.createInputElement = this.createInput.getElement();
    this.updateInputElement = this.updateInput.getElement();
    // this.createButtonElement = this.createButton.getElement();
    // this.updateButtonElement = this.updateButton.getElement();
    this.createColorPickerElement = this.createColorPicker.getElement();
    this.updateColorPickerElement = this.updateColorPicker.getElement();
  }

  public getControllerHtml(): HTMLElement {
    const controllerSection = createElement({
      tag: 'section',
      classNames: ['controller'],
      text: '',
    });

    const createBlock = createElement({
      tag: 'div',
      classNames: ['controller__block', 'block-create'],
      text: '',
    });
    createBlock.append(
      this.createInputElement,
      this.createColorPickerElement,
      this.createButtonElement,
    );

    const updateBlock = createElement({
      tag: 'div',
      classNames: ['controller__block', 'block-update'],
      text: '',
    });
    updateBlock.append(
      this.updateInputElement,
      this.updateColorPickerElement,
      this.updateButtonElement,
    );

    const raceBlock = createElement({
      tag: 'div',
      classNames: ['controller__block', 'block-race'],
      text: '',
    });

    raceBlock.append(
      this.raceStartButtonElement,
      this.raceResetButtonElement,
      this.generateCarButtonElement,
    );

    controllerSection.append(createBlock, updateBlock, raceBlock);

    return controllerSection;
  }

  public getCreateCarValues(): CreateCarValuesType {
    const textValue = this.createInput.getInputValue();
    const colorValue = this.createColorPicker.getInputValue();

    return {
      textValue,
      colorValue,
    };
  }

  public getCreateButton(): HTMLButtonElement {
    return this.createButtonElement;
  }

  public getraceStartButton(): HTMLButtonElement {
    return this.raceStartButtonElement;
  }

  public clearCreateInputValues(): void {
    this.createColorPicker.clearInputValue();
    this.createInput.clearInputValue();
  }

  public disableControllerButtons(): void {
    this.raceStartButtonElement.disabled = true;
    this.raceResetButtonElement.disabled = true;
    this.generateCarButtonElement.disabled = true;
    this.createButtonElement.disabled = true;
    this.updateButtonElement.disabled = true;
  }

  public enableControllerButtons(): void {
    this.raceStartButtonElement.disabled = false;
    this.raceResetButtonElement.disabled = false;
    this.generateCarButtonElement.disabled = false;
    this.createButtonElement.disabled = false;
    this.updateButtonElement.disabled = false;
  }
}
