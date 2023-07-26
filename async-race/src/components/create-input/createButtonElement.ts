import createElement from '../element/createElement';

export function createButtonElement(text: string): HTMLButtonElement {
    const BUTTON = createElement<HTMLButtonElement>({tag: 'button', classNames: ['create-block__button'], text});

    return BUTTON
}
