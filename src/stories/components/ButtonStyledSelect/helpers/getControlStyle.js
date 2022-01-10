// @flow

/**
 * @param {string} width
 * @return {Function}
 */
const getControlStyle = (width: string): Function => (base: Object): Object => ({
  ...base,
  height: '40',
  minWidth: width || '150',
  borderRadius: '4',
  fontSize: '14',
  fontWeight: '600',
  textAlign: 'center',
  boxShadow: 0,
  '& > div': {
    justifyContent: 'center',
  },
});

export default getControlStyle;
