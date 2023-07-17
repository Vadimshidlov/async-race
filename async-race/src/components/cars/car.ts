import { CarEngine, StartDriveType } from '../../services/CarEngine';
import createElement from '../element/element-creator';
import { getCarImage } from './get-car-image';

// const car = require('../../assets/svg/1299198.svg')

export class Car {
  private readonly carElement: HTMLElement;

  private readonly animationClass = 'car__drive';

  private carEngine = new CarEngine();

  private readonly carId: number;

  private carAnimationId = 0;

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

  private animate(duration: number): void {
    const startTime = new Date().getTime();
    let endPoint: number;

    if (window.innerWidth <= 650) {
      endPoint = 78;
    }
    if (window.innerWidth <= 600) {
      endPoint = 76;
    }
    if (window.innerWidth > 650) {
      endPoint = 85;
    }

    const go = (): void => {
      const currentTime = new Date().getTime();
      const deltaTime = Math.min((currentTime - startTime) / 1000);

      this.carElement.style.transform = `translateX(${(deltaTime * endPoint) / duration}%)`;

      if (deltaTime <= duration) {
        this.carAnimationId = requestAnimationFrame(go);
      }
    };

    this.carAnimationId = requestAnimationFrame(go);
  }
  /* private animate(duration: number): void {
    console.log(duration, `duration`);
    const startTime = new Date().getTime();
    // const endPoint = window.innerWidth * 0.8;
    let endPoint: number;

    if (window.innerWidth <= 650) {
      endPoint = 78;
    }
    if (window.innerWidth <= 600) {
      endPoint = 76;
    }
    if (window.innerWidth > 650) {
      endPoint = 85;
    }

    const go = (): void => {
      const currentTime = new Date().getTime();
      const deltaTime = Math.min((currentTime - startTime) / 1000);
      // console.log(deltaTime, `deltaTime`);

      this.carElement.style.transform = `translateX(${(deltaTime * endPoint) / duration}%)`;
      // this.carElement.style.left = `${currPos + step}px`;

      //   this.carElement.style.left = `${currPos + step}px`;
      if (deltaTime <= duration) {
        requestAnimationFrame(go);
      }
    };

    this.carAnimationId = requestAnimationFrame(go);
    console.log(this.carAnimationId, `carAnimationId`);
  } */

  // eslint-disable-next-line consistent-return
  public async startMove(): Promise<void | Response> {
    try {
      const startEngine = await this.carEngine.startEgine(this.carId);
      const speed = +startEngine.velocity;
      const distance = +startEngine.distance;
      const timeSec = distance / speed / 1000;
      // this.carElement.style.transitionDuration = `${timeSec}s`;
      this.animate(timeSec);

      // console.log(startEngine, `startEngine`);
      const isSuccessDrive = await this.carEngine.driveEngine(this.carId);
      // console.log(isSuccessDrive, `isStart`);
      if (isSuccessDrive.status === 500) {
        this.stopMove();
      }

      return await isSuccessDrive.json();
    } catch (error) {
      console.error(error);
    }
  }

  public stopMove(): void {
    cancelAnimationFrame(this.carAnimationId);
  }

  public setToStartPosition(): void {
    this.carElement.style.transform = `translateX(0%)`;
  }

  public getCar(): HTMLElement {
    return this.carElement;
  }
}
