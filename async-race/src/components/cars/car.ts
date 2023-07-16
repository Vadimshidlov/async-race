import {CarEngine, StartEngineType} from '../../services/CarEngine';
import {animate, draw} from '../../utils/animation';
import createElement from '../element/element-creator';
import {getCarImage} from './get-car-image';

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
        this.carElement = createElement({tag: 'div', classNames: ['car'], text: ''});
        this.configureElement(color);
    }

    private configureElement(color: string): void {
        const car = getCarImage(color);

        this.carElement.innerHTML = car;
    }

    // public async startEngine(): Promise<void> {}

    // public async stopEngine(): Promise<void> {}

    private animate(duration: number): void {
        const startTime = performance.now()
        const go = (): void => {
            const now = performance.now()
            const delta = Math.min((now - startTime) * duration, 1)
            const endPoint = window.innerWidth * 0.8

            // this.carElement.style.transform = `translateX(${delta}px)`
            this.carElement.style.left += `${40 + delta * endPoint}px`
            if (delta < 1) {
                requestAnimationFrame(go)
            }
        }

        go()

    }

    public async startMove(): Promise<void> {
        try {
            const startEngine = await this.carEngine.startEgine(this.carId);
            const speed = +startEngine.velocity;
            const distance = +startEngine.distance;
            const timeSec = distance / speed / 1000;
            this.carElement.style.transitionDuration = `${timeSec}s`
            this.animate(timeSec)

            console.log(startEngine, `startEngine`);
            const isStart = await this.carEngine.driveEngine(this.carId);
            console.log(isStart, `isStart`);
            if (isStart.status === 500) {
                this.stopMove()
            }
        } catch (error) {
            console.error(error);
        }
    }

    public stopMove(): void {
        cancelAnimationFrame(this.carAnimationId)

    }


    public getCar(): HTMLElement {
        return this.carElement;
    }
}
