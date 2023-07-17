import getHeader from '../header/header';
import '../../styles.scss';
import createElement from '../element/element-creator';
import { CreateInputElement } from '../create-input/create-input';
import { CreateButtonElement } from '../create-input/create-button';
import { ColorPicker } from '../create-input/color-picker';
import { EquipmentCar } from '../cars/car-field';
import { CarGarage } from '../../services/CarGarage';

export type RacePArtyType = () => Promise<void>;

export class AsyncRace {
  private body = document.body;

  private createInput: CreateInputElement = new CreateInputElement();

  private readonly createInputElement: HTMLElement;

  private readonly updateInput: CreateInputElement = new CreateInputElement();

  private readonly updateInputElement: HTMLElement;

  private readonly raceParty: RacePArtyType[] = [];
  // private readonly raceParty: Promise<void>[] = [];

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

  private colorPicker = new ColorPicker();

  private colorPickerElement: HTMLInputElement;

  private updateColorPicker = new ColorPicker();

  private updateColorPickerElement: HTMLElement;

  private membersRace: EquipmentCar[] = [];

  private garage: HTMLElement = createElement({
    tag: 'div',
    classNames: ['garage'],
    text: '',
  });

  private carGarageApi = new CarGarage();

  constructor() {
    // this.generateCarButtonElement = this.generateCarButton.getElement();
    // this.raceResetButtonElement = this.raceResetButton.getElement();
    // this.raceStartButtonElement = this.raceStartButton.getElement();
    this.createInputElement = this.createInput.getElement();
    this.updateInputElement = this.updateInput.getElement();
    // this.createButtonElement = this.createButton.getElement();
    // this.updateButtonElement = this.updateButton.getElement();
    this.colorPickerElement = this.colorPicker.getElement();
    this.updateColorPickerElement = this.updateColorPicker.getElement();
    this.getHtmlPAge();
    this.getCars();
    this.addEventListeners();
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
      classNames: ['controller__block', 'block-create'],
      text: '',
    });
    createBlock.append(this.createInputElement, this.colorPickerElement, this.createButtonElement);

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

  private addEventListeners(): void {
    this.createButtonElement.addEventListener('click', async () => {
      const textValue = this.createInput.getInputValue();
      const colorValue = this.colorPicker.getInputValue();
      // const res = await helperRequest();
      // console.log(colorValue);
      // console.log(res);
      const res = await this.carGarageApi.createCar(textValue, colorValue);
      console.log(res);
      /* const allCars = await this.carGarageApi.getCars(2);
            console.log(allCars, `allCars`); */
      this.garage.innerHTML = '';
      this.getCars();

      this.createInput.clearInputValue();
      this.colorPicker.clearInputValue();
    });

    this.updateButtonElement.addEventListener('click', () => {
      /* const pikerValue = this.updateColorPicker.getInputValue();
                  console.log(pikerValue); */

      const carAnamtion = document.querySelector('.car');
      if (carAnamtion instanceof HTMLElement && carAnamtion) {
        carAnamtion.style.animationPlayState = 'paused';
      }
    });

    this.raceStartButtonElement.addEventListener('click', async () => {
      // this.membersRace.forEach((raceMember) => {
      // raceMember.startMoveCar();
      // });
      Promise.all(this.raceParty.map((raceMemberMethod) => raceMemberMethod())).then(
        (resultArray) => {
          console.log(resultArray);
        },
      );
    });
  }

  private async getCars(page = 1): Promise<void> {
    const pageCars = await this.carGarageApi.getCars();
    console.log(pageCars);

    // const raceParty: RacePArtyType[] = [];

    pageCars.forEach((carData) => {
      const equipmentProps = {
        carColor: carData.color,
        carName: carData.name,
        id: carData.id,
      };

      // console.log(`id ofCar ~~>`, equipmentProps.id, typeof equipmentProps.id);
      const equipmentCar = new EquipmentCar(equipmentProps);
      const car = equipmentCar.getCar();
      this.raceParty.push(equipmentCar.startMoveCar);
      this.membersRace.push(equipmentCar);
      this.garage.append(car);
    });

    console.log(this.raceParty, `this.raceParty`);
  }
}
