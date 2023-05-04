const BASE_URl = 'https://pixabay.com/api/';
const KEY = '35972928-442e66beac26395ab9a996585';

const searchParams = new URLSearchParams({
  key: KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
});

export async function fetchSearchResult(searchElement, page) {
  const response = await fetch(
    `${BASE_URl}?${searchParams}&q=${searchElement}&page=${page}`
  );
  const arrayElements = await response.json();
  if (arrayElements.hits.length === 0) {
    throw new Error();
  }

  return arrayElements;
}

export async function fetchDownloadMore(searchElement, page) {
  const response = await fetch(
    `${BASE_URl}?${searchParams}&q=${searchElement}&page=${page}`
  );
  const arrayElements = await response.json();

  return arrayElements;
}
