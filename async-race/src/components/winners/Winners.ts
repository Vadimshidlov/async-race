import createElement from "../element/element-creator";
import './winners.scss'

export class WinnersTable {
    private winnersBlock: HTMLElement = createElement({
        tag: 'section',
        classNames: ['winners-block'],
        text: '',
    });

    private winnersTable: HTMLElement = createElement({
        tag: 'div',
        classNames: ['winners__table'],
        text: '',
    });

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
        winnersTitleBlock.append(winnersTitle)

        const winnersTitlePageBlock: HTMLElement = createElement({
            tag: 'div',
            classNames: ['"winners__page-title', ' page-title'],
            text: '',
        });

        const winnersTitlePage: HTMLElement = createElement({
            tag: 'h2',
            classNames: ['page-title__text'],
            text: 'Page: 2',
        });
        winnersTitlePageBlock.append(winnersTitlePage)

        this.winnersBlock.append(winnersTitleBlock, winnersTitlePageBlock, this.winnersTable)
    }

    public getWinnersHtml(): HTMLElement {
        return this.winnersBlock
    }
}
