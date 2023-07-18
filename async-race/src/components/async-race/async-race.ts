import getHeader from '../header/header';
import '../../styles.scss';
import createElement from '../element/element-creator';

import {PageCOntroller} from '../PageController/PageController';
import {Garage} from '../garage/Garage';

export type RacePArtyType = () => Promise<number>;

export class AsyncRace {
    private body = document.body;

    private garage = new Garage();

    private garageElement = this.garage.getGarageHtml();

    private pageController = new PageCOntroller();

    private pageControllerElement = this.pageController.getPageControlleHTML();


    constructor() {
        this.getHtmlPAge();
        // this.addEventListeners();
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

    public getHtmlPAge(): void {
        const header: HTMLElement = getHeader();
        header.append(this.pageControllerElement);
        const main = createElement({
            tag: 'main',
            classNames: ['main', '_container'],
            text: '',
        });

        main.append(this.garageElement);

        this.body.append(header);
        this.body.append(main);
    }
}
