import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

// FETCHING IMAGES

  const URL = 'https://pixabay.com/api/';
  const API_KEY = '38945980-5028cf3f1e63b0c7bd529d7ec';

async function fetchImages(value, page) {

  return await axios.get(`${URL}?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`).then(response => response.data);
}


const formEl = document.getElementById('search-form');
const galleryEl = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

let pageNumber = 1;
let currentHits = 0;
let searchQuery = '';

loadMore.style.display = 'none';

// GALLERY MARKUP


function galleryMarkup(images) {

    const markup = images
        .map(image => {
            
            return `
            <div class="photo-card">
             <a href="${image.largeImageURL}"><img class="photo" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy" width="360" height="240"/></a>
             <div class="info">
               <p class="info-item">
                 <b>Likes:</b> <span class="item-data"> ${image.likes} </span>
               </p>
               <p class="info-item">
                 <b>Views:</b> <span class="item-data">${image.views}</span>
               </p>
               <p class="info-item">
                 <b>Comments:</b> <span class="item-data">${image.comments}</span>
               </p>
               <p class="info-item">
                 <b>Downloads:</b> <span class="item-data">${image.downloads}</span>
               </p>
             </div>
            </div>
      `;
        })
        .join('');
    galleryEl.innerHTML += markup;
}

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    searchQuery = e.currentTarget.searchQuery.value;
    pageNumber = 1;

    if (searchQuery === '') {
        Notiflix.Notify.failure('Please enter the field!');
        return;
    }

    const response = await fetchImages(searchQuery, pageNumber);
    currentHits = response.hits.length;

    if (response.totalHits > 40) {
        loadMore.style.display = 'block';
    } else {
        loadMore.style.display = 'none';
    }

   
        if (response.totalHits === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }
        currentHits += response.hits.length;
        
        if (response.totalHits > 0) {
            Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
            galleryEl.innerHTML = '';
            galleryMarkup(response.hits);
            gallerySimpleLightbox.refresh();
        }

        
    }
)

loadMore.addEventListener('click', async () =>  {
    pageNumber +=1;
    const response = await fetchImages(searchQuery, pageNumber);
    galleryMarkup(response.hits);
    gallerySimpleLightbox.refresh();
    currentHits += response.hits.length;

    if ( response.totalHits < currentHits) {
        loadMore.style.display = 'none';
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }
})
