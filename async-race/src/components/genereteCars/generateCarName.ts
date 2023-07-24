const marksCarList: string[] = [
    'Audi',
    'BMW',
    'Ford',
    'Hyundai',
    'Kia',
    'Lada',
    'Mazda',
    'Mersedes',
    'Mitsubishi',
    'Nissan',
    'Renault',
    'Skoda',
    'Toyota',
    'Volkswagen',
    'Acura',
    'Daihatsu',
    'Datsun',
    'Honda',
    'Infiniti',
    'Isuzu',
    'Lexus',
    'Scion',
    'Subaru',
    'Suzuki',
    'Cadillac',
    'Chevrolet',
    'Chrysler',
    'Dodge',
    'GMC',
    'Hummer',
    'Jeep',
    'Lincoln',
    'Mercury',
    'Oldsmobile',
    'Pontiac',
    'Tesla',
    'ГАЗ',
    'Москвич',
    'ТагАЗ',
    'УАЗ',
];

const modelCarsList: string[] = [
    'Granta',
    'Kalina',
    'PRIORA',
    'LARGUS',
    'Kalina',
    'Siber',
    'A4 B5',
    'A6 C7',
    'Q7',
    '80',
    '100',
    'X5 e70',
    'Escalade',
    'SRX 2',
    'Aveo',
    'Captiva',
    'Cruze',
    'Epica',
    'Lacetti',
    'NIVA',
    'ORLANDO',
    'C4',
    'Caravan',
    'Grand Caravan',
    'Neon 2',
    'Fiesta',
    'Focus',
    'Civic 5D',
    'Matrix',
    'Grand Cherokee WK2',
    'Sportage 3',
    'Lancer 10',
    'Pajero 4',
    'Patrol',
    'Duster',
    'Logan',
    'Scenic 3',
    'Octavia A7',
    'Liana',
    'Corolla E160',
];

const MIN_RANGE_NUMBER = 0;
const MAX_RANGE_NUMBER = 40;

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomCarName(): string {
    const randomMarkNum = getRandomNumber(MIN_RANGE_NUMBER, MAX_RANGE_NUMBER);
    const randomModelNum = getRandomNumber(MIN_RANGE_NUMBER, MAX_RANGE_NUMBER);
    const mark = marksCarList[randomMarkNum];
    const model = modelCarsList[randomModelNum];

    return `${mark} ${model}`;
}
