export type StartEngineType = {
  velocity: string;
  distance: string;
};

export type StartDriveType = {
  success: boolean;
};

export class CarGarage {
  private readonly engineUrl = '/garage';

  public async getCars(id: number): Promise<StartEngineType> {
    const response = await fetch(`http://127.0.0.1:3000${this.engineUrl}/id=${id}&status=started`);

    return response.json();
  }

  public async stopEgine(id: number): Promise<StartEngineType> {
    const response = await fetch(`http://127.0.0.1:3000${this.engineUrl}/id=${id}&status=stopped`);

    return response.json();
  }

  public async driveEgine(id: number): Promise<StartEngineType> {
    const response = await fetch(`http://127.0.0.1:3000${this.engineUrl}/id=${id}&status=drive`);

    return response.json();
  }
}
