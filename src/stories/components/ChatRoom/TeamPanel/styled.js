// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import trashIcon from 'assets/commonIcons/trashIcon.svg';
import addIcon from './img/addIcon.svg';

export const Trash = styled(trashIcon)`
  width: 20px;
  margin: 0 auto;
  align-self: center;
`;

export const TrashWrapper = styled.div`
  position: absolute;
  display: none;
  overflow: hidden;
  top: 0px;
  right: 0px;
  width: 40px;
  height: 100%;
  background-color: ${colors.babyBlue};
  cursor: pointer;

  div {
    margin: 0 auto;
    align-self: center;
  }

  :hover {
    background-color: ${colors.dodgerBlue};

    ${Trash} {
      fill: #fff;
    }
  }
`;

export const AddIcon = styled(addIcon)`
  width: 30px;
  height: 30px;
  margin: 8px 20px 8px 9px;
  fill: ${colors.brightBlue};

  &:hover {
    cursor: pointer;
  }
`;

export const Wrapper = styled.li`
  &:hover,
  &:hover label {
    cursor: ${p => (p.disablePointer ? 'auto' : 'pointer')};
  }

  &:hover {
    background-color: ${colors.lightGrey};

    ${TrashWrapper} {
      display: flex;
    }
  }

  margin: 0;
  padding: 18px 20px 18px 18px;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  background-image: ${p => (p.active ? 'linear-gradient(253deg, #4da2ff, #0076ff)' : 'none')};
`;
