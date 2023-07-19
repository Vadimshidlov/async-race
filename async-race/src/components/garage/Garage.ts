import { CarGarage, GetCarsType } from '../../services/CarGarage';
import { StartMoveResultType } from '../cars/car';
import { EquipmentCar } from '../cars/EquipmentCar';
import { CreateButtonElement } from '../create-input/create-button';
import createElement from '../element/element-creator';
import { GarageController } from '../GarageController/GarageController';
import { getRandomCarName } from '../genereteCars/generateCarName';
import { generateColor } from '../genereteCars/generateColor';

export type NewCarDataType = {
  name: string;
  color: string;
};

export class Garage {
  private garage: HTMLElement = createElement({
    tag: 'div',
    classNames: ['garage'],
    text: '',
  });

  private readonly raceParty: EquipmentCar[] = [];

  private carGarageApi = new CarGarage();

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

  // private garageCurrentPage = 1;
  private garageCurrentPage;

  private prevPageButtonElement: HTMLButtonElement = new CreateButtonElement('Prev').getElement();

  private nextPageButtonElement: HTMLButtonElement = new CreateButtonElement('Next').getElement();

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

    const garageTitle = createElement({
      tag: 'h1',
      classNames: ['block-garage__title'],
      text: 'GARAGE',
    });

    // const garageCount = createElement({
    //   tag: 'span',
    //   classNames: ['block-garage__count'],
    //   text: '#',
    // });

    const garagePageController = createElement({
      tag: 'div',
      classNames: ['block-garage__page-controller'],
      text: '',
    });

    this.prevPageButtonElement.disabled = true;
    this.nextPageButtonElement.disabled = true;
    garagePageController.append(this.prevPageButtonElement, this.nextPageButtonElement);

    garageInfo.append(garageTitle, this.garageCarsCount);

    // const garageItems = createElement({
    //   tag: 'div',
    //   classNames: ['garage'],
    //   text: '',
    // });

    // garageBlock.append(this.garageControllerElement, garageInfo);
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
        deletaCarsCallback: this.deleteCarCallback.bind(this),
      };

      const equipmentCar = new EquipmentCar(equipmentProps);
      const car = equipmentCar.getCar();
      this.raceParty.push(equipmentCar);
      this.garage.append(car);
    }
  }

  private addEventListeners(): void {
    this.nextPageButtonElement.addEventListener('click', async () => {
      console.log('Next btn before', this.garageCurrentPage);
      if (this.garageCurrentPage === 1) {
        this.prevPageButtonElement.disabled = false;
      }
      const carsGarageCount = await this.carGarageApi.getCountCars();
      this.garageCurrentPage += 1;
      this.getCars(this.garageCurrentPage);
      console.log('Next btn after', this.garageCurrentPage);
      console.log('pagesCount', Math.ceil(carsGarageCount / 7));

      if (this.garageCurrentPage === Math.ceil(carsGarageCount / 7)) {
        this.nextPageButtonElement.disabled = true;
      }
    });

    this.prevPageButtonElement.addEventListener('click', async () => {
      console.log('Prev btn');

      if (this.garageCurrentPage !== 1) {
        const carsGarageCount = await this.carGarageApi.getCountCars();
        if (this.garageCurrentPage === Math.ceil(carsGarageCount / 7)) {
          this.nextPageButtonElement.disabled = false;
        }

        this.garageCurrentPage -= 1;
        if (this.garageCurrentPage === 1) {
          this.prevPageButtonElement.disabled = true;
        }
        // this.getCars(this.garageCurrentPage === 0 ? 1 : this.garageCurrentPage);
        this.getCars(this.garageCurrentPage);
      }
    });

    this.createButtonElement.addEventListener('click', async () => {
      const newCarData = this.garageController.getCreateCarValues();
      const responseNewCarData = await this.carGarageApi.createCar(
        newCarData.textValue,
        newCarData.colorValue,
      );
      const carsGarageCount = await this.carGarageApi.getCountCars();
      this.setGarageCarsCount(carsGarageCount);
      if (carsGarageCount > 7) {
        this.nextPageButtonElement.disabled = false;
      }

      this.addSingleCar(responseNewCarData);
      // this.garage.innerHTML = '';
      // this.getCars(this.garageCurrentPage);
      this.garageController.clearCreateInputValues();
    });

    this.raceStartButtonElement.addEventListener('click', async () => {
      this.garageController.disableControllerButtons();
      this.raceParty.forEach((raceMember) => raceMember.disableAllButtons());
      const raceResult = await Promise.all(
        this.raceParty.map((raceMember) => raceMember.startRaceMoveCar()),
      );
      // this.raceParty.forEach((raceMember) => raceMember.enableAllButtons());
      // this.garageController.enableControllerButtons();
      this.raceResetButtonElement.disabled = false;

      const finallyRaсeResult = raceResult.reduce<StartMoveResultType[]>(
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

      console.log(...finallyRaсeResult);
    });

    this.raceResetButtonElement.addEventListener('click', () => {
      console.log('raceResetButtonClick');
      this.raceParty.forEach((raceMember) => raceMember.setCarToInitialPlace());
      this.raceParty.forEach((raceMember) => raceMember.enableAllButtons());
      this.garageController.enableControllerButtons();
      this.raceResetButtonElement.disabled = true;
    });

    this.updateButtonElement.addEventListener('click', async () => {
      await this.updateCar();
      console.log(`newCarName`, getRandomCarName());
      console.log(`newCarColor`, generateColor());
    });

    this.generateCarsButtonElement.addEventListener('click', async () => {
      await this.generateNewCars();
    });
  }

  private async generateNewCars(): Promise<void> {
    const newCarDataList: NewCarDataType[] = [];
    const beforGenerateCarCount = await this.carGarageApi.getCountCars();

    for (let i = 0; i < 100; i += 1) {
      const newCarName = getRandomCarName();
      const newCarColor = generateColor();
      newCarDataList.push({ name: newCarName, color: newCarColor });
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

  public async deleteCarCallback(): Promise<void> {
    // console.log('call deleteCarCallback()');
    // console.log(this.garageCurrentPage, `currPage frome delete car cb`);
    await this.getCars(this.garageCurrentPage);
  }

  public async getCars(page = this.garageCurrentPage): Promise<void> {
    const pageCars = await this.carGarageApi.getCars(page);
    this.raceParty.length = 0;
    this.garage.innerHTML = '';

    pageCars.forEach((carData) => {
      // console.log(carData, `carData`);
      const equipmentProps = {
        carColor: carData.color,
        carName: carData.name,
        id: carData.id,
        garageController: this.garageController,
        deletaCarsCallback: this.getCars.bind(this),
        // deletaCarsCallback: this.deleteCarCallback.bind(this),
      };

      const equipmentCar = new EquipmentCar(equipmentProps);
      const car = equipmentCar.getCar();
      this.raceParty.push(equipmentCar);
      this.garage.append(car);
    });

    const carsGarageCount = await this.carGarageApi.getCountCars();
    if (carsGarageCount <= 7) {
      this.nextPageButtonElement.disabled = true;
    }
    this.setGarageCarsCount(carsGarageCount);
  }

  public setGarageCarsCount(count: number): void {
    this.garageCarsCount.textContent = `(${count}) Cars`;
  }

  //   private generateNewCars():void{

  //   }

  private async updateCar(): Promise<void> {
    const updateValues = this.garageController.getUpdateCarValues();
    const updateCarId = this.garageController.getUpdateSelectCarId();
    // const updateCarName = this.garageController.getUpdateSelectCarName()
    const updateCarName = updateValues.textValue;
    const updateColorValue = updateValues.colorValue;

    const updateCarResponse = await this.carGarageApi.updateCar(
      updateCarId,
      updateCarName,
      updateColorValue,
    );

    await this.carGarageApi.createCar(updateCarResponse.name, updateCarResponse.color);

    this.raceParty.forEach((raceMember) => {
      const raceMemberId = raceMember.getCarId();

      if (raceMemberId === updateCarId) {
        raceMember.setCarName(updateCarName);
        raceMember.setCarColor(updateColorValue);
        raceMember.deleteSelectedState();
      }
    });

    this.updateButtonElement.disabled = true;
    this.garageController.clearUpdateInputValues();
  }

  public getGarageCurrentPage(): number {
    return this.garageCurrentPage;
  }
}
