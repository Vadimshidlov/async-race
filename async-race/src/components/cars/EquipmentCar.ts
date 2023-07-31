/* eslint-disable @typescript-eslint/no-var-requires,global-require */
import {createButtonElement} from '../create-input/createButtonElement';
import createElement from '../element/createElement';
import {Car, StartMoveResultType} from './Car';
import {GarageController} from '../GarageController/GarageController';
import {GarageService} from '../../services/GarageService';
import {WinnersService} from "../../services/WinnersService";

import './car-field.scss';

const FLAG = require('../../assets/svg/FLAG.svg');

export type EquipmentPropsType = {
    carColor: string;
    carName: string;
    id: number;
    garageController: GarageController;
    deleteCarsCallback: () => Promise<void>;
    selectCarCallback: () => void;
};

export interface IEquipmentCar {
    deleteSelectedState: () => void
    disableAllButtons: () => void
    enableAllButtons: () => void
    startRaceMoveCar: () => Promise<StartMoveResultType | void>
    stopRaceMoveCar: () => Promise<void>
    startSingleMoveCar: () => Promise<StartMoveResultType | void>
    setCarName: (value: string) => void
    getCar: () => HTMLElement
    getCarId: () => number
    setCarColor: (value: string) => void
    setCarToInitialPlace: () => void
    disableSelectButton: () => void
    enableSelectButton: () => void
}

export class EquipmentCar implements IEquipmentCar {
    private readonly equipmentCar: HTMLElement;

    private readonly carNameElement: HTMLSpanElement;

    private car: Car;

    private readonly carElement: HTMLElement;

    private startCarButton: HTMLButtonElement = createButtonElement('Start');

    private returnCarButton: HTMLButtonElement = createButtonElement('Return');

    private selectCarButton: HTMLButtonElement = createButtonElement('Select');

    private removeCarButton: HTMLButtonElement = createButtonElement('Remove');

    private garageController: GarageController;

    private carName: string;

    private carGarageApi: GarageService = new GarageService();

    private readonly deleteCarsCallback: () => Promise<void>;

    private readonly selectCarCallback: () => void;

    private carColor: string;

    private winnersApi: WinnersService = new WinnersService();

    private readonly ZERO_NUMBER = 0;

    private readonly CAR_FIELD_ID: string;

    constructor({
                    carColor,
                    carName,
                    id,
                    garageController,
                    deleteCarsCallback,
                    selectCarCallback,
                }: EquipmentPropsType) {
        this.equipmentCar = createElement({
            tag: 'div',
            classNames: ['car-filed'],
        });
        this.CAR_FIELD_ID = `carField-${id}`;
        this.carName = carName;
        this.carColor = carColor;
        this.equipmentCar.id = this.CAR_FIELD_ID;
        this.deleteCarsCallback = deleteCarsCallback;
        this.selectCarCallback = selectCarCallback;

        this.car = new Car(this.carColor, id, carName);
        this.carElement = this.car.getCar();
        this.carNameElement = createElement<HTMLSpanElement>({
            tag: 'span',
            classNames: ['car-filed__name'],
            text: 'Tesla',
        });

        this.garageController = garageController;
        this.configureElement();
        this.setCarName(carName);
        this.setCarId(id);
        this.addEventsHandler();
    }

    public deleteSelectedState(): void {
        this.equipmentCar.classList.remove('car-filed__active');
    }

    public disableAllButtons(): void {
        this.selectCarButton.disabled = true;
        this.removeCarButton.disabled = true;
        this.startCarButton.disabled = true;
    }

    public enableAllButtons(): void {
        this.selectCarButton.disabled = false;
        this.removeCarButton.disabled = false;
        this.startCarButton.disabled = false;
    }

    public async startRaceMoveCar(): Promise<StartMoveResultType | void> {
        const firstResultTime: void | StartMoveResultType = await this.car.startMove();

        return firstResultTime;
    }

    public async stopRaceMoveCar(): Promise<void> {
        await this.car.stopMove();
    }

    public async startSingleMoveCar(): Promise<StartMoveResultType | void> {
        this.garageController.disableControllerButtons();
        this.garageController.disableCreateInput();
        this.disableAllButtons();
        this.returnCarButton.disabled = false;
        const firstResultTime: void | StartMoveResultType = await this.car.startMove();

        return firstResultTime;
    }

    public setCarName(value: string): void {
        this.carNameElement.textContent = value;
        this.carName = value;
    }

    public getCar(): HTMLElement {
        return this.equipmentCar;
    }

    public getCarId(): number {
        return this.car.getCarId();
    }

    public setCarColor(value: string): void {
        this.car.setCarColor(value);
        this.carColor = value;
    }

    public setCarToInitialPlace(): void {
        this.car.setToStartPosition();
    }

    public disableSelectButton(): void {
        this.selectCarButton.disabled = true;
    }

    public enableSelectButton(): void {
        this.selectCarButton.disabled = false;
    }

    private configureElement(): void {
        const carControllers: HTMLElement = createElement({
            tag: 'div',
            classNames: ['car-filed__controller', 'controller'],
        });

        const stateControllerButtons: HTMLElement = createElement({
            tag: 'div',
            classNames: ['controller-state'],
        });

        const moveControllerButtons: HTMLElement = createElement({
            tag: 'div',
            classNames: ['controller-move'],
        });

        stateControllerButtons.append(this.selectCarButton, this.removeCarButton, this.carNameElement);
        moveControllerButtons.append(this.startCarButton, this.returnCarButton);
        this.returnCarButton.disabled = true;
        carControllers.append(stateControllerButtons, moveControllerButtons);

        const roadWrapper: HTMLElement = createElement({
            tag: 'div',
            classNames: ['car-filed_road'],
        });
        const flagImage: HTMLImageElement = createElement<HTMLImageElement>({
            tag: 'img',
            classNames: ['car-filed__flag'],
        });
        flagImage.src = FLAG;

        roadWrapper.append(this.carElement, flagImage);

        this.equipmentCar.append(carControllers, roadWrapper);
    }

    private addEventsHandler(): void {
        this.startCarButton.addEventListener(`click`, async () => {
            await this.startSingleMoveCar();
        });

        this.returnCarButton.addEventListener('click', async () => {
            await this.stopRaceMoveCar();
            this.car.setToStartPosition();
            this.enableAllButtons();
            this.garageController.enableControllerButtons();
            this.returnCarButton.disabled = true;
            this.garageController.enableCreateInput();
        });

        this.selectCarButton.addEventListener('click', async () => {
            this.setSelectedState();
            this.selectCarCallback();
            this.garageController.enableUpdateInput();
            const garageControllerUpdateButton: HTMLButtonElement = this.garageController.getUpdateCarButton();
            this.garageController.setUpdateInputValue(this.carName, this.carColor);
            garageControllerUpdateButton.disabled = false;
            this.garageController.disableControllerButtons();
            this.garageController.setUpdateSelectCarId(this.car.getCarId());
            this.garageController.setUpdateSelectCarName(this.carName);
            this.garageController.disableCreateInput();
        });

        this.removeCarButton.addEventListener('click', async () => {
            const removeCarId: number = this.car.getCarId()

            try {
                await this.winnersApi.getWinner(removeCarId)
                await this.winnersApi.deleteWinner(removeCarId)
                await this.carGarageApi.deleteCar(removeCarId);
            } catch (error) {
                await this.carGarageApi.deleteCar(removeCarId);
            }

            this.garageController.enableControllerButtons();
            await this.deleteCarsCallback();
            this.garageController.clearUpdateInputValues();
            this.garageController.disableUpdateInput();
            this.garageController.enableCreateInput();
            const countGarageCars: number = await this.carGarageApi.getCountCars();

            if (countGarageCars === this.ZERO_NUMBER) {
                this.garageController.disableRaceStartButton();
            }
        });
    }

    private setSelectedState(): void {
        this.equipmentCar.classList.add('car-filed__active');
    }


    private setCarId(id: number): void {
        this.carElement.id = `${id}`;
    }
}
