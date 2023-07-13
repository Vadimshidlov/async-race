import {ElementDataType} from '../types/types';

// export type CreateElementType = HTMLElement | HTMLInputElement;

export default function createElement<T extends HTMLElement>({tag, classNames, text}: ElementDataType): T {
    const element = <T>document.createElement(tag);
    element.classList.add(...classNames);
    element.textContent = text;

    return element;
}
