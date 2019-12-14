import React from 'react';
import { typeMedia, typeArrayOf, typeString } from '../lib/prop-types';
import { Grid, Button } from '../shared';
import { arrayToUpperCase } from './Filter.utils';

const Filter = ({ data, years, genres }) => {
  return (
    <section>
      <FilterHead years={years} genres={genres} />
      <FilterContent data={data} />
    </section>
  );
};

Filter.propTypes = {
  data: typeMedia.isRequired,
  years: typeArrayOf(typeString).isRequired,
  genres: typeArrayOf(typeString).isRequired
};

const FilterHead = ({ years, genres }) => {
  return (
    <div className="filter-head">
      <Grid.Row>
        <Grid.Left>
          <select>
            {years.map(year => {
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
          <select>
            {genres.map(genre => {
              return (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              );
            })}
          </select>
        </Grid.Left>

        <Grid.Right>
          <input type="search" />
        </Grid.Right>
      </Grid.Row>

      <Grid.Row>
        <Grid.Left>
          <div className="left">
            <label htmlFor="type">
              <input type="radio" name="type" value="Movies" />
              Movies
            </label>
            <label htmlFor="type">
              <input type="radio" name="type" value="Books" />
              Books
            </label>
          </div>
        </Grid.Left>
        <Grid.Right>
          <div className="right">
            <Button asLink onClick={() => null}>
              Clear Filters
            </Button>
          </div>
        </Grid.Right>
      </Grid.Row>
    </div>
  );
};

FilterHead.propTypes = {
  years: typeArrayOf(typeString).isRequired,
  genres: typeArrayOf(typeString).isRequired
};

const FilterContent = ({ data }) => {
  return (
    <div className="filter-content">
      {data.map(d => {
        return (
          <div key={d.title} className="filter-item">
            <img className="poster" src={d.poster} alt="poster" />
            <div className="title">{`${d.title} (${d.year})`}</div>
            <div className="genre-list">{arrayToUpperCase(d.genre).join(', ')}</div>
          </div>
        );
      })}
    </div>
  );
};

FilterContent.propTypes = {
  data: typeMedia.isRequired
};

export default Filter;

// {
//   "title": "The Other Guys",
//   "year": "2010",
//   "poster": "https://ia.media-imdb.com/images/M/MV5BMTc0NDQzNTA2Ml5BMl5BanBnXkFtZTcwNzI2OTQzMw@@._V1_.jpg",
//   "genre": [
//     "action",
//     "comedy",
//     "crime"
//   ],
//   "type": "movie"
// },
