// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import alertIcon from 'assets/commonIcons/alertIcon.svg';

export const AlertIcon = styled(alertIcon)`
  height: 40px;
  width: 40px;
  g {
    circle {
      fill: ${colors.coral};
      + path {
        fill: ${colors.coral};
      }
    }
  }
`;

export const WrapperDiv = styled.div`
  display: flex;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  border: solid 1px ${colors.paleGrey};
`;

export const IconWrapper = styled.div`
  display: flex;
  width: 80px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.peach};
`;

export const ContentWrapper = styled.div`
  width: calc(100% - 80px);
  background: #f8f9f9;
  padding: 8px;
  p {
    margin-top: 0;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 14px;
  margin-bottom: 4px;
  color: ${colors.charcoalGrey};
`;

export const ErrorHelpMessage = styled.p`
  font-size: 12px;
  color: ${colors.steel};
`;
