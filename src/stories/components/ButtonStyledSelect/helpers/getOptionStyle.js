// @flow

import { colors } from 'utils/StyleGuide';

/**
 * @param {string} width
 * @return {Function}
 */
const getOptionStyle = (width: string): Function => (base: Object): Object => ({
  ...base,
  fontSize: '14',
  width: width || '150',
  backgroundColor: null,
  '&:hover': {
    color: colors.darkDodgerBlue,
    backgroundColor: colors.paleBlue,
  },
});

export default getOptionStyle;
