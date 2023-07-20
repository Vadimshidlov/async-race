import getHeader from '../header/header';
import '../../styles.scss';
import createElement from '../element/element-creator';

import { PageCOntroller } from '../PageController/PageController';
import { Garage } from '../garage/Garage';
import { WinnersTable } from '../winners/Winners';

export type RacePArtyType = () => Promise<number>;

export class AsyncRace {
  private body = document.body;

  private garageCurrentPage = 1;

  private garage = new Garage(this.garageCurrentPage);

  private garageElement = this.garage.getGarageHtml();

  private pageController = new PageCOntroller();

  private pageControllerElement = this.pageController.getPageControlleHTML();

  private toGarageButton = this.pageController.getGarageButton();

  private toWinnersButton = this.pageController.getWinnersButton();

  private main = createElement({
    tag: 'main',
    classNames: ['main', '_container'],
    text: '',
  });

  constructor() {
    this.getHtmlPAge();
    this.addEventListeners();
  }

  // private addEventListeners(): void {
  //     this.garageElement.addEventListener('click', (event: Event) => {
  //         if (
  //             /* event.target instanceof HTMLElement &&
  //             (event.target.classList.contains('car-filed') ||
  //                 event.target.parentElement?.classList.contains('car-filed')) */
  //             event.target instanceof HTMLElement &&
  //             (event.target.closest('.car-filed')
  //                 /* ||
  //                 event.target.parentElement?.closest('.car-filed')) */
  //             )) {
  //             event.stopPropagation();
  //             console.log(event.target.id);
  //         }
  //     });
  // }

  private addEventListeners(): void {
    this.toWinnersButton.addEventListener('click', () => {
      this.main.innerHTML = '';
      this.garageCurrentPage = this.garage.getGarageCurrentPage();
      const winnersHtml = new WinnersTable().getWinnersHtml();
      this.main.append(winnersHtml);
    });

    this.toGarageButton.addEventListener('click', () => {
      this.main.innerHTML = '';
      // this.main.append(new Garage(this.garageCurrentPage).getGarageHtml());
      this.main.append(this.garageElement);
    });
  }

  public getHtmlPAge(): void {
    const header: HTMLElement = getHeader();
    header.append(this.pageControllerElement);
    // const main = createElement({
    //   tag: 'main',
    //   classNames: ['main', '_container'],
    //   text: '',
    // });

    this.main.append(this.garageElement);

    this.body.append(header);
    this.body.append(this.main);
  }
}
