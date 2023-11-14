import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_btR3UsowCEmqzQAfuUUpkvhQeMRUEFthph8QqKLR0WsaOm0eayVCDA8OKe5nqwjG';

export function fetchBreeds() {
  const BASE_URL = `https://api.thecatapi.com`;
  const END_POINT = `/v1/breeds`;
  const url = `${BASE_URL}${END_POINT}`;
  return axios.get(url).then(res => res.data);
}

