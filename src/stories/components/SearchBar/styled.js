// @flow
/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import { inputStyle } from 'components/Forms/FormStyles';
import ButtonOutline from 'components/ButtonOutline';

export const SubmitButton = styled(ButtonOutline)`
  display: none;

  @media (min-width: 426px) {
    display: inline-flex;
  }
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;

  div {
    padding: 0;
  }

  .search-form {
    display: flex;
    align-items: center;
    position: relative;

    @media (min-width: 426px) {
      width: 350px;
    }
  }

  input {
    ${inputStyle};
    padding-left: 35px;
    height: ${p => p.size === 'sm' && '30px'};
    min-height: ${p => p.size === 'sm' && '30px'};
    font-size: ${p => p.size === 'sm' && '12px'};
    border-radius: 37px;
    background-color: ${colors.lightGrey};
    border-color: ${colors.slateGrey};

    @media (min-width: 426px) {
      padding: 0 35px;
    }

    &:focus {
      background-color: ${colors.white};
      border-color: ${colors.brightBlue};

      ~ svg {
        fill: ${colors.brightBlue};

        &:nth-of-type(2) {
          opacity: 1;
          fill: ${colors.steel};

          &:hover {
            fill: ${colors.brightBlue};
          }
        }
      }
    }
  }

  svg {
    position: absolute;

    /* SearchIcon */
    &:first-of-type {
      width: ${p => (p.size === 'sm' ? '15px' : '19px')};
      height: ${p => (p.size === 'sm' ? '15px' : '19px')};
      top: ${p => (p.size === 'sm' ? '9px' : '10px')};
      left: 10px;
    }

    /* ClearIcon */
    &:nth-of-type(2) {
      width: ${p => (p.size === 'sm' ? '14px' : '16px')};
      height: ${p => (p.size === 'sm' ? '14px' : '16px')};
      top: ${p => (p.size === 'sm' ? '9px' : '11px')};
      right: 7px;
      opacity: 0;
      cursor: pointer;

      @media (min-width: 426px) {
        right: 100px;
      }
    }
  }

  input,
  svg {
    fill: ${colors.darkGrey};
    transition: all 200ms ease;
  }

  &:hover input,
  &:hover svg {
    border-color: ${colors.brightBlue};
    fill: ${colors.brightBlue};
  }
`;
