import React from 'react';
import { typeChildren } from '../../lib/prop-types';
import './Grid.scss';

const Row = ({ children }) => {
  return <div className="row">{children}</div>;
};

Row.propTypes = {
  children: typeChildren.isRequired
};

const Left = ({ children }) => {
  return <div className="row-left">{children}</div>;
};

Left.propTypes = {
  children: typeChildren.isRequired
};

const Right = ({ children }) => {
  return <div className="row-right">{children}</div>;
};

Right.propTypes = {
  children: typeChildren.isRequired
};

export default { Row, Left, Right };
