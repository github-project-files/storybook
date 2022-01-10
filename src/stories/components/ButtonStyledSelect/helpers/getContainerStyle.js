// @flow

/**
 * @param {string} width
 * @return {Function}
 */
const getContainerStyle = (width: string): Function => (base: Object): Object => ({
  ...base,
  width: width || '150',
});

export default getContainerStyle;
