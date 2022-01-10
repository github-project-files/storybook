// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const Wrapper = styled.li`
  &:hover,
  &:hover div,
  &:hover label {
    cursor: ${p => (p.disablePointer ? 'auto' : 'pointer')};
  }

  &:hover {
    background-color: ${colors.lightGrey};
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

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
`;

export const Participants = styled.div`
  &:hover {
  }

  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: ${p => (p.active ? colors.white : colors.babyBlue)};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: ${colors.brightBlue};
`;

export const Details = styled.div`
  flex: 1;
  padding-left: 12px;
  width: 100%;
  overflow: hidden;
`;

export const Title = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;

  label:first-child {
    display: block;
    font-size: 16px;
    color: ${p => (p.active ? colors.white : colors.slateGrey)};
    font-weight: 600;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  label:last-child {
    font-size: 10px;
    color: ${p => (p.active ? colors.white : p.slateGrey)};
  }
`;

export const Body = styled.div`
  display: block;
  font-size: 12px;
  color: ${p => (p.active ? colors.white : colors.steel)};
  font-weight: ${p => (p.unread ? 'bold' : 'normal')};
`;

export const Date = styled.div`
  align-self: flex-start;
  font-size: 10px;
  color: ${colors.slateGrey};
`;

export const Star = styled.span`
  position: absolute;
  top: 0;
  right: 2px;
  color: ${colors.marigold};
`;

export const Unread = styled.span`
  position: absolute;
  top: 0;
  right: 2px;
  color: ${colors.strawberry};
  font-size: 45px;
  line-height: 45px;
`;
