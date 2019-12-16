import React from 'react';
import renderer from 'react-test-renderer';
import Filter from './Filter';
import { arrayToUpperCase, getGenres, getYears, filterData } from './Filter.utils';
import data from '../../seed/filter-data';

describe('Filter', () => {
  it('renders', () => {
    const component = renderer
      .create(<Filter data={data} years={getYears(data)} genres={getGenres(data)} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});

describe('Filter.utils', () => {
  it('#arrayToUpperCase capatilizes first letter of strings', () => {
    const arr = arrayToUpperCase(['this', 'that', 'theother']);
    expect(arr).toEqual(['This', 'That', 'Theother']);
  });

  it('#getGenres gets genres from data', () => {
    const genres = getGenres(data);
    expect(genres).toEqual([
      'Action',
      'Adventure',
      'Animation',
      'Biography',
      'Classics',
      'Comedy',
      'Crime',
      'Detective',
      'Dragons',
      'Drama',
      'Fantasy',
      'Food & drink',
      'History',
      'Horror',
      'Memoir',
      'Mystery',
      'Politics',
      'Sci-fi',
      'Science',
      'Thriller',
      'War',
      'Western'
    ]);
  });

  it('#getYears gets years from data', () => {
    const years = getYears(data);
    expect(years).toEqual([
      '1870',
      '1892',
      '1895',
      '1963',
      '1971',
      '1973',
      '1974',
      '1977',
      '1981',
      '1984',
      '1987',
      '1991',
      '1993',
      '1994',
      '1996',
      '1998',
      '2000',
      '2002',
      '2003',
      '2005',
      '2008',
      '2010',
      '2013',
      '2015'
    ]);
  });

  describe('#filterData', () => {
    it('filters by year', () => {
      expect(filterData(data, '', ['1981', '2010'], [], '')).toMatchSnapshot();
    });

    it('filters by genre', () => {
      expect(filterData(data, '', [], ['action', 'comedy'], '')).toMatchSnapshot();
    });

    it('filters by search string', () => {
      expect(filterData(data, '', [], [], 'raiders')).toMatchSnapshot();
      expect(filterData(data, '', [], [], 'terminator')).toMatchSnapshot();
    });

    it('filters multiple', () => {
      expect(filterData(data, 'movie', ['1991'], ['sci-fi'], 't')).toMatchSnapshot();
      expect(filterData(data, 'book', [], [], 'game of')).toMatchSnapshot();
    });
  });
});
