import React, { useState, useEffect } from 'react';
import { FiCircle, FiCheckCircle, FiChevronDown } from 'react-icons/fi';
import { typeArrayOf, typeString, typeFunc, typeBool } from '../../lib/prop-types';
import './SelectMulti.scss';

const SelectMulti = ({ options, placeholder, callback, reset }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (reset) {
      setSelected([]);
      setOpen(false);
    }
  }, [reset]);

  function onClickOption(option) {
    const newSelected = [...selected];
    const alreadySelected = selected.findIndex(s => s === option);

    if (alreadySelected > -1) {
      newSelected.splice(alreadySelected, 1);
    } else {
      newSelected.push(option);
    }

    setSelected(newSelected);
    return callback ? callback(newSelected) : null;
  }

  return (
    <div className="select-multi">
      <div
        className="placeholder"
        onClick={() => setOpen(!open)}
        role="button"
        tabIndex="-1"
      >
        <div className="text">{placeholder || 'Select an option'}</div>
        <div className="icon">
          <FiChevronDown />
        </div>
      </div>
      {!!open && (
        <div className="options animated animatedFadeInUp fadeInUp">
          {options.map(option => {
            return (
              <div
                key={option}
                className="option"
                onClick={() => onClickOption(option)}
                onKeyDown={() => onClickOption(option)}
                role="button"
                tabIndex="0"
              >
                <div className="icon">
                  {selected.includes(option) ? <FiCheckCircle /> : <FiCircle />}
                </div>
                <span className="text">{option}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

SelectMulti.defaultProps = {
  options: [],
  placeholder: null,
  callback: null,
  reset: false
};

SelectMulti.propTypes = {
  options: typeArrayOf(typeString),
  placeholder: typeString,
  callback: typeFunc,
  reset: typeBool
};

export default SelectMulti;
