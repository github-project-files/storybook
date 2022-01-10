// @flow

import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  border-top: ${p => (p.above && p.isOver ? '20px solid #007bff' : 'none')};
  border-bottom: ${p => (!p.above && p.isOver ? '20px solid #007bff' : 'none')};
  transition: 400ms;

  .add-option-button {
    padding: 5px;
  }

  .scroll-container {
    width: 100%;
    height: 55vh;
    overflow: scroll;
    padding-bottom: 180px;

    /* scrollbar */
    ::-webkit-scrollbar {
      width: 7px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #eee;
    }
    &:hover {
      ::-webkit-scrollbar-thumb {
        background-color: #ddd;
      }
    }
  }

  div.item-container {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;

    &:first-child {
      border-top: 1px solid #ddd;
    }
  }
`;

export const NoDataWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 12px;
`;
