import { ElementDataType } from '../types/types';

export type CreateElementType = HTMLElement | HTMLInputElement;

export default function createElement({ tag, classNames, text }: ElementDataType): HTMLElement {
  const element: HTMLElement = document.createElement(tag);
  element.classList.add(...classNames);
  element.textContent = text;

  return element;
}
