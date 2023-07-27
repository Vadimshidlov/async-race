import { GarageService, GetCarsType } from '../../services/GarageService';
import { WinnersService } from '../../services/WinnersService';
import { StartMoveResultType } from '../cars/Car';
import { EquipmentCar } from '../cars/EquipmentCar';
import { GarageController } from '../GarageController/GarageController';
import { getRandomCarName } from '../genereteCars/generateCarName';
import { generateColor } from '../genereteCars/generateColor';
import { createButtonElement } from '../create-input/createButtonElement';
import createElement from '../element/createElement';

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
  private GARAGE_ELEMENT: HTMLElement = createElement({
    tag: 'div',
    classNames: ['garage'],
    text: '',
  });

  private readonly raceMembersList: EquipmentCar[] = [];

  private CAR_GARAGE_API = new GarageService();

  private GARAGE_CONTROLLER = new GarageController();

  private GARAGE_CONTROLLER_ELEMENT = this.GARAGE_CONTROLLER.getControllerHtml();

  private CREATE_BUTTON_ELEMENT = this.GARAGE_CONTROLLER.getCreateButton();

  private RACE_START_BUTTON_ELEMENT = this.GARAGE_CONTROLLER.getRaceStartButton();

  private RACE_RESET_BUTTON_ELEMENT = this.GARAGE_CONTROLLER.getRaceResetButton();

  private UPDATE_BUTTON_ELEMENT = this.GARAGE_CONTROLLER.getUpdateCarButton();

  private GENERATE_CARS_BUTTON_ELEMENT = this.GARAGE_CONTROLLER.getGenerateCarButton();

  private GARAGE_CARS_COUNT_BLOCK = createElement({
    tag: 'span',
    classNames: ['block-garage__count'],
    text: '',
  });

  private GARAGE_PAGE_NUMBER_ELEMENT = createElement({
    tag: 'span',
    classNames: ['block-garage__pages'],
    text: 'Page: 1',
  });

  private GARAGE_CURRENT_PAGE;

  private PREV_PAGE_BUTTON_ELEMENT: HTMLButtonElement = createButtonElement('Prev');

  private NEXT_PAGE_BUTTON_ELEMENT: HTMLButtonElement = createButtonElement('Next');

  private WINNERS_API = new WinnersService();

  private POPUP_ELEMENT: HTMLElement | null = null;

  private DELTA_INDEX_NUMBER = 1;

  private GARAGE_PAGE_LIMIT = 7;

  private GARAGE_GENERATE_CARS_COUNT = 100;

  private readonly EMPTY_WINNER_MESSAGE = `Ooops :(
        There is no winner...
        `;

  constructor(garageCurrentPage: number) {
    this.GARAGE_CURRENT_PAGE = garageCurrentPage;
    this.getCars();
    this.addEventListeners();
  }

  public getGarageHtml(): HTMLElement {
    const GARAGE_BLOCK = createElement({
      tag: 'section',
      classNames: ['garage__block', 'block-garage'],
      text: '',
    });

    const GARAGE_INFO = createElement({
      tag: 'div',
      classNames: ['block-garage__info'],
      text: '',
    });

    const GARAGE_PAGE_CONTROLLER = createElement({
      tag: 'div',
      classNames: ['block-garage__page-controller'],
      text: '',
    });

    this.PREV_PAGE_BUTTON_ELEMENT.disabled = true;
    this.NEXT_PAGE_BUTTON_ELEMENT.disabled = true;
    GARAGE_PAGE_CONTROLLER.append(this.PREV_PAGE_BUTTON_ELEMENT, this.NEXT_PAGE_BUTTON_ELEMENT);

    const GARAGE_PAGE_CONTROLLER_WRAPPER = createElement({
      tag: 'div',
      classNames: ['page-controller__wrapper'],
      text: '',
    });

    GARAGE_PAGE_CONTROLLER_WRAPPER.append(GARAGE_PAGE_CONTROLLER);

    GARAGE_INFO.append(
      this.GARAGE_CARS_COUNT_BLOCK,
      this.GARAGE_PAGE_NUMBER_ELEMENT,
      GARAGE_PAGE_CONTROLLER_WRAPPER,
    );

    const GARAGE_PAGE_HEADER = createElement({
      tag: 'div',
      classNames: ['block-garage__header'],
      text: '',
    });

    GARAGE_PAGE_HEADER.append(this.GARAGE_CONTROLLER_ELEMENT, GARAGE_INFO);

    GARAGE_BLOCK.append(GARAGE_PAGE_HEADER, this.GARAGE_ELEMENT);

    return GARAGE_BLOCK;
  }

  public async getCars(page = this.GARAGE_CURRENT_PAGE): Promise<void> {
    const CARS_GARAGE_COUNT = await this.CAR_GARAGE_API.getCountCars();

    await this.setGaragePageNumber(page);
    const PAGE_CARS = await this.CAR_GARAGE_API.getCars(page);
    this.raceMembersList.length = 0;
    this.GARAGE_ELEMENT.innerHTML = '';

    PAGE_CARS.forEach((carData) => {
      const EQUIPMENT_PROPS = {
        carColor: carData.color,
        carName: carData.name,
        id: carData.id,
        garageController: this.GARAGE_CONTROLLER,
        deleteCarsCallback: this.getCars.bind(this),
        selectCarCallback: this.disableAllSelectButtons.bind(this),
      };

      const EQUIPMENT_CAR = new EquipmentCar(EQUIPMENT_PROPS);
      const CAR = EQUIPMENT_CAR.getCar();
      this.raceMembersList.push(EQUIPMENT_CAR);
      this.GARAGE_ELEMENT.append(CAR);
    });

    if (CARS_GARAGE_COUNT > this.GARAGE_PAGE_LIMIT && this.GARAGE_CURRENT_PAGE === 1) {
      this.PREV_PAGE_BUTTON_ELEMENT.disabled = true;
      this.NEXT_PAGE_BUTTON_ELEMENT.disabled = false;
    }

    if (
      this.GARAGE_CURRENT_PAGE === Math.ceil(CARS_GARAGE_COUNT / this.GARAGE_PAGE_LIMIT) + 1 &&
      this.raceMembersList.length === 0
    ) {
      this.GARAGE_CURRENT_PAGE -= 1;
      await this.getCars();
    }

    this.setGarageCarsCount(CARS_GARAGE_COUNT);
  }

  public setGarageCarsCount(count: number): void {
    this.GARAGE_CARS_COUNT_BLOCK.textContent = `Garage: (${count}) Cars`;
  }

  public getGarageCurrentPage(): number {
    return this.GARAGE_CURRENT_PAGE;
  }

  private async addSingleCar(newCarData: GetCarsType): Promise<void> {
    const CARS_PAGE_COUNT = (await this.CAR_GARAGE_API.getCars(this.GARAGE_CURRENT_PAGE)).length;

    if (CARS_PAGE_COUNT <= this.GARAGE_PAGE_LIMIT) {
      const EQUIPMENT_PROPS = {
        carColor: newCarData.color,
        carName: newCarData.name,
        id: newCarData.id,
        garageController: this.GARAGE_CONTROLLER,
        deleteCarsCallback: this.getCars.bind(this),
        selectCarCallback: this.disableAllSelectButtons.bind(this),
      };

      const EQUIPMENT_CAR = new EquipmentCar(EQUIPMENT_PROPS);
      const CAR = EQUIPMENT_CAR.getCar();
      this.raceMembersList.push(EQUIPMENT_CAR);
      this.GARAGE_ELEMENT.append(CAR);
    }
  }

  private addEventListeners(): void {
    this.NEXT_PAGE_BUTTON_ELEMENT.addEventListener('click', async () => {
      if (this.GARAGE_CURRENT_PAGE === 1) {
        this.PREV_PAGE_BUTTON_ELEMENT.disabled = false;
      }

      const CARS_GARAGE_COUNT = await this.CAR_GARAGE_API.getCountCars();
      this.GARAGE_CURRENT_PAGE += this.DELTA_INDEX_NUMBER;
      await this.getCars(this.GARAGE_CURRENT_PAGE);

      if (this.GARAGE_CURRENT_PAGE === Math.ceil(CARS_GARAGE_COUNT / this.GARAGE_PAGE_LIMIT)) {
        this.NEXT_PAGE_BUTTON_ELEMENT.disabled = true;
      }
    });

    this.PREV_PAGE_BUTTON_ELEMENT.addEventListener('click', async () => {
      if (this.GARAGE_CURRENT_PAGE !== 1) {
        const carsGarageCount = await this.CAR_GARAGE_API.getCountCars();

        if (this.GARAGE_CURRENT_PAGE === Math.ceil(carsGarageCount / this.GARAGE_PAGE_LIMIT)) {
          this.NEXT_PAGE_BUTTON_ELEMENT.disabled = false;
        }

        this.GARAGE_CURRENT_PAGE -= this.DELTA_INDEX_NUMBER;

        if (this.GARAGE_CURRENT_PAGE === 1) {
          this.PREV_PAGE_BUTTON_ELEMENT.disabled = true;
        }

        await this.getCars(this.GARAGE_CURRENT_PAGE);
      }
    });

    this.CREATE_BUTTON_ELEMENT.addEventListener('click', async () => {
      const NEW_CAR_DATA = this.GARAGE_CONTROLLER.getCreateCarValues();

      if (NEW_CAR_DATA.textValue === '') {
        this.GARAGE_CONTROLLER.setCreateInputFailedState();
        return;
      }

      const RESPONSE_NEW_CAR_DATA = await this.CAR_GARAGE_API.createCar(
        NEW_CAR_DATA.textValue,
        NEW_CAR_DATA.colorValue,
      );

      const CARS_GARAGE_COUNT = await this.CAR_GARAGE_API.getCountCars();
      this.setGarageCarsCount(CARS_GARAGE_COUNT);

      if (
        CARS_GARAGE_COUNT <= this.GARAGE_PAGE_LIMIT ||
        this.raceMembersList.length < this.GARAGE_PAGE_LIMIT
      ) {
        await this.addSingleCar(RESPONSE_NEW_CAR_DATA);
      }

      if (CARS_GARAGE_COUNT > this.GARAGE_PAGE_LIMIT) {
        this.NEXT_PAGE_BUTTON_ELEMENT.disabled = false;
      }

      // TODO  const countGarageCars = await this.CAR_GARAGE_API.getCountCars();

      if (CARS_GARAGE_COUNT > 0) {
        this.GARAGE_CONTROLLER.enableRaceStartButton();
      }

      this.GARAGE_CONTROLLER.clearCreateInputValues();
      await this.setGaragePageNumber(this.GARAGE_CURRENT_PAGE);
    });

    this.RACE_START_BUTTON_ELEMENT.addEventListener('click', async () => {
      this.GARAGE_CONTROLLER.disableControllerButtons();
      this.GARAGE_CONTROLLER.disableCreateInput();
      this.disablePageControllerButtons();
      this.raceMembersList.forEach((raceMember) => raceMember.disableAllButtons());
      const RACE_RESULT = await Promise.all(
        this.raceMembersList.map((raceMember) => raceMember.startRaceMoveCar()),
      );

      this.RACE_RESET_BUTTON_ELEMENT.disabled = false;

      const FINALLY_RACE_RESULT = RACE_RESULT.reduce<StartMoveResultType[]>(
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

      if (FINALLY_RACE_RESULT.length !== 0) {
        const WINNER_DATA = FINALLY_RACE_RESULT[0];
        await this.createWinner(WINNER_DATA);
        this.showWinnerPopup(WINNER_DATA.roadTime, WINNER_DATA.carName);
      } else {
        this.showWinnerPopup();
      }
    });

    this.RACE_RESET_BUTTON_ELEMENT.addEventListener('click', () => {
      this.raceMembersList.forEach((raceMember) => raceMember.setCarToInitialPlace());
      this.raceMembersList.forEach((raceMember) => raceMember.enableAllButtons());
      this.GARAGE_CONTROLLER.enableControllerButtons();
      this.GARAGE_CONTROLLER.enableCreateInput();
      this.RACE_RESET_BUTTON_ELEMENT.disabled = true;
      this.enablePageControllerButtons();
    });

    this.UPDATE_BUTTON_ELEMENT.addEventListener('click', async () => {
      await this.updateCar();
    });

    this.GENERATE_CARS_BUTTON_ELEMENT.addEventListener('click', async () => {
      await this.generateNewCars();
    });
  }

  private compareWinnerResult(
    previousTime: number,
    currentTime: number,
    winsCount: number,
  ): CompareWinnerResultType {
    const CURRENT_WINNER_TIME = previousTime < currentTime ? previousTime : currentTime;
    const CURRENT_WINNER_WINS = winsCount + this.DELTA_INDEX_NUMBER;

    return { time: CURRENT_WINNER_TIME, winsCount: CURRENT_WINNER_WINS };
  }

  private async createWinner(winnerPropsData: WinnerPropsDataType): Promise<void> {
    const WINNER_ID = winnerPropsData.carId;
    const WINNER_TIME = winnerPropsData.roadTime;

    try {
      const PREVIOUS_WINNER_RESULT = await this.WINNERS_API.getWinner(WINNER_ID);
      const BEST_WINNER_RESULT = this.compareWinnerResult(
        PREVIOUS_WINNER_RESULT.time,
        winnerPropsData.roadTime,
        PREVIOUS_WINNER_RESULT.wins,
      );
      await this.WINNERS_API.updateWinner(
        WINNER_ID,
        BEST_WINNER_RESULT.winsCount,
        BEST_WINNER_RESULT.time,
      );
    } catch (error) {
      await this.WINNERS_API.createWinner(WINNER_ID, 1, WINNER_TIME);
    }
  }

  private async generateNewCars(): Promise<void> {
    const newCarDataList: NewCarDataType[] = [];
    const BEFORE_GENERATE_CARS_COUNT = await this.CAR_GARAGE_API.getCountCars();

    for (let i = 0; i < this.GARAGE_GENERATE_CARS_COUNT; i += this.DELTA_INDEX_NUMBER) {
      const NEW_CAR_NAME = getRandomCarName();
      const NEW_CAR_COLOR = generateColor();
      newCarDataList.push({ name: NEW_CAR_NAME, color: NEW_CAR_COLOR });
    }

    newCarDataList.forEach(async (newCarData) => {
      await this.CAR_GARAGE_API.createCar(newCarData.name, newCarData.color);
    });

    const CARS_GARAGE_COUNT = await this.CAR_GARAGE_API.getCountCars();
    this.setGarageCarsCount(CARS_GARAGE_COUNT);

    if (BEFORE_GENERATE_CARS_COUNT < this.GARAGE_PAGE_LIMIT) {
      await this.getCars();
    }
  }

  private disablePageControllerButtons(): void {
    this.PREV_PAGE_BUTTON_ELEMENT.disabled = true;
    this.NEXT_PAGE_BUTTON_ELEMENT.disabled = true;
  }

  private async enablePageControllerButtons(): Promise<void> {
    const CARS_GARAGE_COUNT = await this.CAR_GARAGE_API.getCountCars();

    if (this.GARAGE_CURRENT_PAGE === 1) {
      this.PREV_PAGE_BUTTON_ELEMENT.disabled = true;
    } else {
      this.PREV_PAGE_BUTTON_ELEMENT.disabled = false;
    }

    if (this.GARAGE_CURRENT_PAGE === Math.ceil(CARS_GARAGE_COUNT / this.GARAGE_PAGE_LIMIT)) {
      this.NEXT_PAGE_BUTTON_ELEMENT.disabled = true;
    } else {
      this.NEXT_PAGE_BUTTON_ELEMENT.disabled = false;
    }
  }

  private disableAllSelectButtons(): void {
    this.raceMembersList.forEach((raceMember) => raceMember.disableSelectButton());
  }

  private async updateCar(): Promise<void> {
    const UPDATE_CAR_ID = this.GARAGE_CONTROLLER.getUpdateSelectCarId();
    const UPDATE_VALUES = this.GARAGE_CONTROLLER.getUpdateCarValues();
    const UPDATE_CAR_NAME = UPDATE_VALUES.textValue;
    const UPDATE_COLR_VALUE = UPDATE_VALUES.colorValue;

    if (UPDATE_CAR_NAME === '') {
      this.GARAGE_CONTROLLER.setUpdateInputFailedState();
      return;
    }

    await this.CAR_GARAGE_API.updateCar(UPDATE_CAR_ID, UPDATE_CAR_NAME, UPDATE_COLR_VALUE);

    this.raceMembersList.forEach((raceMember) => {
      const raceMemberId = raceMember.getCarId();

      if (raceMemberId === UPDATE_CAR_ID) {
        raceMember.setCarName(UPDATE_CAR_NAME);
        raceMember.setCarColor(UPDATE_COLR_VALUE);
        raceMember.deleteSelectedState();
      }
    });

    this.UPDATE_BUTTON_ELEMENT.disabled = true;
    this.CREATE_BUTTON_ELEMENT.disabled = false;
    this.RACE_START_BUTTON_ELEMENT.disabled = false;
    this.GARAGE_CONTROLLER.clearUpdateInputValues();

    this.raceMembersList.forEach((raceMember) => raceMember.enableSelectButton());
    this.GARAGE_CONTROLLER.disableUpdateInput();
    this.GARAGE_CONTROLLER.enableCreateInput();
    this.GENERATE_CARS_BUTTON_ELEMENT.disabled = false;
  }

  private showWinnerPopup(time?: number, carName?: string): void {
    const WINNER_POPUP_BLOCK: HTMLElement = createElement({
      tag: 'div',
      classNames: ['winner__popup', `popup`],
      text: '',
    });

    const WINNER_POPUP_MESSAGE: HTMLElement = createElement({
      tag: 'span',
      classNames: ['popup__message'],
      text: `The Winner is "${carName}".
            Time - ${time?.toFixed(2)} sec.`,
    });

    const WINNER_POPUP_BUTTON: HTMLButtonElement = createElement({
      tag: 'button',
      classNames: ['popup__button'],
      text: 'x',
    });

    if (!time && !carName) {
      WINNER_POPUP_MESSAGE.textContent = this.EMPTY_WINNER_MESSAGE;
    }

    WINNER_POPUP_BUTTON.addEventListener('click', () => {
      this.removeWinnerMessage();
    });

    WINNER_POPUP_BLOCK.append(WINNER_POPUP_MESSAGE, WINNER_POPUP_BUTTON);

    this.POPUP_ELEMENT = WINNER_POPUP_BLOCK;
    this.GARAGE_ELEMENT.append(WINNER_POPUP_BLOCK);
    this.RACE_RESET_BUTTON_ELEMENT.disabled = true;
  }

  private removeWinnerMessage(): void {
    if (this.POPUP_ELEMENT) {
      this.POPUP_ELEMENT.remove();
      this.RACE_RESET_BUTTON_ELEMENT.disabled = false;
    }
  }

  private async setGaragePageNumber(value: number): Promise<void> {
    const CARS_GARAGE_COUNT = await this.CAR_GARAGE_API.getCountCars();
    const garagePagesCount = Math.ceil(CARS_GARAGE_COUNT / this.GARAGE_PAGE_LIMIT);

    this.GARAGE_PAGE_NUMBER_ELEMENT.textContent = `Page: ${value}/${garagePagesCount}`;
  }
}
