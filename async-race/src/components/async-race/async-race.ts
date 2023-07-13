import getHeader from '../header/header';
import '../../styles.scss';
import createElement from '../element/element-creator';
import {CreateInputElement} from '../create-input/create-input';
import {CreateButtonElement} from '../create-input/create-button';
import {ColorPicker} from '../create-input/color-picker';
import {CarField} from '../cars/car-field';
import {helperRequest} from '../cars/helper-request';
import {CarGarage} from "../../services/CarGarage";

export class AsyncRace {
    private body = document.body;

    private createInput: CreateInputElement = new CreateInputElement();

    private readonly createInputElement: HTMLElement;

    private readonly updateInput: CreateInputElement = new CreateInputElement();

    private readonly updateInputElement: HTMLElement;

    private createButton: CreateButtonElement = new CreateButtonElement('Create');

    private readonly createButtonElement: HTMLElement;

    private readonly updateButton: CreateButtonElement = new CreateButtonElement('Update');

    private readonly updateButtonElement: HTMLElement;

    private raceStartButton: CreateButtonElement = new CreateButtonElement('Race');

    private raceStartButtonElement: HTMLElement;

    private raceResetButton: CreateButtonElement = new CreateButtonElement('Reset');

    private raceResetButtonElement: HTMLElement;

    private generateCarButton: CreateButtonElement = new CreateButtonElement('Get Cars');

    private generateCarButtonElement: HTMLElement;

    private colorPicker = new ColorPicker();

    private colorPickerElement: HTMLInputElement;

    private updateColorPicker = new ColorPicker();

    private updateColorPickerElement: HTMLElement;

    private garage: HTMLElement = createElement({
        tag: 'div',
        classNames: ['garage'],
        text: '',
    });

    private carGarageApi = new CarGarage()

    constructor() {
        this.generateCarButtonElement = this.generateCarButton.getElement();
        this.raceResetButtonElement = this.raceResetButton.getElement();
        this.raceStartButtonElement = this.raceStartButton.getElement();
        this.createInputElement = this.createInput.getElement();
        this.updateInputElement = this.updateInput.getElement();
        this.createButtonElement = this.createButton.getElement();
        this.updateButtonElement = this.updateButton.getElement();
        this.colorPickerElement = this.colorPicker.getElement();
        this.updateColorPickerElement = this.updateColorPicker.getElement();
        this.getHtmlPAge();
        this.getCars();
        this.addEventListeners();
    }

    public getHtmlPAge(): void {
        // HEADER
        const header: HTMLElement = getHeader();
        const main = createElement({
            tag: 'main',
            classNames: ['main', '_container'],
            text: '',
        });

        // CONTROLLER
        const controllerSection = createElement({
            tag: 'section',
            classNames: ['controller'],
            text: '',
        });

        const createBlock = createElement({
            tag: 'div',
            classNames: ['controller__block', 'block-create'],
            text: '',
        });
        createBlock.append(this.createInputElement, this.colorPickerElement, this.createButtonElement);

        const updateBlock = createElement({
            tag: 'div',
            classNames: ['controller__block', 'block-update'],
            text: '',
        });
        updateBlock.append(
            this.updateInputElement,
            this.updateColorPickerElement,
            this.updateButtonElement,
        );

        const raceBlock = createElement({
            tag: 'div',
            classNames: ['controller__block', 'block-race'],
            text: '',
        });

        raceBlock.append(
            this.raceStartButtonElement,
            this.raceResetButtonElement,
            this.generateCarButtonElement,
        );

        controllerSection.append(createBlock, updateBlock, raceBlock);

        // GARAGE

        const garageBlock = createElement({
            tag: 'section',
            classNames: ['garage__block', 'block-garage'],
            text: '',
        });

        const garageInfo = createElement({
            tag: 'div',
            classNames: ['block-garage__info'],
            text: '',
        });

        const garageTitle = createElement({
            tag: 'h1',
            classNames: ['block-garage__title'],
            text: 'GARAGE',
        });

        const garageCount = createElement({
            tag: 'span',
            classNames: ['block-garage__count'],
            text: '#',
        });

        garageInfo.append(garageTitle, garageCount);

        // const garageItems = createElement({
        //   tag: 'div',
        //   classNames: ['garage'],
        //   text: '',
        // });

        garageBlock.append(garageInfo);
        garageBlock.append(garageInfo, this.garage);

        main.append(controllerSection);
        main.append(garageBlock);

        this.body.append(header);
        this.body.append(main);
    }

    private addEventListeners(): void {
        this.createButtonElement.addEventListener('click', async () => {
            const textValue = this.createInput.getInputValue();
            const colorValue = this.colorPicker.getInputValue();
            // const res = await helperRequest();
            // console.log(colorValue);
            // console.log(res);
            const res = await this.carGarageApi.createCar(textValue, colorValue)
            console.log(res);
            const allCars = await this.carGarageApi.getCars(2)
            console.log(allCars, `allCars`);

            this.createInput.clearInputValue();
            this.colorPicker.clearInputValue()

        });

        this.updateButtonElement.addEventListener('click', () => {
            /* const pikerValue = this.updateColorPicker.getInputValue();
            console.log(pikerValue); */

            const carAnamtion = document.querySelector('.car');
            if (carAnamtion instanceof HTMLElement && carAnamtion) {
                carAnamtion.style.animationPlayState = 'paused';
            }
        });
    }

    private async getCars(page = 1): Promise<void> {
        const pageCars = await this.carGarageApi.getCars()
        console.log(pageCars);

        pageCars.forEach((carData) => {
            const car = new CarField().getCar();
            this.garage.append(car);
        })

    }
}
