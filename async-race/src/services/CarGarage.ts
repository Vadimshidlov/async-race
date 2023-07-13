export type StartEngineType = {
    velocity: string;
    distance: string;
};

export type GetCarsType = {
    name: string;
    color: string;
    id: boolean;
};

export type UpdateCarType = {
    name: string;
    color: string;
    id: boolean;
};

export class CarGarage {
    private readonly garageUrl = 'http://127.0.0.1:3000/garage/';

    private readonly API_URL = 'http://127.0.0.1:3000/garage/';

    private readonly DEFAULT_CAR_LIMIT = 7;

    public async getCars(page = 1, limit = this.DEFAULT_CAR_LIMIT): Promise<GetCarsType[]> {
        const urlParams = `_page=${page}&_limit=${limit}`
        // let url: string;
        // if (page && limit) {
        //     url = `${this.garageUrl}_page=${page}&_limit=${limit}`;
        // } else {
        //     url = `http://127.0.0.1:3000${this.garageUrl}`;
        // }

        const response = await fetch(`${this.API_URL}?${urlParams}`);

        return response.json();
    }

    public async getCar(id: number): Promise<GetCarsType> {
        const url = `${this.garageUrl}${id}`;
        const response = await fetch(url);

        return response.json();
    }

    public async createCar(name: string, color: string): Promise<GetCarsType> {
        console.log(typeof name, `~~name`, typeof color, `~~car`)
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
