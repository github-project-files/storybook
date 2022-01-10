// @flow

/**
 * @param {Object} base
 * @param {Object} state
 * @return {Object}
 */
const getDropdownIndicatorStyle = (base: Object, state: Object): Object => ({
  ...base,
  transition: 'all .2s ease',
  transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
});

export default getDropdownIndicatorStyle;
