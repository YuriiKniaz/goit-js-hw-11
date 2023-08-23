const galleryEl = document.querySelector('.gallery');

export function galleryMarkup(images) {

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
    galleryEl.insertAdjacentHTML('beforeend', markup);
}