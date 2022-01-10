// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import closeIcon from 'assets/commonIcons/closeIcon.svg';

export const ItemRow = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px 16px;
  background-color: ${colors.alabaster};
  display: flex;
  justify-content: space-between;

  h2 {
    margin-bottom: 10px;
    padding-bottom: 0;
    font-size: 12px;
  }

  .required {
    color: red;
  }
`;

export const SubRow = styled.div`
  background: #ccc;
  height: ${p => (p.show ? 'inherit' : '0px')};
  transition: 200ms;
  padding: ${p => (p.show ? '10px' : '0')};
  opacity: ${p => (p.show ? 1 : 0)};
`;

export const SubRowActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 36px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
`;

export const RowContent = styled.div`
  flex: 3;
  h2{
    max-width: 300px;
    overflow-wrap: break-word;
  }
`;

export const RowActions = styled.div`
  flex: 1;
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const RowIcon = styled.div`
  cursor: pointer;
  z-index: 1;
  svg {
    width: 20px;
    height: 20px;
    fill: ${p => (p.selected ? 'blue' : '#666')};
    margin-left: 10px;

    g,
    path {
      fill: inherit;
    }
  }
`;

export const TextArea = styled.textarea`
  border: none;
  border-radius: 5px;
  background: #fff;
  padding: 10px;
  width: 100%;
  resize: none;
`;

export const SubRowHeader = styled.div`
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  .image-count {
    font-size: 11px;
    color: ${colors.steel};

    .count-number {
      color: ${colors.brightBlue};
    }
  }
`;

export const CloseWrapper = styled.div`
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

export const CloseIcon = styled(closeIcon)`
  width: 12px;
  height: 12px;
  fill: #aaa;
  cursor: pointer;
`;

export const FileSelectorWrapper = styled.div`
  input {
    display: none;
  }

  label {
    font-size: 11px;
    color: ${colors.brightBlue};
    cursor: pointer;
  }
`;

export const ImageWrapper = styled.div`
  display: inline-block;
  background: none;
  padding: 0;
  height: 60px;
  border-radius: 5px;
  text-align: right;
  cursor: pointer;

  &:hover {
    .delete-image {
      opacity: 1;
    }
  }

  .delete-image {
    opacity: 0;
    position: relative;
    top: -52px;
    right: 10px;
    font-size: 13px;
    padding: 0 6px;
    background: ${colors.brightBlue};
    line-height: 9px;
    color: #fff;
    border-radius: 50px;
    transition: 0.2s;
    margin-right: -15px;

    &:hover {
      background: red;
    }
  }

  img {
    height: 100%;
    margin-bottom: 0;
    border-radius: 0 5px 5px 0;
    box-shadow: 2px 2px 5px #aaa;
    border: 1px solid rgba(0, 0, 0, 0);
    transition: border 0.2s;

    &:hover {
      border: 1px solid ${colors.brightBlue};
    }
  }
`;

export const AttachmentsWrapper = styled.div`
  margin: 10px 0;

  span {
    font-size: 12px;
    color: #666;
  }
`;
