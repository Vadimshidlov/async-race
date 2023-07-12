import createElement from "../element/element-creator";
import {getCarImage} from "./get-car-image";

// const car = require('../../assets/svg/1299198.svg')


export class Car {
    private readonly element: HTMLElement;

    constructor() {
        // this.element = createElement({tag: 'div', classNames: ['icon', 'fb'], text: ''})
        this.element = createElement({tag: 'div', classNames: ['car'], text: ''})
        this.configureElement()
    }

    private configureElement(): void {
        const car = getCarImage('RGB(125,60,65)')
        this.element.innerHTML = car;
    }

    public getCar(): HTMLElement {
        return this.element
    }

}
