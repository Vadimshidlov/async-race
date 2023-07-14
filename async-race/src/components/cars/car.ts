import { CarEngine, StartEngineType } from '../../services/CarEngine';
import { animateStep } from '../../utils/animation';
import createElement from '../element/element-creator';
import { getCarImage } from './get-car-image';

// const car = require('../../assets/svg/1299198.svg')

export class Car {
  private readonly carElement: HTMLElement;

  private readonly animationClass = 'car__drive';

  private carEngine = new CarEngine();

  private carId: number;

  constructor(color: string, carId: number) {
    // this.element = createElement({tag: 'div', classNames: ['icon', 'fb'], text: ''})
    this.carId = carId;
    this.carElement = createElement({ tag: 'div', classNames: ['car'], text: '' });
    this.configureElement(color);
  }

  private configureElement(color: string): void {
    const car = getCarImage(color);

    this.carElement.innerHTML = car;
  }

  // public async startEngine(): Promise<void> {}

  // public async stopEngine(): Promise<void> {}

  public async startMove(): Promise<void> {
    let animationId: number;
    try {
      const startEngine = await this.carEngine.startEgine(this.carId);
      const speed = +startEngine.velocity;
      const distance = +startEngine.distance;
      const timeSec = distance / speed / 1000;
      // this.getAnimation(timeSec);
      const currTime = Date.now();
      animationId = window.requestAnimationFrame(() =>
        animateStep(currTime, timeSec, this.carElement),
      );
      console.log(startEngine, `startEngine`);
      const isStart = await this.carEngine.driveEgine(this.carId);
      console.log(isStart, `isStart`);
    } catch (error) {
      console.error(error);
      // this.animationStop();
    }
  }

  // private startMove(time: number): void {
  //   this.carElement.style.transition = `transition: all ${time}s linear 0s;`;
  //   this.carElement.classList.add(this.animationClass);
  // }

  private getAnimation(time: number): void {
    this.carElement.style.transitionDuration = `${time}s`;
    this.carElement.classList.add(this.animationClass);
    // setTimeout(() => {
    //   this.carElement.classList.add('car__animation-stope');
    // }, 500);
  }

  private animationStop(): void {
    // this.carElement.classList.add('car__animation-stop');
    this.carElement.style.animationPlayState = 'pause';
  }

  // public async stopMove(): Promise<void> {}

  public getCar(): HTMLElement {
    return this.carElement;
  }

  //   public async startEngine(): Promise<StartEngineType> {}
}
