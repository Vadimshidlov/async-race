import {EngineService, StartEngineType} from '../../services/EngineService';
import createElement from '../element/createElement';
import {getCarImage} from './getCarImage';
import {getRaceEndPoint} from '../utils/getRaceEndPoint';

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

    private carEngineApi: EngineService = new EngineService();

    private readonly carName: string;

    private readonly MILLI_SECONDS_NUMBER: number = 1000;

    private readonly START_POSITION_STYLE_VALUE: string = `translateX(0%)`;

    private CAR_ANIMATION_ID = 0;

    private readonly CAR_ID: number;

    constructor(color: string, carId: number, carName: string) {
        this.CAR_ID = carId;
        this.carName = carName;
        this.carElement = createElement({tag: 'div', classNames: ['car']});
        this.configureElement(color);
    }

    public async startMove(): Promise<StartMoveResultType | void> {
        try {
            const startEngine: StartEngineType = await this.carEngineApi.startEngine(this.CAR_ID);
            const speed: number = +startEngine.velocity;
            const distance: number = +startEngine.distance;
            const roadTime: number = distance / speed / this.MILLI_SECONDS_NUMBER;
            this.animate(roadTime);

            await this.carEngineApi.driveEngine(this.CAR_ID);
            await this.carEngineApi.stopEngine(this.CAR_ID);

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
        cancelAnimationFrame(this.CAR_ANIMATION_ID);
        await this.carEngineApi.stopEngine(this.CAR_ID);
    }

    public setToStartPosition(): void {
        this.carElement.style.transform = this.START_POSITION_STYLE_VALUE;
    }

    public getCar(): HTMLElement {
        return this.carElement;
    }

    public getCarId(): number {
        return this.CAR_ID;
    }

    public setCarColor(colorValue: string): void {
        const newCar: string = getCarImage(colorValue);
        this.carElement.innerHTML = newCar;
    }

    private configureElement(color: string): void {
        const carImage: string = getCarImage(color);
        this.carElement.innerHTML = carImage;
    }

    private animate(duration: number): void {
        const startTime: number = new Date().getTime();
        const endPoint: number = getRaceEndPoint();

        const moveStep = (): void => {
            const currentTime: number = new Date().getTime();
            const deltaTime: number = Math.min((currentTime - startTime) / this.MILLI_SECONDS_NUMBER);

            this.carElement.style.transform = `translateX(${(deltaTime * endPoint) / duration}%)`;

            if (deltaTime <= duration) {
                this.CAR_ANIMATION_ID = requestAnimationFrame(moveStep);
            }
        };

        this.CAR_ANIMATION_ID = requestAnimationFrame(moveStep);
    }
}
