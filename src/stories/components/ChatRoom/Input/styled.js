// @flow

import styled, { keyframes } from 'styled-components';
import { colors } from 'utils/StyleGuide';
import paperclip from './img/paperclip.svg';
import emojiIconActive from './img/emojiIconActive.svg';
import emojiIconInactive from './img/emojiIconInactive.svg';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border-top: 1px solid ${colors.paleGrey};
`;

export const TextArea = styled.textarea`
  flex: 1;
  font-size: 14px;
  color: ${colors.charcoalGrey};
  padding: 20px 45px;
  border: none;
  outline: none;
  resize: none;
  overflow: hidden;

  ::placeholder {
    color: ${colors.steel};
  }
`;

export const FileButton = styled.div`
  position: absolute;
  left: 10px;
  overflow: hidden;
  cursor: pointer;

  input[type='file'] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    font-size: 100px;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    background: white;
    cursor: inherit;
    display: block;
  }
`;

export const PaperclipIcon = styled(paperclip)`
  width: 25px;
  height: 25px;
`;

export const ThumbnailContainer = styled.div`
  display: flex;
  padding: 10px;
  width: 100%;
  overflow: hidden;
`;

export const ThumbnailPreview = styled.div`
  width: 20%;
  position: relative;

  .thumbnail {
    display: block;
    padding-bottom: 85%;
    height: 0;
    margin: 2px;
    background-position: center;
    background-size: cover;
    border-radius: 6px;
  }

  .delete-image {
    position: absolute;
    right: 5px;
    top: 10px;
    font-size: 25px;
    cursor: pointer;
    color: ${colors.strawberry};
    line-height: 0px;
    font-weight: bold;
  }
`;

export const EmojiWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 50px;
`;

export const EmojiIconActive = styled(emojiIconActive)`
  position: absolute;
  width: 25px;
  height: 25px;
  right: 10px;
  cursor: pointer;
`;

export const EmojiIconInactive = styled(emojiIconInactive)`
  position: absolute;
  width: 25px;
  height: 25px;
  right: 10px;
  cursor: pointer;
`;

export const Error = styled.span`
  color: ${colors.strawberry};
  font-size: 12px;
`;

const bounceAnimation = keyframes`
  0%, 80%, 100% {
    transform: scale(0); }
  40% {
    transform: scale(1);
  }
`;

export const UploadingImage = styled.div`
  position: absolute;
  top: -2px;
  left: -2px;
  text-align: center;
  padding-top: 35%;
  background-color: rgba(0, 0, 0, 0.8);
  margin: 2px;
  height: 100%;
  width: 100%;
  border-radius: 6px;

  div {
    width: 25px;
    height: 25px;
    background-color: ${colors.steel};
    border-radius: 100%;
    display: inline-block;
    animation: ${bounceAnimation} 1.4s ease-in-out 0s infinite both;
  }

  div:first-child {
    animation-delay: -0.32s;
  }

  div:nth-child(2) {
    animation-delay: -0.16s;
  }
`;
