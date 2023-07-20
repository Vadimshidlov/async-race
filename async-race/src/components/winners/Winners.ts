import { CarGarage } from '../../services/CarGarage';
import { WinnersService } from '../../services/WinnersService';
import createElement from '../element/element-creator';
import { WinnerDataType, WinnersItem } from './WinnerItem';
import './winners.scss';

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

  private winnersService = new WinnersService();

  private garageService = new CarGarage();

  private resultWinnersDataList: WinnerDataType[] = [];

  constructor() {
    this.configureView();
    // this.prepareWinnersData();
    this.addWinners();
    // this.addWinners();
  }

  private configureView(): void {
    const winnersTitleBlock: HTMLElement = createElement({
      tag: 'div',
      classNames: ['winners__title'],
      text: '',
    });

    const winnersTitle: HTMLElement = createElement({
      tag: 'h1',
      classNames: ['winners__title-text'],
      text: 'Winners (6)',
    });
    winnersTitleBlock.append(winnersTitle);

    const winnersTitlePageBlock: HTMLElement = createElement({
      tag: 'div',
      classNames: ['winners__page-title', 'page-title'],
      text: '',
    });

    const winnersTitlePage: HTMLElement = createElement({
      tag: 'h2',
      classNames: ['page-title__text'],
      text: 'Page: 2',
    });
    winnersTitlePageBlock.append(winnersTitlePage);

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

    const winnerWinsHeader = createElement({
      tag: 'th',
      classNames: ['table-header__wins'],
      text: `Wins`,
    });

    const winnerTimeHeader = createElement({
      tag: 'th',
      classNames: ['table-header__time'],
      text: `Best time (sec)`,
    });

    TableHeaderTr.append(
      winnerNumberHeader,
      winnerCarHeader,
      winnerNameHeader,
      winnerWinsHeader,
      winnerTimeHeader,
    );

    this.winnersTable.append(winnersTableHeaderBlock, this.winnersTableBody);

    /* winnersTableHeaderBlock.append(
      winnerNumberHeader,
      winnerCarHeader,
      winnerNameHeader,
      winnerWinsHeader,
      winnerTimeHeader,
    ); */

    this.winnersBlock.append(winnersTitleBlock, winnersTitlePageBlock, this.winnersTable);
  }

  public getWinnersHtml(): HTMLElement {
    /* const renderWinners = async (): Promise<void> => {
      await this.addWinners();
    };
    renderWinners(); */
    return this.winnersBlock;
  }

  private async prepareWinnersData(): Promise<void> {
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
  }

  public async addWinners(): Promise<void> {
    /* const winnersData = await this.winnersService.getWinners();
    winnersData.forEach(async (winnerData, index) => {
      const winnerId = winnerData.id;
      const carData = await this.garageService.getCar(winnerId);

      const winnersProps = {
        // id: winnerId,
        wins: winnerData.wins,
        time: winnerData.time,
        color: carData.color,
        indexNumber: index + 1,
        name: carData.name,
      };

      const winner = new WinnersItem(winnersProps);
      const winnerElement = winner.getWinnerHtml();
      this.winnersTableBody.append(winnerElement);
    }); */
    const winnersDataList = await this.winnersService.getWinners();
    const winnersIdList = winnersDataList.map((winnerData) => winnerData.id);
    const carParamsList = await Promise.all(
      winnersIdList.map((winnerData) => this.garageService.getCar(winnerData)),
    );
    const res: WinnerDataType[] = [];
    carParamsList.forEach((carParams, firstIndex) => {
      winnersDataList.forEach((winnerData) => {
        if (carParams.id === winnerData.id) {
          res.push({
            wins: winnerData.wins,
            time: winnerData.time,
            color: carParams.color,
            indexNumber: firstIndex + 1,
            name: carParams.name,
          });
        }
      });
    });

    console.log(this.resultWinnersDataList, `this.resultWinnersDataList`);
    res.forEach((resultWinnerData) => {
      console.log(resultWinnerData, `123`);
      const winner = new WinnersItem(resultWinnerData);
      const winnerElement = winner.getWinnerHtml();
      this.winnersTableBody.append(winnerElement);
    });
  }
}
