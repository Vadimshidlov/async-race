export type StartEngineType = {
    velocity: string;
    distance: string;
};

export type StartDriveType = {
    success: boolean;
};

export class EngineService {
    private readonly engineUrl = '/engine';

    public async startEgine(id: number): Promise<StartEngineType> {
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
