// @flow

import styled from 'styled-components';
import { lighten } from 'polished';
import { colors } from 'utils/StyleGuide';

export const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};

  @media (min-width: 700px) {
    position: relative;
    width: auto;
    left: auto;
    top: auto;
  }
`;

export const LoaderWrapper = styled.div`
  flex: 1;
  position: absolute;
  width: 100%;
  margin-top: 124px;
`;

export const MessagesListWrapper = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;

  /* scrollbar */
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #4d5259;
  }
  &:hover {
    ::-webkit-scrollbar-thumb {
      background-color: ${lighten(0.2, '#4d5259')};
    }
  }
`;

export const MessagesList = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
`;

export const Spacer = styled.div`
  height: 20px;
`;
