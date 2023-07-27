import { ElementDataType } from '../types/types';

export default function createElement<T extends HTMLElement>({
  tag,
  classNames,
  text,
}: ElementDataType): T {
  const ELEMENT = <T>document.createElement(tag);
  ELEMENT.classList.add(...classNames);
  ELEMENT.textContent = text;

  return ELEMENT;
}
