// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import UpgradeSchedulerImage from './img/upgrade-scheduler.png';

/**
 * Determine the button's accent color based on the "color" prop
 * @param {string} image
 * @return {string}
 */
function getBackgroundImage(image) {
  switch (image) {
    case 'scheduler':
      return `url(${UpgradeSchedulerImage})`;
    default:
      return '';
  }
}

export const Wrapper = styled.div`
  background-color: ${colors.white};
  border-radius: 8px;
  margin-bottom: 30px;
  text-align: center;
`;

export const SubHeader = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  text-align: center;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-image: ${p => getBackgroundImage(p.backgroundImage)};
  height: 280px;
  border-radius: 6px 6px 0 0;
  background-size: cover;
`;

export const Header = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: ${colors.white};
  text-align: center;
  padding-bottom: 0;
`;

export const GraphicWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 30px;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  background-color: #e4f1fa;

  svg {
    width: 88px;
    height: 88px;
  }
`;

export const Description = styled.div`
  font-size: 15px;
  color: ${colors.charcoalGrey};
  padding: 10px 35px 0;
  line-height: 1.53;
  letter-spacing: 0.2px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonDescription = styled.span`
  margin-top: 40px;
  font-size: 12px;
  color: ${colors.slateGrey};
  padding: 15px;
  display: block;
`;

export const LearnMore = styled.div`
  text-align: center;
  margin-bottom: 40px;

  a {
    font-size: 15px;
    font-weight: normal;
    color: #007bff;
    text-decoration: none;
  }
`;
