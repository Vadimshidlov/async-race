import createElement from '../element/createElement';

export function createButtonElement(text: string): HTMLButtonElement {
    const buttonElement = createElement<HTMLButtonElement>({tag: 'button', classNames: ['create-block__button'], text});

    return buttonElement
}
