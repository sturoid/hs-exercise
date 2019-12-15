import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import { typeMedia, typeArrayOf, typeString } from '../lib/prop-types';
import { Wrapper, Grid, Button, SelectMulti } from '../shared';
import { arrayToUpperCase } from './Filter.utils';
import './Filter.scss';

function filterData(data, selectedType, selectedYears, selectedGenres, searchString) {
  if (!selectedType && !selectedYears.length && !selectedGenres.length && !searchString)
    return data;
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

const Filter = ({ data, years, genres }) => {
  const [filteredData, setFilterData] = useState(data);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchString, setSearchString] = useState(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const newData = filterData(
      data,
      selectedType,
      selectedYears,
      selectedGenres,
      searchString
    );
    setFilterData(newData);
  }, [selectedType, selectedYears, selectedGenres, searchString]);

  function filterType({ target: { value } }) {
    setSelectedType(value.toLowerCase().substr(0, value.length - 1));
  }

  function filterYears(yearsFromSelect) {
    setSelectedYears(yearsFromSelect);
  }

  function filterGenres(genresFromSelect) {
    setSelectedGenres(genresFromSelect.map(g => g.toLowerCase()));
  }

  function filterTitle({ target: { value } }) {
    setSearchString(value);
  }

  function clearFilters() {
    setFilterData(data);
    setSelectedType(null);
    setSelectedYears([]);
    setSelectedGenres([]);
    setSearchString(null);
    setSelectedType(null);
    searchRef.current.value = '';
  }

  return (
    <Wrapper>
      <div className="filter-head">
        <Grid.Row>
          <Grid.Left>
            <SelectMulti
              options={years}
              callback={filterYears}
              reset={!selectedYears.length}
            />
            <SelectMulti
              options={genres}
              callback={filterGenres}
              reset={!selectedGenres.length}
            />
          </Grid.Left>

          <Grid.Right>
            <input type="search" name="search" ref={searchRef} onChange={filterTitle} />
          </Grid.Right>
        </Grid.Row>

        <Grid.Row>
          <Grid.Left>
            <div className="left">
              <label htmlFor="type">
                <input
                  type="radio"
                  name="type"
                  checked={selectedType === 'movie'}
                  value="Movies"
                  onChange={filterType}
                />
                Movies
              </label>
              <label htmlFor="type">
                <input
                  type="radio"
                  name="type"
                  checked={selectedType === 'book'}
                  value="Books"
                  onChange={filterType}
                />
                Books
              </label>
            </div>
          </Grid.Left>
          <Grid.Right>
            <div className="right">
              <Button asLink onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </Grid.Right>
        </Grid.Row>
      </div>

      <div className="filter-content">
        {filteredData.map(d => {
          return (
            <div key={d.title} className="filter-item">
              <img className="poster" src={d.poster} alt="poster" />
              <div className="title">{`${d.title} (${d.year})`}</div>
              <div className="genre-list">{arrayToUpperCase(d.genre).join(', ')}</div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

Filter.propTypes = {
  data: typeMedia.isRequired,
  years: typeArrayOf(typeString).isRequired,
  genres: typeArrayOf(typeString).isRequired
};

export default Filter;
