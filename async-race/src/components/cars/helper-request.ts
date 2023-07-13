import { StartDriveType, StartEngineType } from '../../services/CarEngine';

export async function helperRequest(): Promise<StartEngineType | StartDriveType> {
  // const url = 'http://127.0.0.1:3000/engine?id=1&status=started'; // +++ for car started engine
  const url = 'http://127.0.0.1:3000/engine?id=1&status=drive'; // +++ for car started drive
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application.json',
    },
  });
  // const response = await fetch(url);

  return response.json();
}
