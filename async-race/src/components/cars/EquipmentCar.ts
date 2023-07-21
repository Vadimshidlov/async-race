/* eslint-disable @typescript-eslint/no-var-requires,global-require */
import { CreateButtonElement } from '../create-input/create-button';
import createElement from '../element/element-creator';
import './car-field.scss';
import { Car, StartMoveResultType } from './car';
import { GarageController } from '../GarageController/GarageController';
import { CarGarage } from '../../services/CarGarage';

const flag = require('../../assets/svg/flag.svg');

export type EquipmentPropsType = {
  carColor: string;
  carName: string;
  id: number;
  garageController: GarageController;
  deletaCarsCallback: () => Promise<void>;
  selectCarCallback: () => void;
};

export class EquipmentCar {
  private readonly equipmentCar: HTMLElement;

  private readonly carNameElement: HTMLSpanElement;

  private car: Car;

  private readonly carElement: HTMLElement;

  private startCarButton = new CreateButtonElement('Start').getElement();

  private returnCarButton = new CreateButtonElement('Return').getElement();

  private selectCarButton = new CreateButtonElement('Select').getElement();

  private removeCarButton = new CreateButtonElement('Remove').getElement();

  private readonly carFieldId: string;

  private garageController: GarageController;

  private carName: string;

  private carGarageService = new CarGarage();

  private deletaCarsCallback: () => Promise<void>;

  private selectCarCallback: () => void;

  constructor({
    carColor,
    carName,
    id,
    garageController,
    deletaCarsCallback,
    selectCarCallback,
  }: EquipmentPropsType) {
    this.equipmentCar = createElement({
      tag: 'div',
      classNames: ['car-filed'],
      text: '',
    });
    this.carFieldId = `carField-${id}`;
    this.carName = carName;
    this.equipmentCar.id = this.carFieldId;
    this.deletaCarsCallback = deletaCarsCallback;
    this.selectCarCallback = selectCarCallback;

    this.car = new Car(carColor, id, carName);
    this.carElement = this.car.getCar();
    this.carNameElement = createElement<HTMLSpanElement>({
      tag: 'span',
      classNames: ['car-filed__name'],
      text: 'Tesla',
    });
    this.garageController = garageController;
    this.configureElement();
    this.setCarName(carName);
    this.setCarId(id);
    this.addEventsHandler();
  }

  private configureElement(): void {
    const carControllers = createElement({
      tag: 'div',
      classNames: ['car-filed__controller', 'controller'],
      text: '',
    });

    const stateControllersBtns = createElement({
      tag: 'div',
      classNames: ['controller-state'],
      text: '',
    });

    const moveControllersBtns = createElement({
      tag: 'div',
      classNames: ['controller-move'],
      text: '',
    });

    stateControllersBtns.append(this.selectCarButton, this.removeCarButton, this.carNameElement);
    moveControllersBtns.append(this.startCarButton, this.returnCarButton);
    this.returnCarButton.disabled = true;
    carControllers.append(stateControllersBtns, moveControllersBtns);

    const roadWrapper = createElement({
      tag: 'div',
      classNames: ['car-filed_road'],
      text: '',
    });
    const flagImage = createElement({
      tag: 'img',
      classNames: ['car-filed__flag'],
      text: '',
    });
    if (flagImage instanceof HTMLImageElement) {
      flagImage.src = flag;
    }

    roadWrapper.append(this.carElement, flagImage);

    this.equipmentCar.append(carControllers, roadWrapper);
  }

  private addEventsHandler(): void {
    this.startCarButton.addEventListener(`click`, async () => {
      console.log('single');

      await this.startSingleMoveCar();
    });

    this.returnCarButton.addEventListener('click', async () => {
      console.log('return');
      await this.stopRaceMoveCar();
      this.car.setToStartPosition();
      this.enableAllButtons();
      this.garageController.enableControllerButtons();
      this.returnCarButton.disabled = true;
    });

    this.selectCarButton.addEventListener('click', async () => {
      this.setSelectedState();
      this.selectCarCallback();
      this.garageController.enableUpdateInput();
      const garageControllerUpdateButton = this.garageController.getUpdateCarButton();
      this.garageController.setUpdateInputValue(this.carName);
      garageControllerUpdateButton.disabled = false;
      this.garageController.disableControllerButtons();
      this.garageController.setUpdateSelectCarId(this.car.getCarId());
      this.garageController.setUpdateSelectCarName(this.carName);
      this.garageController.disableCreateInput();
    });

    this.removeCarButton.addEventListener('click', async () => {
      await this.carGarageService.deleteCar(this.car.getCarId());
      this.garageController.enableControllerButtons();
      this.deletaCarsCallback();
      this.garageController.clearUpdateInputValues();
      this.garageController.disableUpdateInput();
      this.garageController.enableCreateInput();
    });
  }

  private setSelectedState(): void {
    this.equipmentCar.classList.add('car-filed__active');
  }

  public deleteSelectedState(): void {
    this.equipmentCar.classList.remove('car-filed__active');
  }

  public disableAllButtons(): void {
    this.selectCarButton.disabled = true;
    this.removeCarButton.disabled = true;
    this.startCarButton.disabled = true;
  }

  public enableAllButtons(): void {
    this.selectCarButton.disabled = false;
    this.removeCarButton.disabled = false;
    this.startCarButton.disabled = false;
  }

  public async startRaceMoveCar(): Promise<StartMoveResultType | void> {
    const firstResultTime = await this.car.startMove();
    return firstResultTime;
  }

  public async stopRaceMoveCar(): Promise<void> {
    await this.car.stopMove();
  }

  public async startSingleMoveCar(): Promise<StartMoveResultType | void> {
    this.garageController.disableControllerButtons();
    this.disableAllButtons();
    this.returnCarButton.disabled = false;
    const firstResultTime = await this.car.startMove();

    return firstResultTime;
  }

  public setCarName(value: string): void {
    this.carNameElement.textContent = value;
    // TODO ?
    this.carName = value;
  }

  private setCarId(id: number): void {
    this.carElement.id = `${id}`;
  }

  public getCar(): HTMLElement {
    return this.equipmentCar;
  }

  public getCarId(): number {
    return this.car.getCarId();
  }

  public setCarColor(value: string): void {
    this.car.setCarColor(value);
  }

  public setCarToInitialPlace(): void {
    this.car.setToStartPosition();
  }

  public disableSelectButton(): void {
    this.selectCarButton.disabled = true;
  }

  public enableSelectButton(): void {
    this.selectCarButton.disabled = false;
  }
}
