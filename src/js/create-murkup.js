export function createSearchSubjectMarkup(e) {
  return `<h2 class="search-subject">
      <p class="search-subject__text">You are looking for
        <span class="search-subject__span">${e}</span></p>
    </h2>`;
}


export function createArrayElementsMarkup(arrayElements) {
  return arrayElements
    .map(
      element => `<div class="photo-card">
        <a class="gallery__item" href="${element.largeImageURL}" data-lightbox="gallery">
          <img class="gallery__image" src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
        </a >
        <div class="info">
        <p class="info-item">
        <b>Likes</b>
        <b>${element.likes}</b>
        </p>
        <p class="info-item">
        <b>Views</b>
        <b>${element.views}</b>
        </p>
        <p class="info-item">
        <b>Comments</b>
        <b>${element.comments}</b>
        </p>
        <p class="info-item">
        <b>Downloads</b>
        <b>${element.downloads}</b>
        </p>
        </div>
        </div>`
    )
    .join('');
}

//1111111