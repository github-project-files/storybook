// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const AssigneeWrapper = styled.div`
  display: flex;
  align-items: center;

  ul {
    display: inline-flex;
    padding: 0;
    margin: 0;
  }

  /* NumberBadge */
  span {
    position: relative;
    left: -24px;
    top: 10px;
    z-index: 10;

    @media (max-width: 1445px) and (min-width: 1200px) {
      display: none;
    }

    @media (max-width: 1185px) {
      display: none;
    }
  }
`;

export const Assignee = styled.li`
  width: ${p => (p.size === 'sm' ? '24px' : '36px')};
  height: ${p => (p.size === 'sm' ? '24px' : '36px')};
  line-height: ${p => (p.size === 'sm' ? '22px' : '36px')};
  text-align: center;
  font-size: ${p => p.size === 'sm' && '10px'};
  display: inline-block;
  border: 1px solid ${colors.white};
  background-image: url(${props => props.avatar});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-origin: border-box;
  background-color: ${props => props.assigneeColor};
  color: ${colors.white} !important;
  border-radius: 50%;

  &:first-of-type {
    z-index: ${props => props.offset && props.offset};
  }

  &:not(:first-of-type) {
    transform: translateX(${props => props.offset * props.index * -1}px);
    z-index: ${props => props.offset && (props.index - props.offset) * -1};

    @media (max-width: 1350px) and (min-width: 1200px) {
      display: none;
    }

    @media (max-width: 1090px) {
      display: none;
    }
  }

  svg {
    position: relative;
    top: -1px;
    left: -1px;
    width: 36px;
    height: 36px;
  }
`;
