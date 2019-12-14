import React from 'react';
import './Wrapper.scss';
import { typeChildren } from '../../lib/prop-types';

const Wrapper = ({ children }) => {
  return <div className="wrapper">{children}</div>;
};

Wrapper.propTypes = {
  children: typeChildren.isRequired
};
export default Wrapper;
