import {CommonService} from "./CommonService";

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

export class WinnersService extends CommonService implements IWinnersService {
    private readonly WINNERS_URL = '/winners';

    private DEFAULT_WINNERS_LIMIT = 10

    private readonly API_WINNERS_URL: string;

    constructor() {
        super();
        this.API_WINNERS_URL = `${this.API_URL}${this.WINNERS_URL}`
    }

    public async getWinnersCount(page = 1, limit = this.DEFAULT_WINNERS_LIMIT): Promise<number> {
        const URL_PARAMS = `_page=${page}&_limit=${limit}`;
        const GET_WINNERS_COUNT_URL = `${this.API_WINNERS_URL}?${URL_PARAMS}`
        const response = await fetch(GET_WINNERS_COUNT_URL);

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
        const GET_WINNERS_URL = `${this.API_WINNERS_URL}?${URL_PARAMS}`
        const response = await fetch(GET_WINNERS_URL);

        return response.json();
    }

    public async getWinner(id: number): Promise<WinnersType> {
        const URL_PARAMS = `/${id}`;
        const GET_WINNER_URL = `${this.API_WINNERS_URL}${URL_PARAMS}`
        const response = await fetch(GET_WINNER_URL);

        // TODO network error?
        if (!response.ok) {
            throw Error('This machine has never been a winner');
        }

        return response.json();
    }

    public async createWinner(id: number, wins: number, time: number): Promise<StartEngineType> {
        const response = await fetch(this.API_WINNERS_URL, {
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
        const URL_PARAMS = `/${id}`;
        const DELETE_WINNER_URL = `${this.API_WINNERS_URL}${URL_PARAMS}`
        const response = await fetch(DELETE_WINNER_URL, {
            method: 'DELETE',
        });

        return response.json();
    }

    public async updateWinner(id: number, wins: number, time: number): Promise<object> {
        const URL_PARAMS = `/${id}`;
        const UPDATE_WINNER_URL = `${this.API_WINNERS_URL}${URL_PARAMS}`
        const response = await fetch(UPDATE_WINNER_URL, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({wins, time}),
        });

        return response.json();
    }
}
