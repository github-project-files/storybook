// @flow

import styled from 'styled-components';
import { colors, statusColors } from 'utils/StyleGuide';

/**
 * Determine label icon size based on size prop
 * @param {string} size
 * @return {string}
 */
function getSize(size) {
  switch (size) {
    case 'sm':
      return { width: 8, height: 8, borderWidth: 1 };
    default:
      return { width: 14, height: 14, borderWidth: 2 };
  }
}

export const StatusLabelWrapper = styled.span`
  display: flex;
  align-items: center;
`;

export const StatusIcon = styled.span`
  position: relative;
  width: ${p => getSize(p.size).width}px;
  height: ${p => getSize(p.size).height}px;
  border-radius: 50%;
  background-color: ${p => (p.status === 'OPEN' ? colors.transparent : statusColors[p.status])};
  border-width: ${p => p.status === 'OPEN' && `${getSize(p.size).borderWidth}px`};
  border-style: ${p => p.status === 'OPEN' && 'solid'};
  border-color: ${p => p.status === 'OPEN' && statusColors.border[p.status]};
  margin-right: ${p => JSON.parse(p.label) && '5px'};
  transform: ${p => p.offset && p.index !== 0 && `translateX(${p.offset * p.index * -1}px)`};
  box-shadow: ${p => p.offset && p.index !== 0 && `inset 1px 0 0 ${colors.white}`};
`;

StatusIcon.defaultProps = {
  label: 'true',
};

export const StatusLabel = styled.span`
  display: ${p => (JSON.parse(p.label) ? 'inline' : 'none')};

  @media (max-width: 875px) {
    display: none;
  }
`;

StatusLabel.defaultProps = {
  label: 'true',
};

export const CheckIcon = styled.span`
  &::after {
    content: '';
    display: ${p => (p.size === 'sm' ? 'none' : 'block')};
    position: absolute;
    top: 3px;
    left: 6px;
    width: 2px;
    height: 6px;
    border: solid ${colors.white};
    border-width: 0 1px 1px 0;
    transform: rotate(45deg);
  }
`;
