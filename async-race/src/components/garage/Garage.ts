import { CarGarage, GetCarsType } from '../../services/CarGarage';
import { StartMoveResultType } from '../cars/car';
import { EquipmentCar } from '../cars/car-field';
import { CreateButtonElement } from '../create-input/create-button';
import createElement from '../element/element-creator';
import { GarageController } from '../GarageController/GarageController';

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

  private raceStartButtonElement = this.garageController.getraceStartButton();

  private garageCarsCount = createElement({
    tag: 'span',
    classNames: ['block-garage__count'],
    text: '#',
  });

  private garageCurrentPage = 1;

  private nextPageButtonElement: HTMLButtonElement = new CreateButtonElement('Next').getElement();

  private prevPageButtonElement: HTMLButtonElement = new CreateButtonElement('Prev').getElement();

  constructor() {
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
    if (carsPageCount < 7) {
      const equipmentProps = {
        carColor: newCarData.color,
        carName: newCarData.name,
        id: newCarData.id,
      };

      const equipmentCar = new EquipmentCar(equipmentProps);
      const car = equipmentCar.getCar();
      this.raceParty.push(equipmentCar);
      this.garage.append(car);
    }
  }

  private addEventListeners(): void {
    this.nextPageButtonElement.addEventListener('click', async () => {
      this.garageCurrentPage += 1;
      this.getCars(this.garageCurrentPage);
    });

    this.prevPageButtonElement.addEventListener('click', async () => {
      this.garageCurrentPage -= 1;
      this.getCars(this.garageCurrentPage === 0 ? 1 : this.garageCurrentPage);
    });

    this.createButtonElement.addEventListener('click', async () => {
      const newCarData = this.garageController.getCreateCarValues();
      const responseNewCarData = await this.carGarageApi.createCar(
        newCarData.textValue,
        newCarData.colorValue,
      );
      const carsGarageCount = await this.carGarageApi.getCountCars();
      this.setGarageCarsCount(carsGarageCount);
      this.addSingleCar(responseNewCarData);
      // this.garage.innerHTML = '';
      // this.getCars(this.garageCurrentPage);
      this.garageController.clearCreateInputValues();
    });

    this.raceStartButtonElement.addEventListener('click', async () => {
      this.garageController.disableControllerButtons();
      this.raceParty.forEach((raceMember) => raceMember.disableAllButtons());
      const raceResult = await Promise.all(
        this.raceParty.map((raceMember) => raceMember.startMoveCar()),
      );
      this.raceParty.forEach((raceMember) => raceMember.enableAllButtons());
      this.garageController.enableControllerButtons();

      const finallyRaseResult = raceResult.reduce<StartMoveResultType[]>(
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

      console.log(...finallyRaseResult);

      // const filterRaceResult = raceResult.filter((raceMember) => !!raceMember);
      // const filterRaceResult = raceResult.reduce<StartMoveResultType>((accum: StartMoveResultType, raceMember: void | StartMoveResultType, index: number) => {}, {});

      // console.log(raceResult.filter((raceMember) => !!raceMember));
    });
  }

  public async getCars(page = 1): Promise<void> {
    const pageCars = await this.carGarageApi.getCars(page);
    this.raceParty.length = 0;
    this.garage.innerHTML = '';

    pageCars.forEach((carData) => {
      console.log(carData, `carData`);
      const equipmentProps = {
        carColor: carData.color,
        carName: carData.name,
        id: carData.id,
      };

      const equipmentCar = new EquipmentCar(equipmentProps);
      const car = equipmentCar.getCar();
      this.raceParty.push(equipmentCar);
      this.garage.append(car);
    });

    const carsGarageCount = await this.carGarageApi.getCountCars();
    this.setGarageCarsCount(carsGarageCount);
  }

  public setGarageCarsCount(count: number): void {
    this.garageCarsCount.textContent = `#${count}`;
  }
}
