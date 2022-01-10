/* eslint-disable no-nested-ternary */
// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import alertIcon from 'assets/exportIcons/icon-alert.svg';
import infoIcon from 'assets/exportIcons/icon-info.svg';
import completedIcon from 'assets/exportIcons/icon-checkmark.svg';
import downloadIcon from 'assets/exportIcons/icon-download.svg';
import retryIcon from 'assets/exportIcons/icon-retry.svg';

export const StatusWrapper = styled.div`
  padding: 20px;
  position: relative;
  display: flex;
  width: 100%;
  background-color: ${p =>
    p.status === 'inProgress'
      ? 'rgba(0, 85, 178, 0.1)'
      : p.status === 'completed'
      ? 'rgba(5, 131, 57, 0.1)'
      : 'rgba(207, 19, 36, 0.1)'};
  > div:first-of-type {
    width: calc(100% - 300px);
  }
  > div:last-of-type {
    width: 220px;
    text-align: right;
  }
`;

export const IconWrapper = styled.div`
  margin-right: 10px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.p`
  font-weight: 700;
  margin: 0 0 5px;
`;

export const Subtitle = styled.p`
  font-size: 13px;
  margin: 0;
`;

export const InfoIcon = styled(infoIcon)`
  fill: ${p => p.theme.colors.brightBlue};
`;

export const CompletedIcon = styled(completedIcon)``;

export const ErrorIcon = styled(alertIcon)`
  fill: ${colors.coral};
`;

export const DownloadIcon = styled(downloadIcon)``;

export const RetryIcon = styled(retryIcon)``;

export const ActionStatus = styled.div`
  position: relative;
  > svg {
    position: relative;
    top: 50%;
    display: block;
    transform: translateY(-50%);
  }
  > button {
    font-size: 14px;
    display: inline-flex;
    align-items: center;
    padding: 5px 25px;
    height: 45px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    > svg {
      width: 18px;
      height: 16px;
      margin-right: 10px;
    }
  }
  .completed-btn {
    &:hover {
      svg {
        fill: ${colors.jungleGreen};
      }
      color: ${colors.jungleGreen};
      background-color: ${colors.white};
    }
  }
  .retry-btn {
    background-color: ${colors.white};
    color: ${colors.brightBlue};
  }
`;

export const LoadingText = styled.div`
  font-size: 14px;
  color: ${colors.brightBlue};
  font-weight: 600;
  position: relative;
`;
