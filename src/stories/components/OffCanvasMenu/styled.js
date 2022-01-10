// @flow

import styled from 'styled-components';
import closeIcon from 'assets/commonIcons/closeIcon.svg';

export const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  opacity: 0;
  z-index: -1;
  &.show-overlay {
    opacity: 1;
    z-index: 12;
    transition: all 100ms ease;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  cursor: pointer;
  background: rgb(0, 0, 0);
  opacity: 0.7;
`;

export const Content = styled.div`
  position: fixed;
  background: ${p => p.theme.colors.white};
  width: 80%;
  ${p => (p.position === 'right' ? 'right: -80%' : 'left: -80%')};
  @media (min-width: ${p => p.theme.breakpoints.s}) {
    width: ${p => (p.width ? p.width : '380px')};
    ${p =>
      p.position === 'right' ? `right: ${-p.width || '-380px'}` : `right: ${-p.width || '-380px'}`};
  }
  &.show-content {
    ${p => (p.position === 'right' ? 'right: 0' : 'left: 0')};
    transition: all 250ms ease;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 600;
  padding: 20px;
  background-color: ${p => p.theme.colors.white};
  border-bottom: 1px solid ${p => p.theme.colors.paleGrey};
`;

export const Body = styled.div`
  padding: 20px;
  height: calc(100vh - 140px);
  overflow-y: auto;
`;

export const Footer = styled.div`
  padding: 20px;
  border-top: 1px solid ${p => p.theme.colors.paleGrey};
  position: sticky;
  background-color: ${p => p.theme.colors.white};
  text-align: right;
  bottom: 0;
`;

export const CloseBtn = styled.span``;

export const CloseIcon = styled(closeIcon)``;
