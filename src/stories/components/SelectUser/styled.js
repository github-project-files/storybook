// @flow
import styled from 'styled-components';

export const SelectWrapper = styled.div`
  width: 100%;
  .react-select__control {
    min-height: 42px;
  }
`;

export const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-right: 10px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  img {
    width: inherit;
    height: inherit;
    object-fit: cover;
    border-radius: inherit;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: ${p => p.theme.colors.darkGrey};
`;

export const Type = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${p => p.theme.colors.slateGrey};
`;
