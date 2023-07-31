import {getCarImage} from '../cars/getCarImage';
import createElement from '../element/createElement';

export type WinnerDataType = {
    // id: number;
    wins: number;
    time: number;
    color: string;
    indexNumber: number;
    name: string;
};

export interface IWinnerTableRow {
    getWinnerHtml: () => HTMLElement
}

export class WinnerTableRow implements IWinnerTableRow {
    private winnersItem: HTMLElement = createElement({
        tag: 'tr',
        classNames: ['winners__item', 'winner'],
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
        const car: string = getCarImage(color, 60, 40);
        this.winnerCar.innerHTML = car;
    }

    public getWinnerHtml(): HTMLElement {
        return this.winnersItem;
    }
}
