export default async function sendRequest(
  method: string,
  url: string,
  body = null,
): Promise<Response> {
  return fetch(url).then((response) => response.json());
}
