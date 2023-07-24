export type StartEngineType = {
    velocity: string;
    distance: string;
};

export interface IEngineService {
    startEngine: (id: number) => Promise<StartEngineType>
    stopEngine: (id: number) => Promise<StartEngineType>
    driveEngine: (id: number) => Promise<Response>
}

export class EngineService implements IEngineService {
    private readonly engineUrl = '/engine';

    public async startEngine(id: number): Promise<StartEngineType> {
        const response = await fetch(`http://127.0.0.1:3000${this.engineUrl}?id=${id}&status=started`, {
            method: 'PATCH',
        });

        return response.json();
    }

    public async stopEngine(id: number): Promise<StartEngineType> {
        const response = await fetch(`http://127.0.0.1:3000${this.engineUrl}?id=${id}&status=stopped`, {
            method: 'PATCH',
        });

        return response.json();
    }

    public async driveEngine(id: number): Promise<Response> {
        const response = await fetch(`http://127.0.0.1:3000${this.engineUrl}?id=${id}&status=drive`, {
            method: 'PATCH',
        });

        if (!response.ok) {
            throw Error('Engine is break down')
        }

        return response;
    }
}
