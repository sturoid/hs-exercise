import React, { useState, useEffect, useRef } from 'react';
import { typeMedia, typeArrayOf, typeString } from '../lib/prop-types';
import { Wrapper, Grid, Button, Radio, SelectMulti, Search } from '../shared';
import { arrayToUpperCase, filterData } from './Filter.utils';
import './Filter.scss';

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
    setSelectedType(value);
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
      <div className="filter">
        <div className="filter-head">
          <Grid.Row>
            <Grid.Left>
              <SelectMulti
                options={genres}
                placeholder="Genre"
                callback={filterGenres}
                reset={!selectedGenres.length}
              />
              <SelectMulti
                options={years}
                placeholder="Year"
                callback={filterYears}
                reset={!selectedYears.length}
              />
            </Grid.Left>

            <Grid.Right>
              <Search fieldRef={searchRef} onChange={filterTitle} />
            </Grid.Right>
          </Grid.Row>

          <Grid.Row>
            <Grid.Left>
              <Radio
                name="type"
                checked={selectedType === 'movie'}
                value="movie"
                label="Movies"
                onChange={filterType}
              />

              <Radio
                name="type"
                checked={selectedType === 'book'}
                value="book"
                label="Books"
                onChange={filterType}
              />
            </Grid.Left>
            <Grid.Right>
              <Button asLink onClick={clearFilters}>
                Clear Filters
              </Button>
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
