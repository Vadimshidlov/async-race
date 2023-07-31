import {GarageService, GetCarsType} from '../../services/GarageService';
import {WinnersService} from '../../services/WinnersService';
import {StartMoveResultType} from '../cars/Car';
import {EquipmentCar} from '../cars/EquipmentCar';
import {GarageController} from '../GarageController/GarageController';
import {getRandomCarName} from '../genereteCars/generateCarName';
import {createButtonElement} from '../create-input/createButtonElement';
import createElement from '../element/createElement';
import {generateRandomColor} from "../genereteCars/generateRandomColor";

export type NewCarDataType = {
    name: string;
    color: string;
};

export type CompareWinnerResultType = {
    time: number;
    winsCount: number;
};

export type WinnerPropsDataType = {
    carId: number;
    carName: string;
    roadTime: number;
};

export interface IGarage {
    getGarageHtml: () => HTMLElement;
    getCars: (page: number) => Promise<void>;
    setGarageCarsCount: (count: number) => void;
    getGarageCurrentPage: () => number;
}

export class Garage implements IGarage {
    private garageElement: HTMLElement = createElement({
        tag: 'div',
        classNames: ['garage'],
    });

    private readonly raceMembersList: EquipmentCar[] = [];

    private carGarageApi: GarageService = new GarageService();

    private garageController: GarageController = new GarageController();

    private garageControllerElement: HTMLElement = this.garageController.getControllerHtml();

    private createButtonElement: HTMLButtonElement = this.garageController.getCreateButton();

    private raceStartButtonElement: HTMLButtonElement = this.garageController.getRaceStartButton();

    private raceResetButtonElement: HTMLButtonElement = this.garageController.getRaceResetButton();

    private updateButtonElement: HTMLButtonElement = this.garageController.getUpdateCarButton();

    private generateCarsButtonElement: HTMLButtonElement = this.garageController.getGenerateCarButton();


    private garageCarsCountBlock: HTMLElement = createElement({
        tag: 'span',
        classNames: ['block-garage__count'],
    });

    private garagePageNumberElement: HTMLElement = createElement({
        tag: 'span',
        classNames: ['block-garage__pages'],
        text: 'Page: 1',
    });

    private garageCurrentPage: number;

    private prevPageButtonElement: HTMLButtonElement = createButtonElement('Prev');

    private nextPageButtonElement: HTMLButtonElement = createButtonElement('Next');

    private winnersApi: WinnersService = new WinnersService();

    private readonly FIRST_PAGE: number = 1;

    private readonly FIRST_WIN_NUMBER: number = 1;

    private readonly CHANGE_PAGE_INDEX: number = 1;

    private readonly ZERO_NUMBER: number = 0;

    private popupElement: HTMLElement | null = null;

    private DELTA_INDEX_NUMBER = 1;

    private GARAGE_PAGE_LIMIT = 7;

    private GARAGE_GENERATE_CARS_COUNT = 100;

    private readonly EMPTY_WINNER_MESSAGE: string = `Ooops :(
        There is no winner...
    `;

    constructor(garageCurrentPage: number) {
        this.garageCurrentPage = garageCurrentPage;
        this.getCars();
        this.addEventListeners();
    }

    public getGarageHtml(): HTMLElement {
        const garageBlock = createElement({
            tag: 'section',
            classNames: ['garage__block', 'block-garage'],
        });

        const garageInfo = createElement({
            tag: 'div',
            classNames: ['block-garage__info'],
        });

        const garagePageController = createElement({
            tag: 'div',
            classNames: ['block-garage__page-controller'],
        });

        this.prevPageButtonElement.disabled = true;
        this.nextPageButtonElement.disabled = true;
        garagePageController.append(this.prevPageButtonElement, this.nextPageButtonElement);

        const garagePageControllerWrapper = createElement({
            tag: 'div',
            classNames: ['page-controller__wrapper'],
        });

        garagePageControllerWrapper.append(garagePageController);

        garageInfo.append(
            this.garageCarsCountBlock,
            this.garagePageNumberElement,
            garagePageControllerWrapper,
        );

        const garagePageHeader = createElement({
            tag: 'div',
            classNames: ['block-garage__header'],
        });

        garagePageHeader.append(this.garageControllerElement, garageInfo);

        garageBlock.append(garagePageHeader, this.garageElement);

        return garageBlock;
    }

    public async getCars(page = this.garageCurrentPage): Promise<void> {
        const carsGarageCount = await this.carGarageApi.getCountCars();

        await this.setGaragePageNumber(page);
        const pageCars = await this.carGarageApi.getCars(page);
        this.raceMembersList.length = this.ZERO_NUMBER;
        this.garageElement.innerHTML = '';

        pageCars.forEach((carData) => {
            const equipmentProps = {
                carColor: carData.color,
                carName: carData.name,
                id: carData.id,
                garageController: this.garageController,
                deleteCarsCallback: this.getCars.bind(this),
                selectCarCallback: this.disableAllSelectButtons.bind(this),
            };

            const equipmentCar = new EquipmentCar(equipmentProps);
            const car = equipmentCar.getCar();
            this.raceMembersList.push(equipmentCar);
            this.garageElement.append(car);
        });

        if (carsGarageCount > this.GARAGE_PAGE_LIMIT && this.garageCurrentPage === this.FIRST_PAGE) {
            this.prevPageButtonElement.disabled = true;
            this.nextPageButtonElement.disabled = false;
        }

        if (
            this.garageCurrentPage === Math.ceil(carsGarageCount / this.GARAGE_PAGE_LIMIT) + this.CHANGE_PAGE_INDEX &&
            this.raceMembersList.length === this.ZERO_NUMBER
        ) {
            this.garageCurrentPage -= this.CHANGE_PAGE_INDEX;
            await this.getCars();
        }

        this.setGarageCarsCount(carsGarageCount);
    }

    public setGarageCarsCount(count: number): void {
        this.garageCarsCountBlock.textContent = `Garage: (${count}) Cars`;
    }

    public getGarageCurrentPage(): number {
        return this.garageCurrentPage;
    }

    private async addSingleCar(newCarData: GetCarsType): Promise<void> {
        const getCarsResponse = await this.carGarageApi.getCars(this.garageCurrentPage)
        const carsPageCount = getCarsResponse.length;

        if (carsPageCount <= this.GARAGE_PAGE_LIMIT) {
            const equipmentProps = {
                carColor: newCarData.color,
                carName: newCarData.name,
                id: newCarData.id,
                garageController: this.garageController,
                deleteCarsCallback: this.getCars.bind(this),
                selectCarCallback: this.disableAllSelectButtons.bind(this),
            };

            const equipmentCar = new EquipmentCar(equipmentProps);
            const car = equipmentCar.getCar();
            this.raceMembersList.push(equipmentCar);
            this.garageElement.append(car);
        }
    }

    private addEventListeners(): void {
        this.nextPageButtonElement.addEventListener('click', async () => {
            if (this.garageCurrentPage === this.FIRST_PAGE) {
                this.prevPageButtonElement.disabled = false;
            }

            const carsGarageCount = await this.carGarageApi.getCountCars();
            this.garageCurrentPage += this.DELTA_INDEX_NUMBER;
            await this.getCars(this.garageCurrentPage);

            if (this.garageCurrentPage === Math.ceil(carsGarageCount / this.GARAGE_PAGE_LIMIT)) {
                this.nextPageButtonElement.disabled = true;
            }
        });

        this.prevPageButtonElement.addEventListener('click', async () => {
            if (this.garageCurrentPage !== this.FIRST_PAGE) {
                const carsGarageCount = await this.carGarageApi.getCountCars();

                if (this.garageCurrentPage === Math.ceil(carsGarageCount / this.GARAGE_PAGE_LIMIT)) {
                    this.nextPageButtonElement.disabled = false;
                }

                this.garageCurrentPage -= this.DELTA_INDEX_NUMBER;

                if (this.garageCurrentPage === this.FIRST_PAGE) {
                    this.prevPageButtonElement.disabled = true;
                }

                await this.getCars(this.garageCurrentPage);
            }
        });

        this.createButtonElement.addEventListener('click', async () => {
            const newCarData = this.garageController.getCreateCarValues();

            if (newCarData.textValue === '') {
                this.garageController.setCreateInputFailedState();

                return;
            }

            const responseNewCarData = await this.carGarageApi.createCar(
                newCarData.textValue,
                newCarData.colorValue,
            );

            const carsGarageCount = await this.carGarageApi.getCountCars();
            this.setGarageCarsCount(carsGarageCount);

            if (
                carsGarageCount <= this.GARAGE_PAGE_LIMIT ||
                this.raceMembersList.length < this.GARAGE_PAGE_LIMIT
            ) {
                await this.addSingleCar(responseNewCarData);
            }

            if (carsGarageCount > this.GARAGE_PAGE_LIMIT) {
                this.nextPageButtonElement.disabled = false;
            }

            if (carsGarageCount > this.ZERO_NUMBER) {
                this.garageController.enableRaceStartButton();
            }

            this.garageController.clearCreateInputValues();
            await this.setGaragePageNumber(this.garageCurrentPage);
        });

        this.raceStartButtonElement.addEventListener('click', async () => {
            this.garageController.disableControllerButtons();
            this.garageController.disableCreateInput();
            this.disablePageControllerButtons();
            this.raceMembersList.forEach((raceMember) => raceMember.disableAllButtons());
            const raceResult = await Promise.all(
                this.raceMembersList.map((raceMember) => raceMember.startRaceMoveCar()),
            );

            this.raceResetButtonElement.disabled = false;

            const finallyRaceResult = raceResult.reduce<StartMoveResultType[]>(
                (accum, raceMember): StartMoveResultType[] => {
                    if (accum.length === this.ZERO_NUMBER && raceMember) {
                        accum.push(raceMember);
                    }

                    if (raceMember && raceMember.roadTime < accum[0].roadTime) {
                        accum.splice(0, 1, raceMember);
                    }

                    return accum;
                },
                [],
            );

            if (finallyRaceResult.length !== this.ZERO_NUMBER) {
                const winnerData = finallyRaceResult[this.ZERO_NUMBER];
                await this.createWinner(winnerData);
                this.showWinnerPopup(winnerData.roadTime, winnerData.carName);
            } else {
                this.showWinnerPopup();
            }
        });

        this.raceResetButtonElement.addEventListener('click', () => {
            this.raceMembersList.forEach((raceMember) => raceMember.setCarToInitialPlace());
            this.raceMembersList.forEach((raceMember) => raceMember.enableAllButtons());
            this.garageController.enableControllerButtons();
            this.garageController.enableCreateInput();
            this.raceResetButtonElement.disabled = true;
            this.enablePageControllerButtons();
        });

        this.updateButtonElement.addEventListener('click', async () => {
            await this.updateCar();
        });

        this.generateCarsButtonElement.addEventListener('click', async () => {
            await this.generateNewCars();
        });
    }

    private compareWinnerResult(
        previousTime: number,
        currentTime: number,
        winsCount: number,
    ): CompareWinnerResultType {
        const currentWinnerTime = previousTime < currentTime ? previousTime : currentTime;
        const currentWinnerWins = winsCount + this.DELTA_INDEX_NUMBER;

        return {time: currentWinnerTime, winsCount: currentWinnerWins};
    }

    private async createWinner(winnerPropsData: WinnerPropsDataType): Promise<void> {
        const winnerId = winnerPropsData.carId;
        const winnerTime = winnerPropsData.roadTime;

        try {
            const previousWinnerResult = await this.winnersApi.getWinner(winnerId);
            const nestWinnerResult = this.compareWinnerResult(
                previousWinnerResult.time,
                winnerPropsData.roadTime,
                previousWinnerResult.wins,
            );
            await this.winnersApi.updateWinner(
                winnerId,
                nestWinnerResult.winsCount,
                nestWinnerResult.time,
            );
        } catch (error) {
            await this.winnersApi.createWinner(winnerId, this.FIRST_WIN_NUMBER, winnerTime);
        }
    }

    private async generateNewCars(): Promise<void> {
        const newCarDataList: NewCarDataType[] = [];
        const beforeGenerateCarsCount = await this.carGarageApi.getCountCars();

        for (let generateIndex = 0; generateIndex < this.GARAGE_GENERATE_CARS_COUNT; generateIndex += this.DELTA_INDEX_NUMBER) {
            const newCarName = getRandomCarName();
            const newCarColor = generateRandomColor();
            newCarDataList.push({name: newCarName, color: newCarColor});
        }

        newCarDataList.forEach(async (newCarData) => {
            await this.carGarageApi.createCar(newCarData.name, newCarData.color);
        });

        const carsGarageCount = await this.carGarageApi.getCountCars();
        this.setGarageCarsCount(carsGarageCount);

        if (beforeGenerateCarsCount < this.GARAGE_PAGE_LIMIT) {
            await this.getCars();
        }
    }

    private disablePageControllerButtons(): void {
        this.prevPageButtonElement.disabled = true;
        this.nextPageButtonElement.disabled = true;
    }

    private async enablePageControllerButtons(): Promise<void> {
        const carsGarageCount = await this.carGarageApi.getCountCars();

        if (this.garageCurrentPage === this.FIRST_PAGE) {
            this.prevPageButtonElement.disabled = true;
        } else {
            this.prevPageButtonElement.disabled = false;
        }

        if (this.garageCurrentPage === Math.ceil(carsGarageCount / this.GARAGE_PAGE_LIMIT)) {
            this.nextPageButtonElement.disabled = true;
        } else {
            this.nextPageButtonElement.disabled = false;
        }
    }

    private disableAllSelectButtons(): void {
        this.raceMembersList.forEach((raceMember: EquipmentCar) => raceMember.disableSelectButton());
    }

    private async updateCar(): Promise<void> {
        const updateCarId = this.garageController.getUpdateSelectCarId();
        const updateValues = this.garageController.getUpdateCarValues();
        const updateCarName = updateValues.textValue;
        const updateColorValue = updateValues.colorValue;

        if (updateCarName === '') {
            this.garageController.setUpdateInputFailedState();

            return;
        }

        await this.carGarageApi.updateCar(updateCarId, updateCarName, updateColorValue);

        this.raceMembersList.forEach((raceMember) => {
            const raceMemberId = raceMember.getCarId();

            if (raceMemberId === updateCarId) {
                raceMember.setCarName(updateCarName);
                raceMember.setCarColor(updateColorValue);
                raceMember.deleteSelectedState();
            }
        });

        this.updateButtonElement.disabled = true;
        this.createButtonElement.disabled = false;
        this.raceStartButtonElement.disabled = false;
        this.garageController.clearUpdateInputValues();

        this.raceMembersList.forEach((raceMember: EquipmentCar) => raceMember.enableSelectButton());
        this.garageController.disableUpdateInput();
        this.garageController.enableCreateInput();
        this.generateCarsButtonElement.disabled = false;
    }

    private showWinnerPopup(time?: number, carName?: string): void {
        const winnerPopupBlock: HTMLElement = createElement({
            tag: 'div',
            classNames: ['winner__popup', `popup`],
        });

        const winnerPopupMessage: HTMLElement = createElement({
            tag: 'span',
            classNames: ['popup__message'],
            text: `The Winner is "${carName}".
            Time - ${time?.toFixed(2)} sec.`,
        });

        const winnerPopupButton: HTMLButtonElement = createElement({
            tag: 'button',
            classNames: ['popup__button'],
            text: 'x',
        });

        if (!time && !carName) {
            winnerPopupMessage.textContent = this.EMPTY_WINNER_MESSAGE;
        }

        winnerPopupButton.addEventListener('click', () => {
            this.removeWinnerMessage();
        });

        winnerPopupBlock.append(winnerPopupMessage, winnerPopupButton);

        this.popupElement = winnerPopupBlock;
        this.garageElement.append(winnerPopupBlock);
        this.raceResetButtonElement.disabled = true;
    }

    private removeWinnerMessage(): void {
        if (this.popupElement) {
            this.popupElement.remove();
            this.raceResetButtonElement.disabled = false;
        }
    }

    private async setGaragePageNumber(value: number): Promise<void> {
        const carsGarageCount = await this.carGarageApi.getCountCars();
        const garagePagesCount = Math.ceil(carsGarageCount / this.GARAGE_PAGE_LIMIT);

        this.garagePageNumberElement.textContent = `Page: ${value}/${garagePagesCount}`;
    }
}
