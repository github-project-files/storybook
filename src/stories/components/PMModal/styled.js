// @flow

import styled, { keyframes } from 'styled-components';
import { colors, breakpoints } from 'utils/StyleGuide';

const fadeAndScaleIn = keyframes`
  0% { 
    opacity: 0;
    transform: scale(0.9);
  } 100% { 
    opacity: 1;
    transform: scale(1.0);
  }
`;

const fadeIn = keyframes`
  0% { 
    opacity: 0;
  } 100% { 
    opacity: 1;
  }
`;

export const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  background-color: rgba(40, 44, 49, 0.4);
  padding: 0;
  z-index: 999;
  animation: ${fadeIn} 0.2s 1;

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media (min-width: 1000px) {
    padding: 32px 0;
  }
`;

export const ModalWrapper = styled.div`
  margin: 20px auto;
  width: 100%;
  background-color: ${colors.white};
  border-radius: 6px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.5);
  /* padding: ${props => (props.padding ? props.padding : 0)}px; */
  max-width: ${props => (props.maxWidth ? props.maxWidth : 600)}px;
  animation: ${fadeAndScaleIn} 0.2s 1;
  max-height: 75%;
  overflow: auto;
  @media (max-width: ${breakpoints.m}) {
    margin: 20px;
  }
`;
