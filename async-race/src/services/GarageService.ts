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

export class GarageService implements IGarageService {
    private readonly garageUrl = 'http://127.0.0.1:3000/garage/';

    private readonly API_URL = 'http://127.0.0.1:3000/garage/';

    private readonly DEFAULT_CAR_LIMIT = 7;

    public async getCountCars(page = 1, limit = this.DEFAULT_CAR_LIMIT): Promise<number> {
        const urlParams = `_page=${page}&_limit=${limit}`;
        const response = await fetch(`${this.API_URL}?${urlParams}`);

        return Number(response.headers.get('X-Total-Count'));
    }

    public async getCars(page = 1, limit = this.DEFAULT_CAR_LIMIT): Promise<GetCarsType[]> {
        const urlParams = `_page=${page}&_limit=${limit}`;
        const response = await fetch(`${this.API_URL}?${urlParams}`);

        return response.json();
    }

    public async getCar(id: number): Promise<GetCarsType> {
        const url = `${this.garageUrl}${id}`;
        const response = await fetch(url);

        return response.json();
    }

    public async createCar(name: string, color: string): Promise<GetCarsType> {
        const response = await fetch(this.garageUrl, {
            body: JSON.stringify({name, color}),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });

        return response.json();
    }

    public async deleteCar(id: number): Promise<object> {
        const url = `${this.garageUrl}${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
        });

        return response.json();
    }

    public async updateCar(id: number, name: string, color: string): Promise<UpdateCarType> {
        const url = `${this.garageUrl}${id}`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({name, color}),
        });

        return response.json();
    }
}
