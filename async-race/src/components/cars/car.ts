import { EngineService } from '../../services/EngineService';
import createElement from '../element/element-creator';
import { getCarImage } from './get-car-image';
import { getEndpoint } from '../utils/getEmdpoint';

export type StartMoveResultType = {
  roadTime: number;
  carName: string;
  carId: number;
};

export class Car {
  private readonly carElement: HTMLElement;

  private readonly animationClass = 'car__drive';

  private carEngine = new EngineService();

  private readonly carId: number;

  private carAnimationId = 0;

  private readonly carName: string;

  constructor(color: string, carId: number, carName: string) {
    this.carId = carId;
    this.carName = carName;
    this.carElement = createElement({ tag: 'div', classNames: ['car'], text: '' });
    this.configureElement(color);
  }

  private configureElement(color: string): void {
    const car = getCarImage(color);

    this.carElement.innerHTML = car;
  }

  private animate(duration: number): void {
    const startTime = new Date().getTime();
    const endPoint = getEndpoint();

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
      this.animate(roadTime);

      await this.carEngine.driveEngine(this.carId);
      await this.carEngine.stopEngine(this.carId);

      return {
        roadTime,
        carName: this.carName,
        carId: this.carId,
      };
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

  public getCarId(): number {
    return this.carId;
  }

  public setCarColor(colorValue: string): void {
    const newCar = getCarImage(colorValue);

    this.carElement.innerHTML = newCar;
  }
}
