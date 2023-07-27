import { EngineService } from '../../services/EngineService';
import createElement from '../element/createElement';
import { getCarImage } from './getCarImage';
import { getEndpoint } from '../utils/getEmdpoint';

export type StartMoveResultType = {
  roadTime: number;
  carName: string;
  carId: number;
};

export interface ICar {
  startMove: () => Promise<StartMoveResultType | void>;
  stopMove: () => Promise<void>;
  setToStartPosition: () => void;
  getCar: () => HTMLElement;
  getCarId: () => number;
  setCarColor: (colorValue: string) => void;
}

export class Car implements ICar {
  private readonly carElement: HTMLElement;

  private carEngine = new EngineService();

  private readonly CAR_ID: number;

  private carAnimationId = 0;

  private readonly carName: string;

  private readonly MILI_SECONDS_NUMBER = 1000;

  constructor(color: string, carId: number, carName: string) {
    this.CAR_ID = carId;
    this.carName = carName;
    this.carElement = createElement({ tag: 'div', classNames: ['car'], text: '' });
    this.configureElement(color);
  }

  public async startMove(): Promise<StartMoveResultType | void> {
    try {
      const startEngine = await this.carEngine.startEngine(this.CAR_ID);
      const speed = +startEngine.velocity;
      const distance = +startEngine.distance;
      const roadTime = distance / speed / this.MILI_SECONDS_NUMBER;
      this.animate(roadTime);

      await this.carEngine.driveEngine(this.CAR_ID);
      await this.carEngine.stopEngine(this.CAR_ID);

      return {
        roadTime,
        carName: this.carName,
        carId: this.CAR_ID,
      };
    } catch (error) {
      return await this.stopMove();
    }
  }

  public async stopMove(): Promise<void> {
    cancelAnimationFrame(this.carAnimationId);
    await this.carEngine.stopEngine(this.CAR_ID);
  }

  public setToStartPosition(): void {
    this.carElement.style.transform = `translateX(0%)`;
  }

  public getCar(): HTMLElement {
    return this.carElement;
  }

  public getCarId(): number {
    return this.CAR_ID;
  }

  public setCarColor(colorValue: string): void {
    const NEW_CAR = getCarImage(colorValue);

    this.carElement.innerHTML = NEW_CAR;
  }

  private configureElement(color: string): void {
    const CAR_IMAGE = getCarImage(color);

    this.carElement.innerHTML = CAR_IMAGE;
  }

  private animate(duration: number): void {
    const START_TIME = new Date().getTime();
    const END_POINT = getEndpoint();

    const moveStep = (): void => {
      const CURRENT_TIME = new Date().getTime();
      const DELTA_TIME = Math.min((CURRENT_TIME - START_TIME) / this.MILI_SECONDS_NUMBER);

      this.carElement.style.transform = `translateX(${(DELTA_TIME * END_POINT) / duration}%)`;

      if (DELTA_TIME <= duration) {
        this.carAnimationId = requestAnimationFrame(moveStep);
      }
    };

    this.carAnimationId = requestAnimationFrame(moveStep);
  }
}
