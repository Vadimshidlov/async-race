import {getCarImage} from '../cars/get-car-image';
import createElement from '../element/element-creator';

export type WinnerDataType = {
    // id: number;
    wins: number;
    time: number;
    color: string;
    indexNumber: number;
    name: string;
};

export interface IWinnersItem {
    getWinnerHtml: () => HTMLElement
}

export class WinnersItem implements IWinnersItem {
    private winnersItem: HTMLElement = createElement({
        tag: 'tr',
        classNames: ['winners__item', 'winner'],
        text: '',
    });

    private readonly winnerNumber: HTMLElement;

    private readonly winnerCar: HTMLElement;

    private readonly winnerName: HTMLElement;

    private readonly winnerWins: HTMLElement;

    private readonly winnerTime: HTMLElement;

    constructor(winnerData: WinnerDataType) {
        this.winnerNumber = createElement({
            tag: 'td',
            classNames: ['winner__number'],
            text: `${winnerData.indexNumber}`,
        });

        this.winnerCar = createElement({
            tag: 'td',
            classNames: ['winner__car'],
            text: '',
        });

        this.winnerName = createElement({
            tag: 'td',
            classNames: ['winner__name'],
            text: `${winnerData.name}`,
        });

        this.winnerWins = createElement({
            tag: 'td',
            classNames: ['winner__wins'],
            text: `${winnerData.wins}`,
        });

        this.winnerTime = createElement({
            tag: 'td',
            classNames: ['winner__time'],
            text: `${winnerData.time}`,
        });

        this.winnersItem.append(
            this.winnerNumber,
            this.winnerCar,
            this.winnerName,
            this.winnerWins,
            this.winnerTime,
        );

        this.configureWinner(winnerData.color);
    }

    private configureWinner(color: string): void {
        const car = getCarImage(color, 60, 40);
        this.winnerCar.innerHTML = car;
    }

    public getWinnerHtml(): HTMLElement {
        return this.winnersItem;
    }
}
