import { CarEngine, StartDriveType } from '../../services/CarEngine';
import createElement from '../element/element-creator';
import { getCarImage } from './get-car-image';

// const car = require('../../assets/svg/1299198.svg')

export type StartMoveResultType = {
  roadTime: number;
  carName: string;
  carId: number;
};

export class Car {
  private readonly carElement: HTMLElement;

  private readonly animationClass = 'car__drive';

  private carEngine = new CarEngine();

  private readonly carId: number;

  private carAnimationId = 0;

  private carName: string;

  constructor(color: string, carId: number, carName: string) {
    // this.element = createElement({tag: 'div', classNames: ['icon', 'fb'], text: ''})
    this.carId = carId;
    this.carName = carName;
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

  public async startMove(): Promise<StartMoveResultType | void> {
    try {
      const startEngine = await this.carEngine.startEgine(this.carId);
      const speed = +startEngine.velocity;
      const distance = +startEngine.distance;
      const roadTime = distance / speed / 1000;
      // this.carElement.style.transitionDuration = `${timeSec}s`;
      this.animate(roadTime);

      // console.log(startEngine, `startEngine`);
      await this.carEngine.driveEngine(this.carId);
      // console.log(isSuccessDrive, `isStart`);
      await this.carEngine.stopEngine(this.carId);

      const resultData = {
        roadTime,
        carName: this.carName,
        carId: this.carId,
      };

      return resultData;
    } catch (error) {
      return await this.stopMove();
    }
  }

  public async stopMove(): Promise<void> {
    cancelAnimationFrame(this.carAnimationId);
    await this.carEngine.stopEngine(this.carId);
  }

  public setToStartPosition(): void {
    this.carElement.style.transform = `translateX(0%)`;
  }

  public getCar(): HTMLElement {
    return this.carElement;
  }
}
