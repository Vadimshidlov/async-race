import {GarageService, GetCarsType} from '../../services/GarageService';
import {WinnersService} from '../../services/WinnersService';
import {StartMoveResultType} from '../cars/car';
import {EquipmentCar} from '../cars/EquipmentCar';
import {CreateButtonElement} from '../create-input/create-button';
import createElement from '../element/element-creator';
import {GarageController} from '../GarageController/GarageController';
import {getRandomCarName} from '../genereteCars/generateCarName';
import {generateColor} from '../genereteCars/generateColor';

export type NewCarDataType = {
    name: string;
    color: string;
};

export type WinnerPropsDataType = {
    carId: number;
    carName: string;
    roadTime: number;
};

export class Garage {
    private garage: HTMLElement = createElement({
        tag: 'div',
        classNames: ['garage'],
        text: '',
    });

    private readonly raceParty: EquipmentCar[] = [];

    private carGarageApi = new GarageService();

    private garageController = new GarageController();

    private garageControllerElement = this.garageController.getControllerHtml();

    private createButtonElement = this.garageController.getCreateButton();

    private raceStartButtonElement = this.garageController.getRaceStartButton();

    private raceResetButtonElement = this.garageController.getRaceResetButton();

    private updateButtonElement = this.garageController.getUpdateCarButton();

    private generateCarsButtonElement = this.garageController.getGenerateCarButton();

    private garageCarsCount = createElement({
        tag: 'span',
        classNames: ['block-garage__count'],
        text: '',
    });

    private garagePageNumber = createElement({
        tag: 'span',
        classNames: ['block-garage__pages'],
        text: 'Page: 1',
    });

    private garageCurrentPage;

    private prevPageButtonElement: HTMLButtonElement = new CreateButtonElement('Prev').getElement();

    private nextPageButtonElement: HTMLButtonElement = new CreateButtonElement('Next').getElement();

    private winnerService = new WinnersService();

    private popupMessage: HTMLElement | null = null;

    constructor(garageCurrentPage: number) {
        this.garageCurrentPage = garageCurrentPage;
        this.getCars();
        this.addEventListeners();
    }

    public getGarageHtml(): HTMLElement {
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

        // const garageTitle = createElement({
        //     tag: 'h1',
        //     classNames: ['block-garage__title'],
        //     text: 'GARAGE',
        // });

        const garagePageController = createElement({
            tag: 'div',
            classNames: ['block-garage__page-controller'],
            text: '',
        });

        this.prevPageButtonElement.disabled = true;
        this.nextPageButtonElement.disabled = true;
        garagePageController.append(this.prevPageButtonElement, this.nextPageButtonElement);

        garageInfo.append(/* garageTitle, */ this.garageCarsCount, this.garagePageNumber);

        garageBlock.append(
            this.garageControllerElement,
            garageInfo,
            garageInfo,
            this.garage,
            garagePageController,
        );

        return garageBlock;
    }

    private async addSingleCar(newCarData: GetCarsType): Promise<void> {
        const carsPageCount = (await this.carGarageApi.getCars(this.garageCurrentPage)).length;
        if (carsPageCount <= 7) {
            const equipmentProps = {
                carColor: newCarData.color,
                carName: newCarData.name,
                id: newCarData.id,
                garageController: this.garageController,
                deleteCarsCallback: this.deleteCarCallback.bind(this),
                selectCarCallback: this.disableAllSelectButtons.bind(this),
            };

            const equipmentCar = new EquipmentCar(equipmentProps);
            const car = equipmentCar.getCar();
            this.raceParty.push(equipmentCar);
            this.garage.append(car);
        }
    }

    private addEventListeners(): void {
        this.nextPageButtonElement.addEventListener('click', async () => {
            if (this.garageCurrentPage === 1) {
                this.prevPageButtonElement.disabled = false;
            }
            const carsGarageCount = await this.carGarageApi.getCountCars();
            this.garageCurrentPage += 1;
            this.getCars(this.garageCurrentPage);

            if (this.garageCurrentPage === Math.ceil(carsGarageCount / 7)) {
                this.nextPageButtonElement.disabled = true;
            }
        });

        this.prevPageButtonElement.addEventListener('click', async () => {
            if (this.garageCurrentPage !== 1) {
                const carsGarageCount = await this.carGarageApi.getCountCars();
                if (this.garageCurrentPage === Math.ceil(carsGarageCount / 7)) {
                    this.nextPageButtonElement.disabled = false;
                }

                this.garageCurrentPage -= 1;
                if (this.garageCurrentPage === 1) {
                    this.prevPageButtonElement.disabled = true;
                }
                this.getCars(this.garageCurrentPage);
            }
        });

        this.createButtonElement.addEventListener('click', async () => {
            // this.garageController.getCreateInput().required = true;
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
            if (carsGarageCount <= 7) {
                await this.addSingleCar(responseNewCarData);
            }

            if (carsGarageCount > 7) {
                this.nextPageButtonElement.disabled = false;
            }

            const countGarageCars = await this.carGarageApi.getCountCars();
            if (countGarageCars > 0) {
                this.garageController.enableRaceStartButton();
            }
            // this.garage.innerHTML = '';
            // this.getCars(this.garageCurrentPage);
            this.garageController.clearCreateInputValues();
        });

        this.raceStartButtonElement.addEventListener('click', async () => {
            this.garageController.disableControllerButtons();
            this.garageController.disableCreateInput();
            this.disablePageControllerButtons()
            this.raceParty.forEach((raceMember) => raceMember.disableAllButtons());
            const raceResult = await Promise.all(
                this.raceParty.map((raceMember) => raceMember.startRaceMoveCar()),
            );
            // this.raceParty.forEach((raceMember) => raceMember.enableAllButtons());
            // this.garageController.enableControllerButtons();
            this.raceResetButtonElement.disabled = false;

            const finallyRaceResult = raceResult.reduce<StartMoveResultType[]>(
                (accum, raceMember): StartMoveResultType[] => {
                    if (accum.length === 0 && raceMember) {
                        accum.push(raceMember);
                    }

                    if (raceMember && raceMember.roadTime < accum[0].roadTime) {
                        accum.splice(0, 1, raceMember);
                    }

                    return accum;
                },
                [],
            );

            console.log(...finallyRaceResult);
            if (finallyRaceResult.length !== 0) {
                const winnerData = finallyRaceResult[0];
                await this.createWinner(winnerData);
                this.showWinnerPopup(winnerData.roadTime, winnerData.carName);
            } else {
                this.showWinnerPopup();
            }
        });

        this.raceResetButtonElement.addEventListener('click', () => {
            console.log('raceResetButtonClick');
            this.raceParty.forEach((raceMember) => raceMember.setCarToInitialPlace());
            this.raceParty.forEach((raceMember) => raceMember.enableAllButtons());
            this.garageController.enableControllerButtons();
            this.garageController.enableCreateInput();
            this.raceResetButtonElement.disabled = true;
            this.enablePageControllerButtons();
        });

        this.updateButtonElement.addEventListener('click', async () => {
            await this.updateCar();
            /* this.raceParty.forEach((raceMember) => raceMember.enableSelectButton());
            this.garageController.disableUpdateInput();
            this.garageController.enableCreateInput();
            this.generateCarsButtonElement.disabled = false; */
        });

        this.generateCarsButtonElement.addEventListener('click', async () => {
            await this.generateNewCars();
        });
    }

    private async createWinner(winnerPropsData: WinnerPropsDataType): Promise<void> {
        const winnerId = winnerPropsData.carId;
        const winnerTime = winnerPropsData.roadTime;

        try {
            const previusWinnerResult = await this.winnerService.getWinner(winnerId);
            const currentWinnerTime =
                previusWinnerResult.time < winnerPropsData.roadTime
                    ? previusWinnerResult.time
                    : winnerPropsData.roadTime;
            const currentWinnerWins = previusWinnerResult.wins + 1;

            const resultCreateWinner = await this.winnerService.updateWinner(
                winnerId,
                currentWinnerWins,
                currentWinnerTime,
            );
            // console.log(resultCreateWinner);
        } catch (error) {
            this.winnerService.createWinner(winnerId, 1, winnerTime);
        }
    }

    private async generateNewCars(): Promise<void> {
        const newCarDataList: NewCarDataType[] = [];
        const beforGenerateCarCount = await this.carGarageApi.getCountCars();

        for (let i = 0; i < 100; i += 1) {
            const newCarName = getRandomCarName();
            const newCarColor = generateColor();
            newCarDataList.push({name: newCarName, color: newCarColor});
        }

        newCarDataList.forEach(async (newCarData) => {
            await this.carGarageApi.createCar(newCarData.name, newCarData.color);
        });

        const carsGarageCount = await this.carGarageApi.getCountCars();
        this.setGarageCarsCount(carsGarageCount);
        if (beforGenerateCarCount < 7) {
            this.getCars();
        }
    }

    private disablePageControllerButtons(): void {
        this.prevPageButtonElement.disabled = true;
        this.nextPageButtonElement.disabled = true;
    }

    private async enablePageControllerButtons(): Promise<void> {
        const carsGarageCount = await this.carGarageApi.getCountCars();
        if (this.garageCurrentPage === 1) {
            this.prevPageButtonElement.disabled = true;
        } else {
            this.prevPageButtonElement.disabled = false;
        }

        if (this.garageCurrentPage === Math.ceil(carsGarageCount / 7)) {
            this.nextPageButtonElement.disabled = true;
        } else {
            this.nextPageButtonElement.disabled = false;
        }
    }


    public async deleteCarCallback(): Promise<void> {
        await this.getCars(this.garageCurrentPage);
    }

    public async getCars(page = this.garageCurrentPage): Promise<void> {
        this.setGaragePageNumber(page)
        const pageCars = await this.carGarageApi.getCars(page);
        this.raceParty.length = 0;
        this.garage.innerHTML = '';

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
            this.raceParty.push(equipmentCar);
            this.garage.append(car);
        });

        const carsGarageCount = await this.carGarageApi.getCountCars();
        if (carsGarageCount > 7 && this.garageCurrentPage === 1) {
            console.log('1234');
            this.prevPageButtonElement.disabled = true;
            this.nextPageButtonElement.disabled = false;
        }
        /* if (carsGarageCount <= 7) {
          this.nextPageButtonElement.disabled = true;
        } */
        this.setGarageCarsCount(carsGarageCount);
    }

    private disableAllSelectButtons(): void {
        this.raceParty.forEach((raceMember) => raceMember.disableSelectButton());
    }

    public setGarageCarsCount(count: number): void {
        this.garageCarsCount.textContent = `Garage: (${count}) Cars`;
    }

    private async updateCar(): Promise<void> {
        const updateValues = this.garageController.getUpdateCarValues();
        const updateCarId = this.garageController.getUpdateSelectCarId();
        const updateCarName = updateValues.textValue;
        const updateColorValue = updateValues.colorValue;

        if (updateCarName === '') {
            this.garageController.setUpdateInputFailedState();
            return;
        }

        const updateCarResponse = await this.carGarageApi.updateCar(
            updateCarId,
            updateCarName,
            updateColorValue,
        );

        // await this.carGarageApi.createCar(updateCarResponse.name, updateCarResponse.color);

        this.raceParty.forEach((raceMember) => {
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

        this.raceParty.forEach((raceMember) => raceMember.enableSelectButton());
        this.garageController.disableUpdateInput();
        this.garageController.enableCreateInput();
        this.generateCarsButtonElement.disabled = false;
    }

    public getGarageCurrentPage(): number {
        return this.garageCurrentPage;
    }

    private showWinnerPopup(time?: number, carName?: string): void {
        const winnerPopupBlock: HTMLElement = createElement({
            tag: 'div',
            classNames: ['winner__popup', `popup`],
            text: '',
        });

        const winnerPopupMessage: HTMLElement = createElement({
            tag: 'span',
            classNames: ['popup__mesage'],
            text: `The Winner is ${carName}.
            Time - ${time?.toFixed(2)} sec.`,
        });

        const winnerPopupButton: HTMLButtonElement = createElement({
            tag: 'button',
            classNames: ['popup__button'],
            text: 'x',
        });

        if (!time && !carName) {
            winnerPopupMessage.textContent = `Ooops :(
        There is no winner...
        `;
        }

        winnerPopupButton.addEventListener('click', () => {
            this.removeWinnerMessage();
            // this.enablePageControllerButtons();
        });

        winnerPopupBlock.append(winnerPopupMessage, winnerPopupButton);

        this.popupMessage = winnerPopupBlock;
        this.garage.append(winnerPopupBlock);
        this.raceResetButtonElement.disabled = true;
    }

    private removeWinnerMessage(): void {
        if (this.popupMessage) {
            this.popupMessage.remove();
            this.raceResetButtonElement.disabled = false;
        }
    }

    private setGaragePageNumber(value: number): void {
        this.garagePageNumber.textContent = `Page: ${value}`
    }
}
