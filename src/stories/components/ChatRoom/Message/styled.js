// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import editIcon from 'assets/commonIcons/editIcon.svg';
import trashIcon from 'assets/commonIcons/trashIcon.svg';
import closeIcon from 'assets/commonIcons/closeIcon.svg';
import everyone from './img/everyone.svg';

export const UserTooltip = styled.div`
  display: flex;
  position: absolute;
  height: 70px;
  opacity: 0.85;
  border-radius: 4px;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.5);
  background-color: ${colors.darkGrey};
  padding: 10px;
  top: ${p => p.tooltipY}px;
  left: ${p => p.tooltipX}px;
  &:after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: inherit;
    left: 50%;
    bottom: -5px;
    border-radius: 1px;
    transform: rotate(45deg);
  }
`;

export const TooltipAvatarInitials = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  background-color: ${colors.shamrockGreen};
  justify-content: center;
  align-items: center;
  color: ${colors.white};
  font-size: 14px;
  font-weight: 700;
`;

export const TooltipAvatar = styled.div`
  display: inline-flex;
`;

export const TooltipInfo = styled.div`
  margin-left: 12px;
  flex-flow: column;

  p {
    font-size: 14px;
    font-weight: 600;
    color: ${colors.white};

    margin: 0;
    &:second-of-type {
      font-size: 13px;
      font-weight: 500;
    }
    &:last-of-type {
      font-size: 12px;
      font-weight: 400;
    }
  }
`;

export const TooltipAvatarImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  img {
    max-width: 100% !important;
    object-fit: cover;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
`;

export const Trash = styled(trashIcon)`
  width: 20px;
  height: 100%;
  margin: 0 auto;
  align-self: center;
`;

export const Edit = styled(editIcon)`
  width: 20px;
  height: 20px;
  margin: 0 auto;
  align-self: center;
  fill: rgb(0, 123, 255);
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

  &:hover {
    background-color: ${colors.dodgerBlue};

    ${Trash} {
      fill: #fff;
    }
  }
`;

export const EditWrapper = styled.div`
  position: absolute;
  display: none;
  overflow: hidden;
  top: 0px;
  right: 40px;
  width: 40px;
  height: 100%;
  background-color: ${colors.babyBlue};
  cursor: pointer;

  div {
    margin: 0 auto;
    align-self: center;
  }

  &:hover {
    background-color: ${colors.dodgerBlue};

    ${Edit} {
      fill: #fff;
    }
  }
`;

export const Close = styled(closeIcon)`
  position: absolute;
  right: 32px;
  width: 24px;
  height: 24px;
  padding: 4px;
  border-radius: 12px;
  background-color: ${colors.alabaster};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  fill: ${colors.silver};
  cursor: pointer;

  &:hover {
    fill: #fff;
    background-image: linear-gradient(223deg, ${colors.coral}, ${colors.lipstick});
  }
`;

export const Checkmark = styled.div`
  position: absolute;
  right: 4px;
  width: 24px;
  height: 24px;
  padding: 4px;
  border-radius: 12px;
  background-image: linear-gradient(223deg, #00aeff, #0076ff);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:after {
    content: '';
    display: block;
    width: 6px;
    height: 14px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    margin-left: 4px;
    margin-top: -1px;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  padding: 14px;
  margin: 4px 0;
  background-color: ${p => {
    if (p.editMode) {
      return colors.iceBlue;
    }
    if (p.myMessage && p.type !== null) {
      return colors.lightGrey;
    }
    return 'transparent';
  }};
  border: 1px solid
    ${p => {
      if (p.editMode) {
        return colors.brightBlue;
      }
      if (p.isActivity || (p.type === 'user' && !p.myMessage) || p.type === 'public_share') {
        return colors.paleGrey;
      }
      return 'transparent';
    }};
  border-radius: 6px;
  width: ${p => (p.isActivity ? '100%' : 'auto')};

  &:hover {
    background-color: ${p => (p.myMessage && p.type !== null ? colors.iceBlue : 'transparent')};
    border: 1px solid
      ${p => (p.myMessage && p.type !== null ? colors.brightBlue : colors.lightGrey)};

    ${TrashWrapper} {
      display: flex;
    }

    ${EditWrapper} {
      display: flex;
    }
  }
`;

export const InnerWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Avatar = styled.img`
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

export const Detail = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  padding-left: 18px;
`;

export const Title = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
`;

export const Name = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${colors.slateGrey};
`;

export const SubTitle = styled.div`
  padding-left: 20px;
  font-size: 12px;
  color: ${colors.steel};
`;

export const Date = styled.div`
  padding-left: 20px;
  font-size: 12px;
  font-style: italic;
  color: ${colors.steel};
`;

export const Body = styled.div`
  padding-top: 4px;
  color: ${p => (p.isActivity ? colors.slateGrey : colors.black)};
  font-size: ${p => (p.isActivity ? 16 : 14)}px;
  text-align: ${p => (p.isActivity ? 'center' : 'left')};
  white-space: pre-line;
  word-break: break-word;
  position: relative;
  img {
    max-width: 20%;
  }
`;

export const Input = styled.textarea`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  border: 1px solid ${colors.brightBlue};
  background-color: ${colors.lightGrey};

  &:focus {
    box-shadow: none;
    outline: none;
  }
`;

export const everyoneSVG = styled(everyone)`
  width: 40px;
  height: 40px;
  path {
    fill: ${colors.white};
  }
`;
