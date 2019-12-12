import React from 'react';
import renderer from 'react-test-renderer';
import Filter from './Filter';

describe('Filter', () => {
  it('renders', () => {
    const component = renderer.create(<Filter />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
