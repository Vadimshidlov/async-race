/* eslint-disable @typescript-eslint/no-var-requires,global-require */
import { CreateButtonElement } from '../create-input/create-button';
import createElement from '../element/element-creator';
import './car-field.scss';
import { Car } from './car';

const carSvg = require('../../assets/svg/car.svg');
const flag = require('../../assets/svg/flag.svg');

export type EquipmentPropsType = {
  carColor: string;
  carName: string;
  id: number;
};

export class EquipmentCar {
  private readonly EquipmentCar: HTMLElement;

  private carName: HTMLSpanElement;

  private car: Car;

  private carElement: HTMLElement;

  private startCarButton: HTMLElement;

  private stopCarButton: HTMLElement;

  private selectCarButton: HTMLElement;

  private removeCarButton: HTMLElement;

  constructor({ carColor, carName, id }: EquipmentPropsType) {
    this.EquipmentCar = createElement({
      tag: 'div',
      classNames: ['car-filed'],
      text: '',
    });
    this.startCarButton = new CreateButtonElement('Start').getElement();
    this.stopCarButton = new CreateButtonElement('Stop').getElement();
    this.selectCarButton = new CreateButtonElement('Select').getElement();
    this.removeCarButton = new CreateButtonElement('Remove').getElement();
    this.car = new Car(carColor, id);
    this.carElement = this.car.getCar();
    this.carName = createElement<HTMLSpanElement>({
      tag: 'span',
      classNames: ['car-filed__name'],
      text: 'Tesla',
    });
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

    // const driveButton = new CreateButtonElement('Start').getElement();
    // const stopButton = new CreateButtonElement('Stop').getElement();
    stateControllersBtns.append(this.selectCarButton, this.removeCarButton, this.carName);
    moveControllersBtns.append(this.startCarButton, this.stopCarButton);
    carControllers.append(stateControllersBtns, moveControllersBtns);

    const roadWrapper = createElement({
      tag: 'div',
      classNames: ['car-filed_road'],
      text: '',
    });
    // const car = new Car().getCar();
    const flagImage = createElement({
      tag: 'img',
      classNames: ['car-filed__flag'],
      text: '',
    });
    if (flagImage instanceof HTMLImageElement) {
      flagImage.src = flag;
    }

    roadWrapper.append(this.carElement, flagImage);

    this.EquipmentCar.append(carControllers, roadWrapper);
  }

  private addEventsHandler(): void {
    this.startCarButton.addEventListener(`click`, () => {
      this.car.startMove();
    });
  }

  public setCarName(value: string): void {
    this.carName.textContent = value;
  }

  private setCarId(id: number): void {
    this.carElement.id = `${id}`;
  }

  public getCar(): HTMLElement {
    return this.EquipmentCar;
  }
}
