import axios from 'axios';

  const URL = 'https://pixabay.com/api/';
  const API_KEY = '38945980-5028cf3f1e63b0c7bd529d7ec';

export default async function fetchImages(value, page) {

  return await axios.get(`${URL}?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`).then(response => response.data);
}