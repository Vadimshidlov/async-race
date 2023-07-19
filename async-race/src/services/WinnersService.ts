export type StartEngineType = {
  velocity: string;
  distance: string;
};

export type WinnersType = {
  id: number;
  wins: number;
  time: number;
};

export class Winners {
  private readonly winnersUrl = 'http://127.0.0.1:3000/winners/';

  public async getWinners(
    page?: number,
    limit?: number,
    sort?: string,
    order?: string,
  ): Promise<WinnersType[]> {
    let url: string;

    if (page && limit && sort && order) {
      // url = `http://127.0.0.1:3000/winners/_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
      url = `${this.winnersUrl}_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
    } else {
      url = this.winnersUrl;
    }

    const response = await fetch(url);

    return response.json();
  }

  public async getWinner(id: number): Promise<WinnersType> {
    const response = await fetch(`${this.winnersUrl}${id}`);

    return response.json();
  }

  public async createWinner(id: number, wins: number, time: number): Promise<StartEngineType> {
    const response = await fetch(this.winnersUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        id,
        wins,
        time,
      }),
    });

    return response.json();
  }

  public async deleteWinner(id: number): Promise<object> {
    const response = await fetch(`${this.winnersUrl}${id}`, {
      method: 'DELETE',
    });

    return response.json();
  }

  public async updateWinner(id: number, wins: number, time: number): Promise<object> {
    const response = await fetch(`${this.winnersUrl}${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({ wins, time }),
    });

    return response.json();
  }
}
