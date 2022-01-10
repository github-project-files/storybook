// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import dashboardIcon from 'assets/commonIcons/dashboardIcon.svg';

export const AlertIcon = styled(dashboardIcon)`
  height: 60px;
  width: 60px;
  fill: ${colors.strawberry};
  }
`;

export const WrapperDiv = styled.div`
  display: flex;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  border: solid 1px ${colors.paleGrey};
  margin: 20px;
  flex-flow: column;
  align-items: center;
  justify-content: space-around;
  margin: 15px 10px 10px 15px;
  flex: 1;
  div {
    width: 100%;
    padding: 20px;
    text-align: center;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.peach};
`;

export const ContentWrapper = styled.div`
  background: #f8f9f9;
  padding: 8px;
  p {
    margin-top: 0;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${colors.charcoalGrey};
`;

export const ErrorHelpMessage = styled.p`
  font-size: 12px;
  color: ${colors.steel};
`;
