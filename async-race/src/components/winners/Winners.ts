import { GarageService } from '../../services/GarageService';
import { GetWinnersPropsType, WinnersService } from '../../services/WinnersService';
import createElement from '../element/element-creator';
import { WinnerDataType, WinnersItem } from './WinnerItem';
import './winners.scss';
import { CreateButtonElement } from '../create-input/create-button';

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

  // private winnersCurrentPage = 1;
  private winnersCurrentPage: number;

  private winnersCount = 1;

  private WINNERS_PAGE_LIMIT = 10;

  private DELTA_INDEX_NUMBER = 1;

  private winnersSortParam = 'time';

  private winnersSortOrder = 'ASC';

  constructor(currentPage: number) {
    this.configureView();
    this.winnersCurrentPage = currentPage;
    // this.prepareWinnersData();
    this.addWinners({
      page: this.winnersCurrentPage,
      limit: this.WINNERS_PAGE_LIMIT,
      //   sort: 'time',
      sort: this.winnersSortParam,
      //   order: 'ASC',
      order: this.winnersSortOrder,
    });
    // this.addWinners();
    this.addEventListeners();
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
      /* winnersTitlePageBlock, */ this.winnersTable,
      winnersPageControllerBlock,
    );
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
    /* sort = 'time',
    order = 'ASC', */
    sort = this.winnersSortParam,
    order = this.winnersSortOrder,
  }: GetWinnersPropsType): Promise<void> {
    await this.disableControllerButtons();

    const winnersCount = await this.winnersService.getWinnersCount();
    this.setCurrentPageAndCount(winnersCount, this.winnersCurrentPage);

    const winnersDataList = await this.winnersService.getWinners({ page, limit, sort, order });
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

    // console.log(this.resultWinnersDataList, `this.resultWinnersDataList`);
    res.forEach((resultWinnerData) => {
      // console.log(resultWinnerData, `123`);
      const winner = new WinnersItem(resultWinnerData);
      const winnerElement = winner.getWinnerHtml();
      this.winnersTableBody.append(winnerElement);
    });
  }

  private setCurrentPageAndCount(winnerCount: number, pageNumber: number): void {
    this.winnersTitle.textContent = `Winners (${winnerCount})`;
    this.winnersTitlePage.textContent = `Page: ${pageNumber}`;
  }

  private addEventListeners(): void {
    this.nextPageButtonElement.addEventListener('click', async () => {
      this.winnersCurrentPage += this.DELTA_INDEX_NUMBER;
      this.winnersTableBody.innerHTML = '';
      await this.addWinners({
        page: this.winnersCurrentPage,
        limit: this.WINNERS_PAGE_LIMIT,
        /* sort: 'time',
        order: 'ASC', */
        sort: this.winnersSortParam,
        order: this.winnersSortOrder,
      });
    });

    this.prevPageButtonElement.addEventListener('click', async () => {
      this.winnersCurrentPage -= this.DELTA_INDEX_NUMBER;
      this.winnersTableBody.innerHTML = '';
      await this.addWinners({
        page: this.winnersCurrentPage,
        limit: this.WINNERS_PAGE_LIMIT,
        /*  sort: 'time',
        order: 'ASC', */
        sort: this.winnersSortParam,
        order: this.winnersSortOrder,
      });
    });

    this.winnerWinsHeader.addEventListener('click', async () => {
      console.log(this.winnersCurrentPage, `currPage`);
      this.winnersTableBody.innerHTML = '';
      this.winnersSortParam = 'wins';
      this.winnersSortOrder = 'DESC';
      await this.addWinners({
        page: this.winnersCurrentPage,
        limit: this.WINNERS_PAGE_LIMIT,
        /* sort: 'wins',
        order: 'DESC', */
        sort: this.winnersSortParam,
        order: this.winnersSortOrder,
      });
    });

    this.winnerTimeHeader.addEventListener('click', async () => {
      console.log(this.winnersCurrentPage, `currPage`);
      this.winnersTableBody.innerHTML = '';
      this.winnersSortParam = 'time';
      this.winnersSortOrder = 'ACS';
      await this.addWinners({
        page: this.winnersCurrentPage,
        limit: this.WINNERS_PAGE_LIMIT,
        sort: this.winnersSortParam,
        order: this.winnersSortOrder,
        /* sort: 'time',
        order: 'ACS', */
      });
    });
  }

  public getWinnersCurrentPage(): number {
    return this.winnersCurrentPage;
  }
}
