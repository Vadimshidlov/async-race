export type StartEngineType = {
    velocity: string;
    distance: string;
};

export type WinnersType = {
    id: number;
    wins: number;
    time: number;
};

export type GetWinnersPropsType = {
    page: number,
    limit: number,
    sort: string,
    order: string,
}

export interface IWinnersService {
    getWinnersCount: (page: number, limit: number) => Promise<number>
    getWinners: (
        {
            page,
            limit,
            sort,
            order,
        }: GetWinnersPropsType
    ) => Promise<WinnersType[]>
    getWinner: (id: number) => Promise<WinnersType>
    createWinner: (id: number, wins: number, time: number) => Promise<StartEngineType>
    deleteWinner: (id: number) => Promise<object>
    updateWinner: (id: number, wins: number, time: number) => Promise<object>
}

export class WinnersService implements IWinnersService {
    private readonly WINNERS_URL = 'http://127.0.0.1:3000/winners';

    private DEFAULT_WINNERS_LIMIT = 10

    public async getWinnersCount(page = 1, limit = this.DEFAULT_WINNERS_LIMIT): Promise<number> {
        const urlParams = `_page=${page}&_limit=${limit}`;

        const response = await fetch(`${this.WINNERS_URL}?${urlParams}`);
        return Number(response.headers.get('X-Total-Count'));
    }

    public async getWinners(
        {
            page = 1,
            limit = this.DEFAULT_WINNERS_LIMIT,
            sort = 'time',
            order = 'ASC',
        }: GetWinnersPropsType
    ): Promise<WinnersType[]> {
        const URL_PARAMS = `_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
        const response = await fetch(`${this.WINNERS_URL}?${URL_PARAMS}`);

        return response.json();
    }

    public async getWinner(id: number): Promise<WinnersType> {
        const response = await fetch(`${this.WINNERS_URL}/${id}`);

        // TODO network error?
        if (!response.ok) {
            throw Error('This machine has never been a winner');
        }

        return response.json();
    }

    public async createWinner(id: number, wins: number, time: number): Promise<StartEngineType> {
        const response = await fetch(this.WINNERS_URL, {
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
        const response = await fetch(`${this.WINNERS_URL}/${id}`, {
            method: 'DELETE',
        });

        return response.json();
    }

    public async updateWinner(id: number, wins: number, time: number): Promise<object> {
        const response = await fetch(`${this.WINNERS_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({wins, time}),
        });

        return response.json();
    }
}
