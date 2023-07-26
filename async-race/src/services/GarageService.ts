import {CommonService} from "./CommonService";

export type StartEngineType = {
    velocity: string;
    distance: string;
};

export type GetCarsType = {
    name: string;
    color: string;
    id: number;
};

export type UpdateCarType = {
    name: string;
    color: string;
    id: number;
};

export interface IGarageService {
    getCountCars: (page: number, limit: number) => Promise<number>
    getCars: (page: number, limit: number) => Promise<GetCarsType[]>
    getCar: (id: number) => Promise<GetCarsType>
    createCar: (name: string, color: string) => Promise<GetCarsType>
    deleteCar: (id: number) => Promise<object>
    updateCar: (id: number, name: string, color: string) => Promise<UpdateCarType>
}

export class GarageService extends CommonService implements IGarageService {
    private readonly GARAGE_URL = '/garage';

    private readonly DEFAULT_CAR_LIMIT = 7;

    private readonly API_GARAGE_URL: string;

    constructor() {
        super();
        this.API_GARAGE_URL = `${this.API_URL}${this.GARAGE_URL}`
    }

    public async getCountCars(page = 1, limit = this.DEFAULT_CAR_LIMIT): Promise<number> {
        const URL_PARAMS = `_page=${page}&_limit=${limit}`;
        const response = await fetch(`${this.API_GARAGE_URL}?${URL_PARAMS}`);

        return Number(response.headers.get('X-Total-Count'));
    }

    public async getCars(page = 1, limit = this.DEFAULT_CAR_LIMIT): Promise<GetCarsType[]> {
        const URL_PARAMS = `_page=${page}&_limit=${limit}`;
        const response = await fetch(`${this.API_GARAGE_URL}?${URL_PARAMS}`);

        return response.json();
    }

    public async getCar(id: number): Promise<GetCarsType> {
        const URL_PARAMS = `/${id}`;
        const response = await fetch(`${this.API_GARAGE_URL}${URL_PARAMS}`);

        return response.json();
    }

    public async createCar(name: string, color: string): Promise<GetCarsType> {
        const response = await fetch(this.API_GARAGE_URL, {
            body: JSON.stringify({name, color}),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });

        return response.json();
    }

    public async deleteCar(id: number): Promise<object> {
        const URL_PARAMS = `/${id}`;
        const response = await fetch(`${this.API_GARAGE_URL}${URL_PARAMS}`, {
            method: 'DELETE',
        });

        return response.json();
    }

    public async updateCar(id: number, name: string, color: string): Promise<UpdateCarType> {
        const URL_PARAMS = `/${id}`;
        const response = await fetch(`${this.API_GARAGE_URL}${URL_PARAMS}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({name, color}),
        });

        return response.json();
    }
}
