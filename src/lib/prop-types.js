import {
  bool,
  string,
  arrayOf,
  oneOf,
  oneOfType,
  shape,
  any,
  node,
  func
} from 'prop-types';

export const typeBool = bool;
export const typeFunc = func;
export const typeAny = any;
export const typeStyle = shape();
export const typeString = string;
export const typeShape = shape;
export const typeOneOfType = oneOfType;
export const typeOneOf = oneOf;
export const typeArrayOf = arrayOf;

/** ***** React and package specific. ********* */

export const typeChildren = oneOfType([arrayOf(node), node, func, any]);

export const typeMedia = arrayOf(
  shape({
    title: string.isRequired,
    year: string.isRequired,
    poster: string.isRequired,
    genre: arrayOf(string).isRequired,
    type: string.isRequired
  })
);

export default typeString;
