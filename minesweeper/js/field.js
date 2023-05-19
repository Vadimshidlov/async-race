import { getApp } from './app-page.js';
import ItemField from './fieldItem.js';

export function getRandomNubers(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

export const DATA = {
  firstBombPlace: {},
  clicksCount: 0,
};

const arrayBombsPlace = [];
const arrayWithoutBombs = [];
export const matrixArray = [];
export let clicksCount = 0;

export function incrementClickCount() {
  const clickCountDom = document.querySelector('.header__clicks')
  DATA.clicksCount += 1
  clickCountDom.innerHTML = `Clicks count: ${DATA.clicksCount}`;
}

function getBombs(arr, bombs, isFirstBombPlace) {
  isFirstBombPlace = DATA;
  let bombsCount = bombs;
  const matrixFieldHeight = arr.length;
  const matrixFieldWidth = arr[0].length;

  while (bombsCount) {
    const x = getRandomNubers(0, matrixFieldWidth - 1);
    const y = getRandomNubers(0, matrixFieldHeight);
    let current = arr[y][x];

    if (
      !current.isBomb &&
      x !== isFirstBombPlace.x &&
      y !== isFirstBombPlace.y
    ) {
      arr[y][x].content = '💣';
      arr[y][x].isBomb = true;
      arrayBombsPlace.push(arr[y][x]);
      bombsCount--;
    } else {
      arr[y][x].content = '';
    }
  }
}

function getStateOfArroundItems(arr, placeX, placeY) {
  const x = placeX;
  const y = placeY;
  // console.log(`go`, x, y)
  let count = 0;

  const item_1 = arr[x]?.[y - 1];
  const item_2 = arr[x - 1]?.[y - 1];
  const item_3 = arr[x - 1]?.[y];
  const item_4 = arr[x - 1]?.[y + 1];
  const item_5 = arr[x]?.[y + 1];
  const item_6 = arr[x + 1]?.[y + 1];
  const item_7 = arr[x + 1]?.[y];
  const item_8 = arr[x + 1]?.[y - 1];

  const arrayArround = [
    item_1,
    item_2,
    item_3,
    item_4,
    item_5,
    item_6,
    item_7,
    item_8,
  ].filter((item) => typeof item !== 'undefined');

  count = arrayArround.reduce((acc, el, i) => {
    acc += Boolean(el.isBomb) ? 1 : 0;
    return acc;
  }, 0);
  if (count !== 0) {
    matrixArray[x][y].content = count;
  }

  return arrayArround;
}

export function getMatrixField(
  width = 10,
  height = 10,
  bombs = 10,
  isFirstBombPlace = {}
) {
  matrixArray.length = 0;
  getApp();
  for (let i = 0; i < height; i++) {
    let curr = [];
    for (let j = 0; j < width; j++) {
      curr[j] = new ItemField(false, i, j, arrayBombsPlace);
      // curr[j].element.classList.add('field-item');
    }
    matrixArray.push(curr);
  }

  getBombs(matrixArray, bombs, isFirstBombPlace);

  matrixArray.forEach((el, x) => {
    el.forEach((el, y) => {
      if (el.content !== '💣') {
        // this.getStateOfArroundItems(this.array, x, y);
        el.getSingleItemStateArround(matrixArray, x, y);
      }
      if (x === isFirstBombPlace?.x && y === isFirstBombPlace?.y) {
        matrixArray[x][y].element.classList.add('field-item__active');
        matrixArray[x][y].element.dataset.opened = true;
        /* matrixArray[x][y].moveToBattlefield();
        matrixArray[x][y].getSingleItemStateArround(matrixArray, x, y);
        matrixArray[x][y].innerHTML = matrixArray[x][y].element.dataset.content; */
      }
    });
  });

  return matrixArray;
}

export function showAllItems() {
  const FIELD = document.querySelector('.body__field')
  const HEADER = document.querySelector('.header')
  const RESULT = document.createElement('div')
  const BODY = document.querySelector('body')
  RESULT.classList.add('header__result')
  RESULT.innerHTML = `Game over. Try again!`
  HEADER.append(RESULT)
  const BUTTON_RESTART = document.createElement('button')
  BUTTON_RESTART.classList.add('header__button')
  BUTTON_RESTART.innerHTML = 'Restart!'
  BUTTON_RESTART.addEventListener('click', ()=>{
    BODY.innerHTML = '';
    getFinallyBattlefield()
  })
  HEADER.append(BUTTON_RESTART)
  matrixArray.forEach((el, i) => {
    el.forEach((el, j) => {
      el.element.classList.add('field-item__active');
      el.element.innerHTML = el.element.dataset.content;
    });
  });
  console.log(FIELD.childNodes);
  FIELD.childNodes.forEach(item => {
    item.classList.add("disable-item")
  })
}

export function getFinallyBattlefield(width, height, bombsCount, data) {
  DATA.clicksCount = 0;
  getMatrixField(width, height, bombsCount, data);
  getArrayWithoutBombs();
  matrixArray.forEach((el, i) => {
    el.forEach((elTwo, j) => {
      if (i === data?.x && j === data?.y) {
        // elTwo.element.innerHTML = elTwo.element.dataset.content;
        const content = elTwo.content;
        elTwo.element.innerHTML = content;
        elTwo.element.dataset.opened = true;
        elTwo.element.classList.add('field-item__active');
      }

      elTwo.moveToBattlefield();
    });
  });
}

export function firstClickIsBomb(array, x, y) {
  array[x][y].content = '';
  array.forEach((el, i) => {
    el.forEach((elTwo, j) => {
      if ((elTwo.content === '' && i !== x, j !== y)) {
        // array[i][j].content = "💣";
        getStateOfArroundItems(array, i, j);
      }
    });
  });
}

function getArrayWithoutBombs() {
  matrixArray.forEach((el, i) => {
    el.forEach((el, j) => {
      if (el.content === '') {
        arrayWithoutBombs.push(el);
      }
    });
  });
}

getFinallyBattlefield();
