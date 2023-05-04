import { fetchSearchResult } from './js/fetch-search-result';
import { fetchDownloadMore } from './js/fetch-search-result';

import { createSearchSubjectMarkup } from './js/create-murkup';
import { createArrayElementsMarkup } from './js/create-murkup';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  inputSearchItem: document.querySelector('input'),
  buttonSearch: document.querySelector('.search-form__btn'),
  searchSubjectContainer: document.querySelector(
    '.search-subject-container'
  ),
  gallery: document.querySelector('.gallery'),
  btnToTop: document.querySelector('.button-up'),
};

let page = 1;
let itemForSearch = '';
let varTotalHits = 0;
let isEndOfPage = true;

refs.buttonSearch.addEventListener('click', readingInputField);
refs.btnToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

window.addEventListener('scroll', () => {
  if (isEndOfPage) {
    const { scrollTop, scrollHeight, clientHeight } =
      document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      downloadMore();
    }
  }
});

function readingInputField(e) {
  e.preventDefault();
  removeMarkup(refs.gallery, refs.searchSubjectContainer);

  itemForSearch = refs.inputSearchItem.value;
  console.log(itemForSearch);
  page = 1;
  isEndOfPage = true;

  fetchSearchResult(itemForSearch, page)
    .then(arrayElements => {
      Notify.success(
        `Hooray! We found ${arrayElements.totalHits} images.`
      );

      varTotalHits = arrayElements.totalHits;
      varTotalHits = varTotalHits - arrayElements.hits.length;
      console.log(varTotalHits);

      addMarkup(
        refs.searchSubjectContainer,
        createSearchSubjectMarkup(itemForSearch)
      );
      console.log(arrayElements);

      addMarkup(
        refs.gallery,
        createArrayElementsMarkup(arrayElements.hits)
      );

      refs.btnToTop.classList.remove('is-hidden');

      gallery.refresh();
    })
    .catch(() => {
      refs.btnToTop.classList.add('is-hidden');
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });

  refs.inputSearchItem.value = '';
}

function downloadMore() {
  page = page + 1;

  if (varTotalHits <= 0) {
    Notify.warning(
      'We`re sorry, but you`ve reached the end of search results.'
    );
    isEndOfPage = false;
    return;
  }

  fetchDownloadMore(itemForSearch, page).then(arrayElements => {
    console.log(arrayElements);
    addMarkup(refs.gallery, createArrayElementsMarkup(arrayElements.hits));

    varTotalHits = varTotalHits - arrayElements.hits.length;
    console.log(varTotalHits);

    gallery.refresh();

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 1.8,
      behavior: 'smooth',
    });
  });
}

function addMarkup(ref, markup) {
  ref.insertAdjacentHTML('beforeend', markup);
}

function removeMarkup(...refs) {
  refs.forEach(ref => {
    ref.innerHTML = '';
  });
}
