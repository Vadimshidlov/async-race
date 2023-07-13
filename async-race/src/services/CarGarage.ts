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

  public async getCars(page?: number, limit?: number): Promise<GetCarsType[]> {
    let url: string;
    if (page && limit) {
      url = `${this.garageUrl}_page=${page}&_limit=${limit}`;
    } else {
      url = `http://127.0.0.1:3000${this.garageUrl}`;
    }

    const response = await fetch(url);

    return response.json();
  }

  public async getCar(id: number): Promise<GetCarsType> {
    const url = `${this.garageUrl}${id}`;
    const response = await fetch(url);

    return response.json();
  }

  public async createCar(name: string, color: string): Promise<GetCarsType> {
    const response = await fetch(this.garageUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ name, color }),
    });

    return response.json();
  }

  public async deleteCar(id: number): Promise<object> {
    const url = `${this.garageUrl}${id}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
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
      body: JSON.stringify({ name, color }),
    });

    return response.json();
  }
}
