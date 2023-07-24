import getHeader from '../header/header';
import '../../styles.scss';
import createElement from '../element/element-creator';

import {PageController} from '../PageController/PageController';
import {Garage} from '../garage/Garage';
import {WinnersTable} from '../winners/Winners';
import {GetWinnersPropsType} from "../../services/WinnersService";

export interface IAsyncRace {
    getHtmlPAge: () => void
}

export class AsyncRace implements IAsyncRace {
    private body = document.body;

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
            this.winnersHTML = new WinnersTable(this.winnersCurrentPage, this.setWinnersState.bind(this)).getWinnersHtml();
            this.main.append(this.winnersHTML);
        });

        this.toGarageButton.addEventListener('click', () => {
            this.main.innerHTML = '';
            this.main.append(this.garageElement);
        });
    }

    private setWinnersState(value: number): void {
        this.winnersCurrentPage = value
    }

    public getHtmlPAge(): void {
        const header: HTMLElement = getHeader();
        header.append(this.pageControllerElement);
        this.main.append(this.garageElement);
        this.body.append(header);
        this.body.append(this.main);
    }
}
