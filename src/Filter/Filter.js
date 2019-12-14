import React from 'react';
import { typeMedia } from '../lib/prop-types';
import { Grid, Button } from '../shared';

const Filter = ({ data }) => {
  return (
    <section>
      <FilterHead />
      <FilterContent data={data} />
    </section>
  );
};

Filter.propTypes = {
  data: typeMedia.isRequired
};

const FilterHead = () => {
  return (
    <div className="filter-head">
      <Grid.Row>
        <Grid.Left>
          <select>
            <option value="Action">Action</option>
          </select>
          <select>
            <option value="2010">2010</option>
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

const FilterContent = ({ data, years, genres }) => {
  return (
    <div className="filter-content">
      {data.map(d => {
        return (
          <div className="filter-item">
            <img className="poster" src={d.poster} alt="poster" />
            <div className="title">{`${d.title} (${d.year})`}</div>
            <div className="genre-list">
              {d.genre
                .map(string => string[0].toUpperCase() + string.slice(1))
                .join(', ')}
            </div>
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
