import {GarageService} from '../../services/GarageService';
import {GetWinnersPropsType, WinnersService} from '../../services/WinnersService';
import createElement from '../element/createElement';
import {WinnerDataType, WinnersItem} from './WinnerItem';
import './winners.scss';
import {createButtonElement} from '../create-input/createButtonElement';

export type SetWinnersCurrentPageType = (value: number) => void

export interface IWinnersTable {
    getWinnersHtml: () => HTMLElement
    addWinners: (
        {
            page,
            limit,
            sort,
            order,
        }: GetWinnersPropsType) => Promise<void>
}

export class WinnersTable implements IWinnersTable {
    private winnersBlock: HTMLElement = createElement({
        tag: 'section',
        classNames: ['winners-block'],
        text: '',
    });

    private winnersTable: HTMLElement = createElement({
        tag: 'table',
        classNames: ['winners__table'],
        text: '',
    });

    private winnersTableBody = createElement({
        tag: 'tbody',
        classNames: ['winners__table-body'],
        text: '',
    });

    private winnersTitle: HTMLElement = createElement({
        tag: 'span',
        classNames: ['winners__title-text'],
        text: 'Winners (1)',
    });

    private winnersTitlePage: HTMLElement = createElement({
        tag: 'span',
        classNames: ['page-title__text'],
        text: 'Page: 1',
    });

    private winnerWinsHeader = createElement({
        tag: 'th',
        classNames: ['table-header__wins'],
        text: `Wins`,
    });

    private winnerTimeHeader = createElement({
        tag: 'th',
        classNames: ['table-header__time'],
        text: `Best time (sec)`,
    });

    private winnersService = new WinnersService();

    private garageService = new GarageService();

    private prevPageButtonElement: HTMLButtonElement = createButtonElement('Prev');

    private nextPageButtonElement: HTMLButtonElement = createButtonElement('Next');

    private winnersCurrentPage: number;

    private WINNERS_PAGE_LIMIT = 10;

    private DELTA_INDEX_NUMBER = 1;

    private winnersSortParam = 'time';

    private winnersSortOrder = 'ASC';

    private readonly setWinnersCurrentPage: SetWinnersCurrentPageType;

    constructor(currentPage: number, setWinnersCurrentPage: SetWinnersCurrentPageType) {
        this.configureView();
        this.setWinnersCurrentPage = setWinnersCurrentPage;
        this.winnersCurrentPage = currentPage;
        this.addWinners({
            page: currentPage,
            limit: this.WINNERS_PAGE_LIMIT,
            sort: this.winnersSortParam,
            order: this.winnersSortOrder,
        });
        this.addEventListeners();
    }

    private configureView(): void {
        const winnersInfoBlock: HTMLElement = createElement({
            tag: 'div',
            classNames: ['winners__info'],
            text: '',
        });

        winnersInfoBlock.append(this.winnersTitle, this.winnersTitlePage);

        const winnersTableHeaderBlock: HTMLElement = createElement({
            tag: 'thead',
            classNames: ['winners__table-header', 'table-header'],
            text: '',
        });

        const tableHeaderTr = createElement({
            tag: 'tr',
            classNames: ['winners__table-header', 'table-header'],
            text: '',
        });

        winnersTableHeaderBlock.append(tableHeaderTr);

        const winnerNumberHeader = createElement({
            tag: 'th',
            classNames: ['table-header__number'],
            text: `Number`,
        });

        const winnerCarHeader = createElement({
            tag: 'th',
            classNames: ['table-header__car'],
            text: 'Car',
        });

        const winnerNameHeader = createElement({
            tag: 'th',
            classNames: ['table-header__name'],
            text: 'Name',
        });

        tableHeaderTr.append(
            winnerNumberHeader,
            winnerCarHeader,
            winnerNameHeader,
            this.winnerWinsHeader,
            this.winnerTimeHeader,
        );

        this.winnersTable.append(winnersTableHeaderBlock, this.winnersTableBody);

        const winnersPageControllerBlock = createElement({
            tag: 'div',
            classNames: ['winners__page-controller'],
            text: ``,
        });

        winnersPageControllerBlock.append(this.prevPageButtonElement, this.nextPageButtonElement);

        this.winnersBlock.append(
            winnersInfoBlock,
            winnersPageControllerBlock,
            this.winnersTable,
        );
    }

    public getWinnersHtml(): HTMLElement {
        return this.winnersBlock;
    }

    private async disableControllerButtons(): Promise<void> {
        const winnersCount = await this.winnersService.getWinnersCount();

        if (this.winnersCurrentPage === 1) {
            this.prevPageButtonElement.disabled = true;
        } else {
            this.prevPageButtonElement.disabled = false;
        }

        if (this.winnersCurrentPage === Math.ceil(winnersCount / this.WINNERS_PAGE_LIMIT)) {
            this.nextPageButtonElement.disabled = true;
        } else {
            this.nextPageButtonElement.disabled = false;
        }

    }

    public async addWinners({
                                page = this.winnersCurrentPage,
                                limit = this.WINNERS_PAGE_LIMIT,
                                sort = this.winnersSortParam,
                                order = this.winnersSortOrder,
                            }: GetWinnersPropsType): Promise<void> {
        await this.disableControllerButtons();

        const winnersCount = await this.winnersService.getWinnersCount();
        await this.setCurrentPageAndCount(winnersCount, this.winnersCurrentPage);

        const winnersDataList = await this.winnersService.getWinners({page, limit, sort, order});
        const winnersIdList = winnersDataList.map((winnerData) => winnerData.id);
        const carParamsList = await Promise.all(
            winnersIdList.map((winnerData) => this.garageService.getCar(winnerData)),
        );
        const res: WinnerDataType[] = [];
        carParamsList.forEach((carParams, firstIndex) => {
            winnersDataList.forEach((winnerData) => {
                if (carParams.id === winnerData.id) {
                    const carCurrenNumber =
                        this.winnersCurrentPage * this.WINNERS_PAGE_LIMIT -
                        this.WINNERS_PAGE_LIMIT +
                        firstIndex +
                        this.DELTA_INDEX_NUMBER;
                    res.push({
                        wins: winnerData.wins,
                        time: winnerData.time,
                        color: carParams.color,
                        indexNumber: carCurrenNumber,
                        name: carParams.name,
                    });
                }
            });
        });

        res.forEach((resultWinnerData) => {
            const winner = new WinnersItem(resultWinnerData);
            const winnerElement = winner.getWinnerHtml();
            this.winnersTableBody.append(winnerElement);
        });
    }

    private async setCurrentPageAndCount(winnerCount: number, pageNumber: number): Promise<void> {
        const winnersCount = await this.winnersService.getWinnersCount();
        const winnersPagesCount = Math.ceil(winnersCount / this.WINNERS_PAGE_LIMIT);

        this.winnersTitle.textContent = `Winners (${winnerCount})`;
        this.winnersTitlePage.textContent = `Page: ${pageNumber}/${winnersPagesCount}`;
    }

    private addEventListeners(): void {
        this.nextPageButtonElement.addEventListener('click', async () => {
            this.winnersCurrentPage += this.DELTA_INDEX_NUMBER;
            this.setWinnersCurrentPage(this.winnersCurrentPage)
            this.winnersTableBody.innerHTML = '';

            await this.addWinners({
                page: this.winnersCurrentPage,
                limit: this.WINNERS_PAGE_LIMIT,
                sort: this.winnersSortParam,
                order: this.winnersSortOrder,
            });
        });

        this.prevPageButtonElement.addEventListener('click', async () => {
            this.winnersCurrentPage -= this.DELTA_INDEX_NUMBER;
            this.setWinnersCurrentPage(this.winnersCurrentPage)
            this.winnersTableBody.innerHTML = '';

            await this.addWinners({
                page: this.winnersCurrentPage,
                limit: this.WINNERS_PAGE_LIMIT,
                sort: this.winnersSortParam,
                order: this.winnersSortOrder,
            });
        });

        this.winnerWinsHeader.addEventListener('click', async () => {
            this.winnersTableBody.innerHTML = '';
            this.winnersSortParam = 'wins';
            this.winnersSortOrder = 'DESC';
            await this.addWinners({
                page: this.winnersCurrentPage,
                limit: this.WINNERS_PAGE_LIMIT,
                sort: this.winnersSortParam,
                order: this.winnersSortOrder,
            });
        });

        this.winnerTimeHeader.addEventListener('click', async () => {
            this.winnersTableBody.innerHTML = '';
            this.winnersSortParam = 'time';
            this.winnersSortOrder = 'ACS';
            await this.addWinners({
                page: this.winnersCurrentPage,
                limit: this.WINNERS_PAGE_LIMIT,
                sort: this.winnersSortParam,
                order: this.winnersSortOrder,
            });
        });
    }
}
