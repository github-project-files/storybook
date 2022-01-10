// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import EmailIcon from './img/icon-mail.svg';

export const TagItem = styled.div`
  background-color: #d4d5d6;
  display: inline-block;
  font-size: 14px;
  border-radius: 30px;
  height: 30px;
  padding: 0 4px 0 1rem;
  display: inline-flex;
  align-items: center;
  margin: 0 0.3rem 0.6rem 0;
`;

export const RemoveButton = styled.div`
  background-color: white;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font: inherit;
  margin-left: 10px;
  font-weight: bold;
  padding: 0;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InputMultiEmailWrapper = styled.div`
  .input {
    width: 100%;
    height: 40px;
    padding: 0 42px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid ${colors.paleGrey};
    color: ${colors.slateGrey};
    -webkit-appearance: none;
  }

  .input:focus {
    border-color: ${colors.brightBlue};
    outline: none;
  }

  .input.has-error {
    border-color: ${colors.lipstick};
  }

  .error {
    margin-top: 10px;
    color: ${colors.lipstick};
    font-size: 12px;
  }

  .info {
    margin-top: 10px;
    color: ${colors.jungleGreen};
    font-size: 12px;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const Email = styled(EmailIcon)`
  height: 15px;
  width: 15px;
  position: absolute;
  margin-left: 13px;
`;

export const InputHeading = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.slateGrey};
  margin-bottom: 0.6rem;
`;

export const Hint = styled.div`
  font-size: 12px;
  font-style: italic;
  color: ${colors.steel};
  margin-bottom: 2rem;
`;

export const ButtonWrapper = styled.div`
  .invite-button {
    width: 100%;
    margin: 0;
    height: 52px;
  }
`;
