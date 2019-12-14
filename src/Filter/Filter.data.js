import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getYears, getGenres } from './Filter.utils';
import Filter from './Filter';

const FilterData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const {
        data: { media }
      } = await axios(process.env.API_URL);
      setData(media);
    }

    fetchData();
  }, []);

  const dataSorted = data.sort((a, b) => (a.title > b.title ? 1 : -1));
  const years = getYears(data);
  const genres = getGenres(data);
  return <Filter data={dataSorted} genres={genres} years={years} />;
};

export default FilterData;
