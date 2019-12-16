import React from 'react';
import { typeString, typeFunc, typeBool } from '../../lib/prop-types';
import './Radio.scss';

const Radio = ({ name, label, value, checked, onChange }) => {
  return (
    <div className="radio">
      <label htmlFor={value}>
        <input
          type="radio"
          name={name}
          onChange={onChange}
          value={value}
          id={value}
          checked={checked}
        />
        {label || value}
      </label>
    </div>
  );
};

Radio.defaultProps = {
  onChange: null,
  label: null,
  checked: false
};

Radio.propTypes = {
  name: typeString.isRequired,
  value: typeString.isRequired,
  checked: typeBool,
  onChange: typeFunc,
  label: typeString
};

export default Radio;
