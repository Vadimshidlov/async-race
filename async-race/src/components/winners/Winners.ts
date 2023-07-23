import {GarageService} from '../../services/GarageService';
import {GetWinnersPropsType, WinnersService} from '../../services/WinnersService';
import createElement from '../element/element-creator';
import {WinnerDataType, WinnersItem} from './WinnerItem';
import './winners.scss';
import {CreateButtonElement} from "../create-input/create-button";

export class WinnersTable {
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

    private resultWinnersDataList: WinnerDataType[] = [];

    private prevPageButtonElement: HTMLButtonElement = new CreateButtonElement('Prev').getElement();

    private nextPageButtonElement: HTMLButtonElement = new CreateButtonElement('Next').getElement();

    private winnersCurrentPage = 1;

    private winnersCount = 1;

    private WINNERS_PAGE_LIMIT = 10;

    constructor() {
        this.configureView();
        // this.prepareWinnersData();
        this.addWinners({
            page: this.winnersCurrentPage,
            limit: this.WINNERS_PAGE_LIMIT,
            sort: 'time',
            order: 'ASC'
        });
        // this.addWinners();
        this.addEventListeners()
    }

    private configureView(): void {
        const winnersInfoBlock: HTMLElement = createElement({
            tag: 'div',
            classNames: ['winners__info'],
            text: '',
        });


        winnersInfoBlock.append(this.winnersTitle, this.winnersTitlePage);


        // winnersTitlePageBlock.append(winnersTitlePage);

        const winnersTableHeaderBlock: HTMLElement = createElement({
            tag: 'thead',
            classNames: ['winners__table-header', 'table-header'],
            text: '',
        });

        const TableHeaderTr = createElement({
            tag: 'tr',
            classNames: ['winners__table-header', 'table-header'],
            text: '',
        });

        winnersTableHeaderBlock.append(TableHeaderTr);

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

        /* const winnerWinsHeader = createElement({
            tag: 'th',
            classNames: ['table-header__wins'],
            text: `Wins`,
        });

        const winnerTimeHeader = createElement({
            tag: 'th',
            classNames: ['table-header__time'],
            text: `Best time (sec)`,
        }); */

        TableHeaderTr.append(
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

        this.winnersBlock.append(winnersInfoBlock, /* winnersTitlePageBlock, */ this.winnersTable, winnersPageControllerBlock);
    }

    public getWinnersHtml(): HTMLElement {
        return this.winnersBlock;
    }

    /* private async prepareWinnersData(): Promise<void> {
        const winnersDataList = await this.winnersService.getWinners();
        const winnersIdList = winnersDataList.map((winnerData) => winnerData.id);
        const carParamsList = await Promise.all(
            winnersIdList.map((winnerData) => this.garageService.getCar(winnerData)),
        );
        const res: WinnerDataType[] = [];
        carParamsList.forEach((carParams, firstIndex) => {
            winnersDataList.forEach((winnerData) => {
                if (carParams.id === winnerData.id) {
                    this.resultWinnersDataList.push({
                        wins: winnerData.wins,
                        time: winnerData.time,
                        color: carParams.color,
                        indexNumber: firstIndex + 1,
                        name: carParams.name,
                    });
                }
            });
        });

        // console.log(res);
    } */

    private async disableControllerButtons(): Promise<void> {
        const winnersCount = await this.winnersService.getWinnersCount()
        if (this.winnersCurrentPage === 1) {
            this.prevPageButtonElement.disabled = true;
        } else {
            this.prevPageButtonElement.disabled = false;
        }

        if (this.winnersCurrentPage === Math.ceil(winnersCount / 10)) {
            this.nextPageButtonElement.disabled = true
        } else {
            this.nextPageButtonElement.disabled = false;
        }
    }

    public async addWinners(
        {
            page = this.winnersCurrentPage,
            limit = this.WINNERS_PAGE_LIMIT,
            sort = 'time',
            order = 'ASC'
        }: GetWinnersPropsType
    ): Promise<void> {
        await this.disableControllerButtons()

        const winnersCount = await this.winnersService.getWinnersCount()
        this.setCurrentPageAndCount(winnersCount, this.winnersCurrentPage)


        const winnersDataList = await this.winnersService.getWinners({page, limit, sort, order});
        const winnersIdList = winnersDataList.map((winnerData) => winnerData.id);
        const carParamsList = await Promise.all(
            winnersIdList.map((winnerData) => this.garageService.getCar(winnerData)),
        );
        const res: WinnerDataType[] = [];
        carParamsList.forEach((carParams, firstIndex) => {
            winnersDataList.forEach((winnerData) => {
                if (carParams.id === winnerData.id) {
                    const carCurrenNumber = (this.winnersCurrentPage * 10 - 10) + firstIndex + 1
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

        // console.log(this.resultWinnersDataList, `this.resultWinnersDataList`);
        res.forEach((resultWinnerData) => {
            // console.log(resultWinnerData, `123`);
            const winner = new WinnersItem(resultWinnerData);
            const winnerElement = winner.getWinnerHtml();
            this.winnersTableBody.append(winnerElement);
        });
    }

    private setCurrentPageAndCount(winnerCount: number, pageNumber: number): void {
        this.winnersTitle.textContent = `Winners (${winnerCount})`
        this.winnersTitlePage.textContent = `Page: ${pageNumber}`
    }

    private addEventListeners(): void {
        this.nextPageButtonElement.addEventListener('click', async () => {
            this.winnersCurrentPage += 1;
            this.winnersTableBody.innerHTML = '';
            await this.addWinners({
                page: this.winnersCurrentPage,
                limit: this.WINNERS_PAGE_LIMIT,
                sort: 'time',
                order: 'ASC'
            })
        })

        this.prevPageButtonElement.addEventListener('click', async () => {
            this.winnersCurrentPage -= 1;
            this.winnersTableBody.innerHTML = '';
            await this.addWinners({
                page: this.winnersCurrentPage,
                limit: this.WINNERS_PAGE_LIMIT,
                sort: 'time',
                order: 'ASC'
            })
        })

        this.winnerWinsHeader.addEventListener('click', async () => {
            console.log(this.winnersCurrentPage, `currPage`);
            this.winnersTableBody.innerHTML = '';
            await this.addWinners({
                page: this.winnersCurrentPage,
                limit: this.WINNERS_PAGE_LIMIT,
                sort: 'wins',
                order: 'DESC'
            })
        })

        this.winnerTimeHeader.addEventListener('click', async () => {
            console.log(this.winnersCurrentPage, `currPage`);
            this.winnersTableBody.innerHTML = '';
            await this.addWinners({
                page: this.winnersCurrentPage,
                limit: this.WINNERS_PAGE_LIMIT,
                sort: 'time',
                order: 'ACS'
            })
        })
    }
}
