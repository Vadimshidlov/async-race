import {CommonService} from "./CommonService";

export type StartEngineType = {
    velocity: string;
    distance: string;
};

export interface IEngineService {
    startEngine: (id: number) => Promise<StartEngineType>
    stopEngine: (id: number) => Promise<StartEngineType>
    driveEngine: (id: number) => Promise<Response>
}

export class EngineService extends CommonService implements IEngineService {
    private readonly ENGINE_URL = '/engine';

    private readonly API_ENGINE_URL: string;

    constructor() {
        super();
        this.API_ENGINE_URL = `${this.API_URL}${this.ENGINE_URL}`
    }

    public async startEngine(id: number): Promise<StartEngineType> {
        const URL_PARAMS = `id=${id}&status=started`;
        const response = await fetch(`${this.API_ENGINE_URL}?${URL_PARAMS}`, {
            method: 'PATCH',
        });

        return response.json();
    }

    public async stopEngine(id: number): Promise<StartEngineType> {
        const URL_PARAMS = `id=${id}&status=stopped`;
        const response = await fetch(`${this.API_ENGINE_URL}?${URL_PARAMS}`, {
            method: 'PATCH',
        });

        return response.json();
    }

    public async driveEngine(id: number): Promise<Response> {
        const URL_PARAMS = `id=${id}&status=drive`;
        const response = await fetch(`${this.API_ENGINE_URL}?${URL_PARAMS}`, {
            method: 'PATCH',
        });

        if (!response.ok) {
            throw Error('Engine is break down')
        }

        return response;
    }
}
