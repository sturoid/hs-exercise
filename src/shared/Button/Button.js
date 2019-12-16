import React from 'react';
import { typeBool, typeFunc, typeChildren } from '../../lib/prop-types';
import './Button.scss';

function getClasses(primary, asLink, textUppercase) {
  let classes = 'btn';
  if (primary) classes += ' primary';
  if (textUppercase) classes += ' text-uppercase';
  if (asLink) classes += ' as-link';
  return classes;
}

const Button = ({ children, onClick, primary, textUppercase, asLink }) => {
  const classes = getClasses(primary, textUppercase, asLink);

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  onClick: null,
  primary: true,
  asLink: false,
  textUppercase: true
};

Button.propTypes = {
  children: typeChildren.isRequired,
  onClick: typeFunc,
  primary: typeBool,
  textUppercase: typeBool,
  asLink: typeBool
};

export default Button;
