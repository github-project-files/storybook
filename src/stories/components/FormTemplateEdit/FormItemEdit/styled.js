// @flow

import styled from 'styled-components';
import removeIcon from 'assets/commonIcons/removeIcon.svg';
import optionsIcon from 'assets/commonIcons/optionsIcon.svg';
import draggableIcon from 'assets/commonIcons/draggableIcon.svg';
import { colors } from 'utils/StyleGuide';

export const Wrapper = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

export const DragWrapper = styled.div`
  flex: 1;
  background: #fff;
  border-right: 0;
  display: flex;
  align-items: center;
`;

export const LeftWrapper = styled.div`
  flex: 1;
  background: #fff;
  border-right: 0;
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

export const RightWrapper = styled.div`
  border-left: 1px solid #ddd;
  flex: 15;
`;

export const HeaderRow = styled.div`
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  input {
    flex: 2;
  }

  .item-actions {
    flex: 1;
  }
`;

export const BodyRow = styled.div`
  background: #eee;
  padding: 10px;
  border-top: 1px solid #ddd;
  font-size: 12px;

  .option-instruction {
    color: #999;
    font-style: italic;
  }

  &.add-option-button {
    display: flex;
    justify-content: center;
  }
`;

export const OptionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;

  input {
    flex: 9;
  }

  svg {
    flex: 1;
    text-align: right;
  }
`;

export const RemoveIcon = styled(removeIcon)`
  height: 12px;
  width: 12px;
  fill: #000;
  margin-left: 10px;

  &:hover {
    fill: ${colors.brightBlue};
  }
`;

export const DraggableIcon = styled(draggableIcon)`
  margin-left: 2px;
  fill: #bbb;
  width: 20px;
  height: 20px;
`;

export const OptionsIcon = styled(optionsIcon)`
  margin-left: 10px;
  height: 12px;
  width: 12px;
  fill: #ddd;

  &:hover {
    fill: ${colors.brightBlue};
  }
`;

export const TypeLabel = styled.span`
  font-size: 13px;
  color: #bbb;
  font-style: italic;
`;

export const StyledInput = styled.input`
  width: 60%;
  height: 30px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
`;
