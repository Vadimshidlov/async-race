/* eslint-disable @typescript-eslint/no-var-requires,global-require */
import {CreateButtonElement} from '../create-input/create-button';
import createElement from '../element/element-creator';
import './car-field.scss'
import {Car} from "./car";

const carSvg = require('../../assets/svg/car.svg');
const flag = require('../../assets/svg/flag.svg')


export class CarField {
    private readonly carField: HTMLElement;

    private carName: HTMLSpanElement;

    constructor() {
        this.carField = createElement({
            tag: 'div',
            classNames: ['car-filed'],
            text: '',
        });
        this.carName = createElement<HTMLSpanElement>({tag: 'span', classNames: ['car-filed__name'], text: 'Tesla'})
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
        carControllers.append(driveButton, stopButton, this.carName);

        const roadWrapper = createElement({
            tag: 'div',
            classNames: ['car-filed_road'],
            text: '',
        });
        const car = new Car().getCar()
        const flagImage = createElement({
            tag: 'img',
            classNames: ['car-filed__flag'],
            text: '',
        });
        if (flagImage instanceof HTMLImageElement) {
            flagImage.src = flag
        }

        roadWrapper.append(car, flagImage);

        this.carField.append(carControllers, roadWrapper);
    }

    public changeCarName(value: string): void {
        this.carName.textContent = value
    }

    public getCar(): HTMLElement {
        return this.carField;
    }
}
