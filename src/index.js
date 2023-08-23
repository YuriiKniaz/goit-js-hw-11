import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchImages from './js/pixabay-api';
import { galleryMarkup } from './js/gallery-markup';

const formEl = document.getElementById('search-form');
const galleryEl = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

let pageNumber = 1;
let currentHits = 0;
let searchQuery = '';

loadMore.style.display = 'none';

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    searchQuery = e.currentTarget.searchQuery.value;
    pageNumber = 1;
    galleryEl.innerHTML = '';

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

    if (response.totalHits < currentHits) {
        loadMore.style.display = 'none';
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }
})
