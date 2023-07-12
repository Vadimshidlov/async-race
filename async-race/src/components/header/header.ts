import createElement from '../element/element-creator';
import './header.scss';

export default function getHeader(): HTMLElement {
  const header = createElement({ tag: 'header', classNames: ['header', '_container'], text: '' });

  const headerTitleText = `It's time to Async-Race!`;
  const headerTitle = createElement({
    tag: 'header',
    classNames: ['header__title'],
    text: headerTitleText,
  });

  header.append(headerTitle);

  return header;
}
