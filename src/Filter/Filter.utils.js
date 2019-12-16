import uniq from 'lodash.uniq';
import Fuse from 'fuse.js';

/**
 * @param {array} arr - array of strings.
 * @return {array} array with all first letter of strings capatilized.
 * > const arr = ['this', 'that' 'other'];
 * > arrayToUpperCase(arr);
 * > ['This', 'That', 'Other'];
 */
export function arrayToUpperCase(arr) {
  return arr.map(string => string[0].toUpperCase() + string.slice(1));
}

/**
 * @param {array} data - data array of media objects from API.
 * @return {array} array of unique and sorted years.
 * > const data = [{year: '1'}, {year: '2'}, {year: '3'}];
 * > getYears(arr);
 * > ['1', '2', '3'];
 */
export function getYears(data) {
  const years = uniq(data.map(d => d.year));
  return years.sort((a, b) => (Number(a) > Number(b) ? 1 : -1));
}

/**
 * @param {array} data - data array of media objects from API.
 * @return {array} array of unique and sorted genres.
 * > const data = [{genres: ['actions', 'comedy']}, {genres: ['action', 'comedy', 'horror]}];
 * > getGenres(arr);
 * > ['Action', 'Comedy', 'Horror'];
 */
export function getGenres(data) {
  const genres = uniq(data.flatMap(d => d.genre));
  const genresSorted = genres.sort((a, b) => (a > b ? 1 : -1));
  return arrayToUpperCase(genresSorted);
}

/**
 * @param {data} array - array of media objects from api.
 * @param {selectedType} string - type of media (book, movie).
 * @param {selectedYears} array - array of year strings.
 * @param {selectedGenres} array - array of genre strings.
 * @param {searchString} string - string from search input.
 * @return {array} filtered array of media objects based on passed in criteria.
 */
export function filterData(
  data,
  selectedType = null,
  selectedYears = [],
  selectedGenres = [],
  searchString = null
) {
  if (!selectedType && !selectedYears.length && !selectedGenres.length && !searchString) {
    return data;
  }

  let newData = data;

  if (selectedType) {
    newData = newData.filter(({ type }) => {
      return type === selectedType;
    });
  }

  if (selectedYears.length) {
    newData = newData.filter(({ year }) => {
      return selectedYears.includes(year);
    });
  }

  if (selectedGenres.length) {
    newData = newData.filter(({ genre }) => {
      return selectedGenres.some(selected => genre.includes(selected));
    });
  }

  if (searchString) {
    const fuse = new Fuse(newData, { keys: ['title'] });
    newData = fuse.search(searchString);
  }

  return newData;
}

export default arrayToUpperCase;
