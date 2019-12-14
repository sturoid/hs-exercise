import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';

function getYears(data) {
  return data.map(d => {
    return d.year;
  })
}

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
  return <Filter data={dataSorted} genres={getGenres(data)} years={getYears(data)} />;
};

export default FilterData;
