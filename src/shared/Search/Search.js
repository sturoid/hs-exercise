import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './Search.scss';
import { typeString, typeFunc, typeAny } from '../../lib/prop-types';

const Search = ({ name, fieldRef, onChange }) => {
  return (
    <div className="search">
      <input name={name || 'search'} ref={fieldRef} onChange={onChange} />
      <div className="icon">
        <FaSearch />
      </div>
    </div>
  );
};

Search.defaultProps = {
  name: 'search',
  fieldRef: null,
  onChange: null
};

Search.propTypes = {
  name: typeString,
  fieldRef: typeAny,
  onChange: typeFunc
};

export default Search;
