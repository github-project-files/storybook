// @flow
/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import Button from 'components/Button';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  position: fixed;
  bottom: 0;
  z-index: 5;

  padding: 28px;
  margin: 20px;
  line-height: 22px;

  background: ${colors.darkGrey};
  color: ${colors.white};

  border: 1px solid ${colors.darkGrey};
  border-radius: 6px;

  text-align: left;

  @media (max-width: 425px) {
    display: block;
    padding: 20px;
  }
`;

export const PrivacyContent = styled.div`
  font-size: 14px;
  padding-right: 40px;

  @media (max-width: 425px) {
    display: block;
  }
`;

export const PrivacyHeader = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export const PrivacyNotice = styled.p`
  margin: 12px 0 0 0;
`;

export const PrivacyCTA = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 425px) {
    justify-content: flex-end;
    margin-top: 10px;
  }
`;

export const PrivacyButton = styled(Button)`
  width: 132px;
`;

export const PrivacyLink = styled.a`
  color: ${colors.dodgerBlue};
`;
