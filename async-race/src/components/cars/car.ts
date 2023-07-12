import { CreateButtonElement } from '../create-input/create-button';
import createElement from '../element/element-creator';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const carSvg = require('../../assets/svg/car.svg');

export class Car {
  private carField: HTMLElement;

  constructor() {
    this.carField = createElement({
      tag: 'div',
      classNames: ['car-filed'],
      text: '',
    });
    this.configureElement();
  }

  private configureElement(): void {
    const carControllers = createElement({
      tag: 'div',
      classNames: ['car-filed__controller'],
      text: '',
    });

    const driveButton = new CreateButtonElement('Start').getElement();
    const stopButton = new CreateButtonElement('Stop').getElement();
    carControllers.append(driveButton, stopButton);

    const roadWrapper = createElement({
      tag: 'div',
      classNames: ['car-filed_road'],
      text: '',
    });

    roadWrapper.append(carSvg.src);

    // eslint-disable-next-line global-require

    // https://svgsilh.com/image/1918554.html  <---------CAR
    this.carField.append(carControllers, roadWrapper);
  }

  public getCar(): HTMLElement {
    return this.carField;
  }
}
