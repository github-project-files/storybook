// @flow

import { colors } from 'utils/StyleGuide';

const colorsByTheme = {
  'red-bordered': colors.strawberry,
  'blue-bordered': colors.brightBlue,
};

/**
 * @param {sting} theme
 * @return {Function}
 */
const getTheme = (theme: string): Function => {
  const themeMainColor = colorsByTheme[theme] || colorsByTheme['blue-bordered'];

  return (extendedTheme: Object): Object => ({
    ...extendedTheme,
    colors: {
      ...extendedTheme.colors,
      primary: themeMainColor,
      neutral20: themeMainColor,
      neutral30: themeMainColor,
      neutral40: themeMainColor,
      neutral60: themeMainColor,
      neutral80: themeMainColor,
    },
  });
};

export default getTheme;
