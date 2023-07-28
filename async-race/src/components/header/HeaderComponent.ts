import createElement from '../element/createElement';

import './header.scss';

export default function HeaderComponent(): HTMLElement {
    const header = createElement({tag: 'header', classNames: ['header', '_container'], text: ''});

    const headerTitleText = `It's time to Async-Race!`;
    const headerTitle = createElement({
        tag: 'h1',
        classNames: ['header__title'],
        text: headerTitleText,
    });

    header.append(headerTitle);

    return header;
}
