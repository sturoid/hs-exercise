import uniq from 'lodash.uniq';

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

export default arrayToUpperCase;
