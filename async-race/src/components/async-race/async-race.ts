import getHeader from '../header/header';
import '../../styles.scss';
import createElement from '../element/element-creator';

import {PageCOntroller} from '../PageController/PageController';
import {Garage} from '../garage/Garage';
import {WinnersTable} from '../winners/Winners';

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

    private winnersHTML: HTMLElement | null = null;

    private main = createElement({
        tag: 'main',
        classNames: ['main', '_container'],
        text: '',
    });

    constructor() {
        this.getHtmlPAge();
        this.addEventListeners();
    }

    private addEventListeners(): void {
        this.toWinnersButton.addEventListener('click', () => {
            this.main.innerHTML = '';
            this.garageCurrentPage = this.garage.getGarageCurrentPage();
            if (!this.winnersHTML) {
                this.winnersHTML = new WinnersTable().getWinnersHtml();
            }
            this.main.append(this.winnersHTML);
        });

        this.toGarageButton.addEventListener('click', () => {
            this.main.innerHTML = '';
            this.main.append(this.garageElement);
        });
    }

    public getHtmlPAge(): void {
        const header: HTMLElement = getHeader();
        header.append(this.pageControllerElement);

        this.main.append(this.garageElement);

        this.body.append(header);
        this.body.append(this.main);
    }
}
