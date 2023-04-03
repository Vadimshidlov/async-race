//  ____________SLIDER_________________________________________________________________

const btnLeft = document.querySelector('.block-friends__arrow');
const btnRight = document.querySelector('.block-friends__arrow_right');
const slider = document.querySelector('.block-friends__cards');
const itemLeft = document.querySelector('#left-part');
const itemRight = document.querySelector('#right-part');
let active = document.querySelector('#active-part');

const dataPetsSlider = [
    {
        name: 'Katrine',
        img: '../../assets/images/friends/pets-katrine.jpg',
        isPrint: false,
        id: 0,
    },
    {
        name: 'Jennifer',
        img: '../../assets/images/friends/pets-jennifer.jpg',
        isPrint: false,
        id: 1,
    },
    {
        name: 'Woody',
        img: '../../assets/images/friends/pets-woody.jpg',
        isPrint: false,
        id: 2,
    },
    {
        name: 'Sophia',
        img: '../../assets/images/friends/sophia.jpg',
        isPrint: false,
        id: 3,
    },
    {
        name: 'Timmy',
        img: '../../assets/images/friends/pets-timmy.jpg',
        isPrint: false,
        id: 4,
    },
    {
        name: 'Charly',
        img: '../../assets/images/friends/pets-charly.jpg',
        isPrint: false,
        id: 5,
    },
    {
        name: 'Scarlett',
        img: '../../assets/images/friends/pets-scarlet.jpg',
        isPrint: false,
        id: 6,
    },
    {
        name: 'Freddie',
        img: '../../assets/images/friends/pets-freddie.jpg',
        isPrint: false,
        id: 7,
    },
];

// function get Random Pets Numbers (identeficators)
function getRandomPetsNumbers() {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7];
    const res = [];
    const arrLeft = [];
    const arrActive = [];
    const arrRight = [];

    if (window.innerWidth > 900) {
        while (arrLeft.length < 3) {
            let num = Math.floor(Math.random() * 8);
            if (arrLeft.indexOf(num) === -1) {
                arrLeft.push(num);
            }
        }

        while (arrActive.length < 3) {
            let num = Math.floor(Math.random() * 8);
            if (arrLeft.indexOf(num) === -1 && arrActive.indexOf(num) === -1) {
                arrActive.push(num);
            }
        }

        for (let i = 0; i < arr.length; i++) {
            if (arrLeft.indexOf(arr[i]) === -1 && arrActive.indexOf(arr[i]) === -1) {
                arrRight.push(arr[i]);
            }
        }

        arrRight.push(arrLeft[0]);
        res.push(arrLeft, arrActive, arrRight);
        return res;
    }
    if (window.innerWidth <= 900) {
        while (arrLeft.length < 2) {
            let num = Math.floor(Math.random() * 8);
            if (arrLeft.indexOf(num) === -1) {
                arrLeft.push(num);
            }
        }

        while (arrActive.length < 2) {
            let num = Math.floor(Math.random() * 8);
            if (arrLeft.indexOf(num) === -1 && arrActive.indexOf(num) === -1) {
                arrActive.push(num);
            }
        }

        for (let i = 0; i < arr.length; i++) {
            if (arrLeft.indexOf(arr[i]) === -1 && arrActive.indexOf(arr[i]) === -1) {
                arrRight.push(arr[i]);
            }
        }

        res.push(arrLeft, arrActive, arrRight);
        return res;
    }
}

// function getRandomCards for first render
function getRandomCards() {
    const arrays = getRandomPetsNumbers();
    if (window.innerWidth > 900) {
        //left_1
        const newCardLeftWrapper = document.createElement('div');
        newCardLeftWrapper.classList.add('block-friends__cards_left-part');
        newCardLeftWrapper.id = 'left-part';

        const newCardLeft1 = document.createElement('div');
        newCardLeft1.classList.add('block-friends__card');
        newCardLeft1.id = `${dataPetsSlider[arrays[0][0]].id}`;
        const img1_1 = document.createElement('img');
        img1_1.src = `${dataPetsSlider[arrays[0][0]]['img']}`;
        img1_1.classList.add('block-friends__card-picture');
        const div1_1 = document.createElement('div');
        div1_1.innerText = `${dataPetsSlider[arrays[0][0]].name}`;
        div1_1.id = `${dataPetsSlider[arrays[0][0]].id}`;
        div1_1.classList.add('block-friends__card-text');

        const btn1_1 = document.createElement('button');
        btn1_1.id = `${dataPetsSlider[arrays[0][0]].id}`;
        btn1_1.innerText = 'Learn more';
        btn1_1.classList.add('block-friends__card-btn'); //! --------------------------
        newCardLeft1.appendChild(img1_1);
        newCardLeft1.appendChild(div1_1);
        newCardLeft1.appendChild(btn1_1);
        newCardLeftWrapper.appendChild(newCardLeft1);

        //left_2

        const newCardLeft2 = document.createElement('div');
        newCardLeft2.classList.add('block-friends__card');
        newCardLeft2.id = `${dataPetsSlider[arrays[0][1]].id}`;

        const img1_2 = document.createElement('img');
        img1_2.classList.add('block-friends__card-picture');

        img1_2.src = `${dataPetsSlider[arrays[0][1]]['img']}`;

        const div1_2 = document.createElement('div');
        div1_2.innerText = `${dataPetsSlider[arrays[0][1]].name}`;
        div1_2.classList.add('block-friends__card-text');

        const btn1_2 = document.createElement('button');
        btn1_2.innerText = 'Learn more';
        btn1_2.classList.add('block-friends__card-btn');
        newCardLeft2.appendChild(img1_2);
        newCardLeft2.appendChild(div1_2);
        newCardLeft2.appendChild(btn1_2);
        newCardLeftWrapper.appendChild(newCardLeft2);

        //left_3

        const newCardLeft3 = document.createElement('div');
        newCardLeft3.classList.add('block-friends__card');
        newCardLeft3.id = `${dataPetsSlider[arrays[0][2]].id}`;

        const img1_3 = document.createElement('img');
        img1_3.classList.add('block-friends__card-picture');

        img1_3.src = `${dataPetsSlider[arrays[0][2]]['img']}`;

        const div1_3 = document.createElement('div');
        div1_3.innerText = `${dataPetsSlider[arrays[0][2]].name}`;
        div1_3.classList.add('block-friends__card-text');

        const btn1_3 = document.createElement('button');
        btn1_3.innerText = 'Learn more';
        btn1_3.classList.add('block-friends__card-btn');
        newCardLeft3.appendChild(img1_3);
        newCardLeft3.appendChild(div1_3);
        newCardLeft3.appendChild(btn1_3);
        newCardLeftWrapper.appendChild(newCardLeft3);

        //active_part
        //active_1
        const newCardACtiveWrapper = document.createElement('div');
        newCardACtiveWrapper.classList.add('block-friends__cards_active-part');
        newCardACtiveWrapper.id = 'active-part';

        const newCardActive1 = document.createElement('div');
        newCardActive1.classList.add('block-friends__card');
        newCardActive1.id = `${dataPetsSlider[arrays[1][0]].id}`; //!-------------

        const img2_1 = document.createElement('img');
        img2_1.classList.add('block-friends__card-picture');
        img2_1.src = `${dataPetsSlider[arrays[1][0]]['img']}`;

        const div2_1 = document.createElement('div');
        div2_1.innerText = `${dataPetsSlider[arrays[1][0]].name}`;
        div2_1.classList.add('block-friends__card-text');

        const btn2_1 = document.createElement('button');
        btn2_1.innerText = 'Learn more';
        btn2_1.classList.add('block-friends__card-btn');
        newCardActive1.appendChild(img2_1);
        newCardActive1.appendChild(div2_1);
        newCardActive1.appendChild(btn2_1);
        newCardACtiveWrapper.appendChild(newCardActive1);

        //active_2

        const newCardActive2 = document.createElement('div');
        newCardActive2.classList.add('block-friends__card');
        newCardActive2.id = `${dataPetsSlider[arrays[1][1]].id}`; //!-------------

        const img2_2 = document.createElement('img');
        img2_2.classList.add('block-friends__card-picture');

        img2_2.src = `${dataPetsSlider[arrays[1][1]]['img']}`;

        const div2_2 = document.createElement('div');
        div2_2.innerText = `${dataPetsSlider[arrays[1][1]].name}`;
        div2_2.classList.add('block-friends__card-text');

        const btn2_2 = document.createElement('button');
        btn2_2.innerText = 'Learn more';
        btn2_2.classList.add('block-friends__card-btn');
        newCardActive2.appendChild(img2_2);
        newCardActive2.appendChild(div2_2);
        newCardActive2.appendChild(btn2_2);
        newCardACtiveWrapper.appendChild(newCardActive2);

        //active_3

        const newCardActive3 = document.createElement('div');
        newCardActive3.classList.add('block-friends__card');
        newCardActive3.id = `${dataPetsSlider[arrays[1][2]].id}`; //!-------------

        const img2_3 = document.createElement('img');
        img2_3.classList.add('block-friends__card-picture');

        img2_3.src = `${dataPetsSlider[arrays[1][2]]['img']}`;

        const div2_3 = document.createElement('div');
        div2_3.innerText = `${dataPetsSlider[arrays[1][2]].name}`;
        div2_3.classList.add('block-friends__card-text');

        const btn2_3 = document.createElement('button');
        btn2_3.innerText = 'Learn more';
        btn2_3.classList.add('block-friends__card-btn');
        newCardActive3.appendChild(img2_3);
        newCardActive3.appendChild(div2_3);
        newCardActive3.appendChild(btn2_3);
        newCardACtiveWrapper.appendChild(newCardActive3);

        //right_part
        //right_1
        const newCardRightWrapper = document.createElement('div');
        newCardRightWrapper.classList.add('block-friends__cards_right-part');
        newCardRightWrapper.id = 'right-part';

        const newCardARight1 = document.createElement('div');
        newCardARight1.classList.add('block-friends__card');
        newCardARight1.id = `${dataPetsSlider[arrays[2][0]].id}`; //!-------------

        const img3_1 = document.createElement('img');
        img3_1.classList.add('block-friends__card-picture');

        img3_1.src = `${dataPetsSlider[arrays[2][0]]['img']}`;

        const div3_1 = document.createElement('div');
        div3_1.innerText = `${dataPetsSlider[arrays[2][0]].name}`;
        div3_1.classList.add('block-friends__card-text');

        const btn3_1 = document.createElement('button');
        btn3_1.innerText = 'Learn more';
        btn3_1.classList.add('block-friends__card-btn');
        newCardARight1.appendChild(img3_1);
        newCardARight1.appendChild(div3_1);
        newCardARight1.appendChild(btn3_1);
        newCardRightWrapper.appendChild(newCardARight1);

        //right_2

        const newCardARight2 = document.createElement('div');
        newCardARight2.classList.add('block-friends__card');
        newCardARight2.id = `${dataPetsSlider[arrays[2][1]].id}`;

        const img3_2 = document.createElement('img');
        img3_2.classList.add('block-friends__card-picture');

        img3_2.src = `${dataPetsSlider[arrays[2][1]]['img']}`;

        const div3_2 = document.createElement('div');
        div3_2.innerText = `${dataPetsSlider[arrays[2][1]].name}`;
        div3_2.classList.add('block-friends__card-text');

        const btn3_2 = document.createElement('button');
        btn3_2.innerText = 'Learn more';
        btn3_2.classList.add('block-friends__card-btn');
        newCardARight2.appendChild(img3_2);
        newCardARight2.appendChild(div3_2);
        newCardARight2.appendChild(btn3_2);
        newCardRightWrapper.appendChild(newCardARight2);

        //right_3

        const newCardARight3 = document.createElement('div');
        newCardARight3.classList.add('block-friends__card');
        newCardARight3.id = `${dataPetsSlider[arrays[2][2]].id}`;

        const img3_3 = document.createElement('img');
        img3_3.classList.add('block-friends__card-picture');

        img3_3.src = `${dataPetsSlider[arrays[2][2]]['img']}`;

        const div3_3 = document.createElement('div');
        div3_3.innerText = `${dataPetsSlider[arrays[2][2]].name}`;
        div3_3.classList.add('block-friends__card-text');

        const btn3_3 = document.createElement('button');
        btn3_3.innerText = 'Learn more';
        btn3_3.classList.add('block-friends__card-btn');
        newCardARight3.appendChild(img3_3);
        newCardARight3.appendChild(div3_3);
        newCardARight3.appendChild(btn3_3);
        newCardRightWrapper.appendChild(newCardARight3);
        const res = [];
        res.push(newCardLeftWrapper);
        res.push(newCardACtiveWrapper);
        res.push(newCardRightWrapper);
        return res;
    }
    if (window.innerWidth > 600 && window.innerWidth <= 900) {
        //----------------------
        //left_1
        const newCardLeftWrapper = document.createElement('div');
        newCardLeftWrapper.classList.add('block-friends__cards_left-part');
        newCardLeftWrapper.id = 'left-part';

        const newCardLeft1 = document.createElement('div');
        newCardLeft1.classList.add('block-friends__card');
        newCardLeft1.id = `${dataPetsSlider[arrays[0][0]].id}`;
        const img1_1 = document.createElement('img');
        img1_1.src = `${dataPetsSlider[arrays[0][0]]['img']}`;
        img1_1.classList.add('block-friends__card-picture');
        const div1_1 = document.createElement('div');
        div1_1.innerText = `${dataPetsSlider[arrays[0][0]].name}`;
        div1_1.id = `${dataPetsSlider[arrays[0][0]].id}`;
        div1_1.classList.add('block-friends__card-text');

        const btn1_1 = document.createElement('button');
        btn1_1.id = `${dataPetsSlider[arrays[0][0]].id}`;
        btn1_1.innerText = 'Learn more';
        btn1_1.classList.add('block-friends__card-btn'); //! --------------------------
        newCardLeft1.appendChild(img1_1);
        newCardLeft1.appendChild(div1_1);
        newCardLeft1.appendChild(btn1_1);
        newCardLeftWrapper.appendChild(newCardLeft1);

        //left_2

        const newCardLeft2 = document.createElement('div');
        newCardLeft2.classList.add('block-friends__card');
        newCardLeft2.id = `${dataPetsSlider[arrays[0][1]].id}`;

        const img1_2 = document.createElement('img');
        img1_2.classList.add('block-friends__card-picture');

        img1_2.src = `${dataPetsSlider[arrays[0][1]]['img']}`;

        const div1_2 = document.createElement('div');
        div1_2.innerText = `${dataPetsSlider[arrays[0][1]].name}`;
        div1_2.classList.add('block-friends__card-text');

        const btn1_2 = document.createElement('button');
        btn1_2.innerText = 'Learn more';
        btn1_2.classList.add('block-friends__card-btn');
        newCardLeft2.appendChild(img1_2);
        newCardLeft2.appendChild(div1_2);
        newCardLeft2.appendChild(btn1_2);
        newCardLeftWrapper.appendChild(newCardLeft2);

        //active_part
        //active_1
        const newCardACtiveWrapper = document.createElement('div');
        newCardACtiveWrapper.classList.add('block-friends__cards_active-part');
        newCardACtiveWrapper.id = 'active-part';

        const newCardActive1 = document.createElement('div');
        newCardActive1.classList.add('block-friends__card');
        newCardActive1.id = `${dataPetsSlider[arrays[1][0]].id}`; //!-------------

        const img2_1 = document.createElement('img');
        img2_1.classList.add('block-friends__card-picture');
        img2_1.src = `${dataPetsSlider[arrays[1][0]]['img']}`;

        const div2_1 = document.createElement('div');
        div2_1.innerText = `${dataPetsSlider[arrays[1][0]].name}`;
        div2_1.classList.add('block-friends__card-text');

        const btn2_1 = document.createElement('button');
        btn2_1.innerText = 'Learn more';
        btn2_1.classList.add('block-friends__card-btn');
        newCardActive1.appendChild(img2_1);
        newCardActive1.appendChild(div2_1);
        newCardActive1.appendChild(btn2_1);
        newCardACtiveWrapper.appendChild(newCardActive1);

        //active_2

        const newCardActive2 = document.createElement('div');
        newCardActive2.classList.add('block-friends__card');
        newCardActive2.id = `${dataPetsSlider[arrays[1][1]].id}`; //!-------------

        const img2_2 = document.createElement('img');
        img2_2.classList.add('block-friends__card-picture');

        img2_2.src = `${dataPetsSlider[arrays[1][1]]['img']}`;

        const div2_2 = document.createElement('div');
        div2_2.innerText = `${dataPetsSlider[arrays[1][1]].name}`;
        div2_2.classList.add('block-friends__card-text');

        const btn2_2 = document.createElement('button');
        btn2_2.innerText = 'Learn more';
        btn2_2.classList.add('block-friends__card-btn');
        newCardActive2.appendChild(img2_2);
        newCardActive2.appendChild(div2_2);
        newCardActive2.appendChild(btn2_2);
        newCardACtiveWrapper.appendChild(newCardActive2);

        //right_part
        //right_1
        const newCardRightWrapper = document.createElement('div');
        newCardRightWrapper.classList.add('block-friends__cards_right-part');
        newCardRightWrapper.id = 'right-part';

        const newCardARight1 = document.createElement('div');
        newCardARight1.classList.add('block-friends__card');
        newCardARight1.id = `${dataPetsSlider[arrays[2][0]].id}`; //!-------------

        const img3_1 = document.createElement('img');
        img3_1.classList.add('block-friends__card-picture');

        img3_1.src = `${dataPetsSlider[arrays[2][0]]['img']}`;

        const div3_1 = document.createElement('div');
        div3_1.innerText = `${dataPetsSlider[arrays[2][0]].name}`;
        div3_1.classList.add('block-friends__card-text');

        const btn3_1 = document.createElement('button');
        btn3_1.innerText = 'Learn more';
        btn3_1.classList.add('block-friends__card-btn');
        newCardARight1.appendChild(img3_1);
        newCardARight1.appendChild(div3_1);
        newCardARight1.appendChild(btn3_1);
        newCardRightWrapper.appendChild(newCardARight1);

        //right_2

        const newCardARight2 = document.createElement('div');
        newCardARight2.classList.add('block-friends__card');
        newCardARight2.id = `${dataPetsSlider[arrays[2][1]].id}`;

        const img3_2 = document.createElement('img');
        img3_2.classList.add('block-friends__card-picture');

        img3_2.src = `${dataPetsSlider[arrays[2][1]]['img']}`;

        const div3_2 = document.createElement('div');
        div3_2.innerText = `${dataPetsSlider[arrays[2][1]].name}`;
        div3_2.classList.add('block-friends__card-text');

        const btn3_2 = document.createElement('button');
        btn3_2.innerText = 'Learn more';
        btn3_2.classList.add('block-friends__card-btn');
        newCardARight2.appendChild(img3_2);
        newCardARight2.appendChild(div3_2);
        newCardARight2.appendChild(btn3_2);
        newCardRightWrapper.appendChild(newCardARight2);
        const res = [];
        res.push(newCardLeftWrapper);
        res.push(newCardACtiveWrapper);
        res.push(newCardRightWrapper);
        return res;
    }
    if (window.innerWidth <= 600) {
        //----------------------
        //left_1
        const newCardLeftWrapper = document.createElement('div');
        newCardLeftWrapper.classList.add('block-friends__cards_left-part');
        newCardLeftWrapper.id = 'left-part';

        const newCardLeft1 = document.createElement('div');
        newCardLeft1.classList.add('block-friends__card');
        newCardLeft1.id = `${dataPetsSlider[arrays[0][0]].id}`;
        const img1_1 = document.createElement('img');
        img1_1.src = `${dataPetsSlider[arrays[0][0]]['img']}`;
        img1_1.classList.add('block-friends__card-picture');
        const div1_1 = document.createElement('div');
        div1_1.innerText = `${dataPetsSlider[arrays[0][0]].name}`;
        div1_1.id = `${dataPetsSlider[arrays[0][0]].id}`;
        div1_1.classList.add('block-friends__card-text');

        const btn1_1 = document.createElement('button');
        btn1_1.id = `${dataPetsSlider[arrays[0][0]].id}`;
        btn1_1.innerText = 'Learn more';
        btn1_1.classList.add('block-friends__card-btn'); //! --------------------------
        newCardLeft1.appendChild(img1_1);
        newCardLeft1.appendChild(div1_1);
        newCardLeft1.appendChild(btn1_1);
        newCardLeftWrapper.appendChild(newCardLeft1);

        //active_part
        //active_1
        const newCardACtiveWrapper = document.createElement('div');
        newCardACtiveWrapper.classList.add('block-friends__cards_active-part');
        newCardACtiveWrapper.id = 'active-part';

        const newCardActive1 = document.createElement('div');
        newCardActive1.classList.add('block-friends__card');
        newCardActive1.id = `${dataPetsSlider[arrays[1][0]].id}`; //!-------------

        const img2_1 = document.createElement('img');
        img2_1.classList.add('block-friends__card-picture');
        img2_1.src = `${dataPetsSlider[arrays[1][0]]['img']}`;

        const div2_1 = document.createElement('div');
        div2_1.innerText = `${dataPetsSlider[arrays[1][0]].name}`;
        div2_1.classList.add('block-friends__card-text');

        const btn2_1 = document.createElement('button');
        btn2_1.innerText = 'Learn more';
        btn2_1.classList.add('block-friends__card-btn');
        newCardActive1.appendChild(img2_1);
        newCardActive1.appendChild(div2_1);
        newCardActive1.appendChild(btn2_1);
        newCardACtiveWrapper.appendChild(newCardActive1);

        //right_part
        //right_1
        const newCardRightWrapper = document.createElement('div');
        newCardRightWrapper.classList.add('block-friends__cards_right-part');
        newCardRightWrapper.id = 'right-part';

        const newCardARight1 = document.createElement('div');
        newCardARight1.classList.add('block-friends__card');
        newCardARight1.id = `${dataPetsSlider[arrays[2][0]].id}`; //!-------------

        const img3_1 = document.createElement('img');
        img3_1.classList.add('block-friends__card-picture');

        img3_1.src = `${dataPetsSlider[arrays[2][0]]['img']}`;

        const div3_1 = document.createElement('div');
        div3_1.innerText = `${dataPetsSlider[arrays[2][0]].name}`;
        div3_1.classList.add('block-friends__card-text');

        const btn3_1 = document.createElement('button');
        btn3_1.innerText = 'Learn more';
        btn3_1.classList.add('block-friends__card-btn');
        newCardARight1.appendChild(img3_1);
        newCardARight1.appendChild(div3_1);
        newCardARight1.appendChild(btn3_1);
        newCardRightWrapper.appendChild(newCardARight1);

        const res = [];
        res.push(newCardLeftWrapper);
        res.push(newCardACtiveWrapper);
        res.push(newCardRightWrapper);
        return res;
    }
}

//  slider go

const arrOfRandomPetsNumbers = getRandomCards();

// reload page unique pets

active.innerHTML = arrOfRandomPetsNumbers[1].innerHTML;
itemLeft.innerHTML = arrOfRandomPetsNumbers[0].innerHTML;
itemRight.innerHTML = arrOfRandomPetsNumbers[2].innerHTML;
const moveLeft = () => {
    slider.classList.add('transition-left');
    btnLeft.removeEventListener('click', moveLeft);
    btnRight.removeEventListener('click', moveRight);
};

const moveRight = () => {
    slider.classList.add('transition-right');
    btnLeft.removeEventListener('click', moveLeft);
    btnRight.removeEventListener('click', moveRight);
};

//create array with 3unique elements
function getRandomNumbers() {
    /* const arrLength = dataPetsSlider.filter(el => el.isPrint === true);
    console.log(arrLength);
    if (arrLength.length === 0) {
       dataPetsSlider.map(el => (el.isPrint = false));
    }
 
    const resTwo = []; */
    if (window.innerWidth > 900) {
        const res = [];

        while (res.length < 3) {
            let num = Math.floor(Math.random() * 8);
            if (dataPetsSlider[num].isPrint === false && res.indexOf(num) === -1) {
                res.push(num);
            }
        }

        return res;
    }
    if (window.innerWidth <= 900 && window.innerWidth > 600) {
        const res = [];

        while (res.length < 2) {
            let num = Math.floor(Math.random() * 8);
            if (dataPetsSlider[num].isPrint === false && res.indexOf(num) === -1) {
                res.push(num);
            }
        }

        return res;
    }
    if (window.innerWidth <= 600) {
        const res = [];

        while (res.length < 1) {
            let num = Math.floor(Math.random() * 8);
            if (dataPetsSlider[num].isPrint === false && res.indexOf(num) === -1) {
                res.push(num);
            }
        }

        return res;
    }
}

btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

function getRandomCard() {
    const randomNumbers = getRandomNumbers();

    if (window.innerWidth > 900) {
        const cards = document.createElement('div');
        cards.classList.add('block-friends__cards_left-part');
        const newCard1 = document.createElement('div');
        newCard1.classList.add('block-friends__card');
        newCard1.id = `${dataPetsSlider[randomNumbers[0]].id}`;

        const img = document.createElement('img');
        img.classList.add('block-friends__card-picture');

        img.src = `${dataPetsSlider[randomNumbers[0]]['img']}`;

        const div = document.createElement('div');
        div.innerText = `${dataPetsSlider[randomNumbers[0]].name}`;
        div.classList.add('block-friends__card-text');

        const btn = document.createElement('button');
        btn.innerText = 'Learn more';
        btn.classList.add('block-friends__card-btn');
        newCard1.appendChild(img);
        newCard1.appendChild(div);
        newCard1.appendChild(btn);

        // console.log(newCard1);

        //card_2
        const newCard2 = document.createElement('div');
        newCard2.classList.add('block-friends__card');
        newCard2.id = `${dataPetsSlider[randomNumbers[1]].id}`;

        const img2 = document.createElement('img');
        img2.classList.add('block-friends__card-picture');

        img2.src = `${dataPetsSlider[randomNumbers[1]]['img']}`;

        const div2 = document.createElement('div');
        div2.innerText = `${dataPetsSlider[randomNumbers[1]].name}`;
        div2.classList.add('block-friends__card-text');

        const btn2 = document.createElement('button');
        btn2.innerText = 'Learn more';
        btn2.classList.add('block-friends__card-btn');
        newCard2.appendChild(img2);
        newCard2.appendChild(div2);
        newCard2.appendChild(btn2);

        //card_3
        const newCard3 = document.createElement('div');
        newCard3.classList.add('block-friends__card');
        newCard3.id = `${dataPetsSlider[randomNumbers[2]].id}`;

        const img3 = document.createElement('img');
        img3.classList.add('block-friends__card-picture');

        img3.src = `${dataPetsSlider[randomNumbers[2]]['img']}`;

        const div3 = document.createElement('div');
        div3.innerText = `${dataPetsSlider[randomNumbers[2]].name}`;
        div3.classList.add('block-friends__card-text');

        const btn3 = document.createElement('button');
        btn3.innerText = 'Learn more';
        btn3.classList.add('block-friends__card-btn');
        newCard3.appendChild(img3);
        newCard3.appendChild(div3);
        newCard3.appendChild(btn3);

        cards.appendChild(newCard1);
        cards.appendChild(newCard2);
        cards.appendChild(newCard3);

        return cards;
    }

    if (window.innerWidth <= 900 && window.innerWidth > 600) {
        const cards = document.createElement('div');
        cards.classList.add('block-friends__cards_left-part');
        const newCard1 = document.createElement('div');
        newCard1.classList.add('block-friends__card');
        newCard1.id = `${dataPetsSlider[randomNumbers[0]].id}`;

        const img = document.createElement('img');
        img.classList.add('block-friends__card-picture');

        img.src = `${dataPetsSlider[randomNumbers[0]]['img']}`;

        const div = document.createElement('div');
        div.innerText = `${dataPetsSlider[randomNumbers[0]].name}`;
        div.classList.add('block-friends__card-text');

        const btn = document.createElement('button');
        btn.innerText = 'Learn more';
        btn.classList.add('block-friends__card-btn');
        newCard1.appendChild(img);
        newCard1.appendChild(div);
        newCard1.appendChild(btn);

        // console.log(newCard1);

        //card_2
        const newCard2 = document.createElement('div');
        newCard2.classList.add('block-friends__card');
        newCard2.id = `${dataPetsSlider[randomNumbers[1]].id}`;

        const img2 = document.createElement('img');
        img2.classList.add('block-friends__card-picture');

        img2.src = `${dataPetsSlider[randomNumbers[1]]['img']}`;

        const div2 = document.createElement('div');
        div2.innerText = `${dataPetsSlider[randomNumbers[1]].name}`;
        div2.classList.add('block-friends__card-text');

        const btn2 = document.createElement('button');
        btn2.innerText = 'Learn more';
        btn2.classList.add('block-friends__card-btn');
        newCard2.appendChild(img2);
        newCard2.appendChild(div2);
        newCard2.appendChild(btn2);

        cards.appendChild(newCard1);
        cards.appendChild(newCard2);

        return cards;
    }
    if (window.innerWidth <= 600) {
        const cards = document.createElement('div');
        cards.classList.add('block-friends__cards_left-part');
        const newCard1 = document.createElement('div');
        newCard1.classList.add('block-friends__card');
        newCard1.id = `${dataPetsSlider[randomNumbers[0]].id}`;

        const img = document.createElement('img');
        img.classList.add('block-friends__card-picture');

        img.src = `${dataPetsSlider[randomNumbers[0]]['img']}`;

        const div = document.createElement('div');
        div.innerText = `${dataPetsSlider[randomNumbers[0]].name}`;
        div.classList.add('block-friends__card-text');

        const btn = document.createElement('button');
        btn.innerText = 'Learn more';
        btn.classList.add('block-friends__card-btn');
        newCard1.appendChild(img);
        newCard1.appendChild(div);
        newCard1.appendChild(btn);
        cards.appendChild(newCard1);

        return cards;
    }
}

slider.addEventListener('animationend', animationEvent => {
    if (animationEvent.animationName === 'move-left') {
        slider.classList.remove('transition-left');

        document.querySelector('#right-part').innerHTML = document.querySelector('#active-part').innerHTML;
        document.querySelector('#active-part').innerHTML = itemLeft.innerHTML;

        function careteArrPrintId() {
            if (window.innerWidth > 900) {
                const res = [];
                res.push(document.querySelector('#active-part').childNodes[0].id);
                res.push(document.querySelector('#active-part').childNodes[1].id);
                res.push(document.querySelector('#active-part').childNodes[2].id);
                return res;
            }
            if (window.innerWidth <= 900 && window.innerWidth > 600) {
                const res = [];
                res.push(document.querySelector('#active-part').childNodes[0].id);
                res.push(document.querySelector('#active-part').childNodes[1].id);
                return res;
            }
            if (window.innerWidth <= 600) {
                const res = [];
                res.push(document.querySelector('#active-part').childNodes[0].id);
                return res;
            }
        }
        const arrPrintId = careteArrPrintId();
        for (let i = 0; i < arrPrintId.length; i++) {
            let currId = arrPrintId[i];
            for (let j = 0; j < dataPetsSlider.length; j++) {
                if (dataPetsSlider[j].id === Number(currId)) {
                    dataPetsSlider[j].isPrint = true;
                }
            }
        }
        console.log(dataPetsSlider);

        console.log(getRandomNumbers());

        itemLeft.innerHTML = '';
        itemLeft.innerHTML = getRandomCard().innerHTML;
        console.log(document.querySelector('#left-part').childNodes[1]);
        function careteArrPrintIdTwo() {
            if (window.innerWidth <= 600) {
                const res = [];

                res.push(document.querySelector('#left-part').childNodes[0].id);
                return res;
            }
            if (window.innerWidth <= 900 && window.innerWidth > 600) {
                const res = [];

                res.push(document.querySelector('#left-part').childNodes[0].id);
                res.push(document.querySelector('#left-part').childNodes[1].id);
                return res;
            }

            if (window.innerWidth > 900) {
                const res = [];

                res.push(document.querySelector('#left-part').childNodes[0].id);
                res.push(document.querySelector('#left-part').childNodes[1].id);
                res.push(document.querySelector('#left-part').childNodes[2].id);
                return res;
            }
        }

        console.log(careteArrPrintIdTwo());

        console.log(document.querySelector('#left-part').childNodes);

        const arrPrintIdTwo = careteArrPrintIdTwo();
        console.log(arrPrintIdTwo);
        if (window.innerWidth <= 900) {
            for (let i = 0; i < arrPrintIdTwo.length; i++) {
                let currId = arrPrintIdTwo[i];
                for (let j = 0; j < dataPetsSlider.length; j++) {
                    if (dataPetsSlider[j].id === Number(currId)) {
                        dataPetsSlider[j].isPrint = true;
                    }
                }
            }
        }

        console.log(dataPetsSlider);
        dataPetsSlider.map(el => (el.isPrint = false));

        // console.log(getRandomCard());
        // console.log(window.innerWidth);
    } else {
        slider.classList.remove('transition-right');
        document.querySelector('#left-part').innerHTML = document.querySelector('#active-part').innerHTML;
        document.querySelector('#active-part').innerHTML = itemRight.innerHTML;

        function careteArrPrintId() {
            if (window.innerWidth <= 600) {
                const res = [];
                res.push(document.querySelector('#active-part').childNodes[0].id);
                return res;
            }
            if (window.innerWidth <= 900 && window.innerWidth > 600) {
                const res = [];
                res.push(document.querySelector('#active-part').childNodes[0].id);
                res.push(document.querySelector('#active-part').childNodes[1].id);
                return res;
            }
            if (window.innerWidth > 900) {
                const res = [];
                res.push(document.querySelector('#active-part').childNodes[0].id);
                res.push(document.querySelector('#active-part').childNodes[1].id);
                res.push(document.querySelector('#active-part').childNodes[2].id);
                return res;
            }
        }

        const arrPrintId = careteArrPrintId();
        for (let i = 0; i < arrPrintId.length; i++) {
            let currId = arrPrintId[i];
            for (let j = 0; j < dataPetsSlider.length; j++) {
                if (dataPetsSlider[j].id === Number(currId)) {
                    dataPetsSlider[j].isPrint = true;
                }
            }
        }

        /* console.log(document.querySelector('#active-part').childNodes[0].id);
        console.log(document.querySelector('#active-part').childNodes[1].id);
        console.log(document.querySelector('#active-part').childNodes[2].id); */

        itemRight.innerHTML = '';
        itemRight.innerHTML = getRandomCard().innerHTML;

        function careteArrPrintIdTwo() {
            if (window.innerWidth <= 600) {
                const res = [];
                res.push(document.querySelector('#right-part').childNodes[0].id);
                return res;
            }
            if (window.innerWidth <= 900 && window.innerWidth > 600) {
                const res = [];
                res.push(document.querySelector('#right-part').childNodes[0].id);
                res.push(document.querySelector('#right-part').childNodes[1].id);
                return res;
            }
            if (window.innerWidth > 900) {
                const res = [];
                res.push(document.querySelector('#right-part').childNodes[0].id);
                res.push(document.querySelector('#right-part').childNodes[1].id);
                res.push(document.querySelector('#right-part').childNodes[2].id);
                return res;
            }
        }

        const arrPrintIdTwo = careteArrPrintIdTwo();
        console.log(arrPrintIdTwo);
        if (window.innerWidth <= 900) {
            for (let i = 0; i < arrPrintIdTwo.length; i++) {
                let currId = arrPrintIdTwo[i];
                for (let j = 0; j < dataPetsSlider.length; j++) {
                    if (dataPetsSlider[j].id === Number(currId)) {
                        dataPetsSlider[j].isPrint = true;
                    }
                }
            }
        }
        if (window.innerWidth > 900) {
            for (let i = 0; i < arrPrintIdTwo.length; i++) {
                let currId = arrPrintIdTwo[i];
                for (let j = 0; j < dataPetsSlider.length; j++) {
                    if (dataPetsSlider[j].id === Number(currId)) {
                        dataPetsSlider[j].isPrint = true;
                    }
                }
            }
        }
    }
    console.log(dataPetsSlider);
    dataPetsSlider.map(el => (el.isPrint = false));

    btnLeft.addEventListener('click', moveLeft);
    btnRight.addEventListener('click', moveRight);
});
