import getHeader from '../header/header';
import '../../styles.scss';
import createElement from '../element/element-creator';
import { CreateInputElement } from '../create-input/create-input';
import { CreateButtonElement } from '../create-input/create-button';
import { ColorPicker } from '../create-input/color-picker';
import { Car } from '../cars/car';

export class AsyncRace {
  private body = document.body;

  private createInput: CreateInputElement = new CreateInputElement();

  private updateInput: CreateInputElement = new CreateInputElement();

  private createButton: CreateButtonElement = new CreateButtonElement('Create');

  private updateButton: CreateButtonElement = new CreateButtonElement('Update');

  private createColorPicker = new ColorPicker();

  private updateColorPicker = new ColorPicker();

  private garage: HTMLElement = createElement({
    tag: 'div',
    classNames: ['garage'],
    text: '',
  });

  constructor() {
    this.getHtmlPAge();
    this.getCars();
  }

  public getHtmlPAge(): void {
    // HEADER
    const header: HTMLElement = getHeader();
    const main = createElement({
      tag: 'main',
      classNames: ['main', '_container'],
      text: '',
    });

    // CONTROLLER
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

    // GARAGE

    const garageBlock = createElement({
      tag: 'section',
      classNames: ['garage__block', 'block-garage'],
      text: '',
    });

    const garageInfo = createElement({
      tag: 'div',
      classNames: ['block-garage__info'],
      text: '',
    });

    const garageTitle = createElement({
      tag: 'h1',
      classNames: ['block-garage__title'],
      text: 'GARAGE',
    });

    const garageCount = createElement({
      tag: 'span',
      classNames: ['block-garage__count'],
      text: '#',
    });

    garageInfo.append(garageTitle, garageCount);

    // const garageItems = createElement({
    //   tag: 'div',
    //   classNames: ['garage'],
    //   text: '',
    // });

    garageBlock.append(garageInfo);
    garageBlock.append(garageInfo, this.garage);

    main.append(controllerSection);
    main.append(garageBlock);

    this.body.append(header);
    this.body.append(main);
  }

  private getCars(): void {
    const car = new Car().getCar();

    this.garage.append(car);
  }
}
