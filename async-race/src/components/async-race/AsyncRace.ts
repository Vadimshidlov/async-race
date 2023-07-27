import getHeader from '../header/getHeader';
import createElement from '../element/createElement';
import { PageController } from '../PageController/PageController';
import { Garage } from '../garage/Garage';
import { WinnersTable } from '../winners/WinnersTable';

import '../../styles.scss';

export interface IAsyncRace {
  getHtmlPage: () => void;
}

export class AsyncRace implements IAsyncRace {
  private body = document.body;

  private readonly MAIN_TAG = 'main';

  private readonly MAIN_CLASSNAMES = ['main', '_container'];

  private garageCurrentPage = 1;

  private garage = new Garage(this.garageCurrentPage);

  private winnersCurrentPage = 1;

  private garageElement = this.garage.getGarageHtml();

  private pageController = new PageController();

  private pageControllerElement = this.pageController.getPageControllerHTML();

  private toGarageButton = this.pageController.getGarageButton();

  private toWinnersButton = this.pageController.getWinnersButton();

  private winnersHTML: HTMLElement | null = null;

  private main = createElement({
    tag: this.MAIN_TAG,
    classNames: [...this.MAIN_CLASSNAMES],
    text: '',
  });

  constructor() {
    this.getHtmlPage();
    this.addEventListeners();
  }

  public getHtmlPage(): void {
    const header: HTMLElement = getHeader();
    header.append(this.pageControllerElement);

    this.main.append(this.garageElement);
    this.body.append(header);
    this.body.append(this.main);
  }

  private addEventListeners(): void {
    this.toWinnersButton.addEventListener('click', () => {
      this.main.innerHTML = '';
      this.garageCurrentPage = this.garage.getGarageCurrentPage();

      this.winnersHTML = new WinnersTable(
        this.winnersCurrentPage,
        this.setWinnersState.bind(this),
      ).getWinnersHtml();

      this.main.append(this.winnersHTML);
    });

    this.toGarageButton.addEventListener('click', () => {
      this.main.innerHTML = '';
      this.main.append(this.garageElement);
    });
  }

  private setWinnersState(value: number): void {
    this.winnersCurrentPage = value;
  }
}
