// @flow

import React from 'react';
import moment from 'moment';
import Tooltip from 'components/Tooltip';
import { DueDateWrapper, DueDateIcons, EmptyTableValue } from './styled';

import RepeatIcon from './img/repeat.svg';
import AlertIcon from './img/alert.svg';

type Props = {
  dueDate: string,
  schedule: Object,
  status: string,
  id?: string,
};

export default (props: Props) => {
  const { dueDate, schedule, status } = props;
  const isDue = moment(dueDate).isBefore(moment(), 'now');
  const isRepeating = schedule !== null;
  const isComplete = status === 'COMPLETE';
  const formattedDate = moment(dueDate).format(localStorage.getItem('dateFormat') || 'MM/DD/YY');

  /**
   * @return {Array} - Array of status icons
   */
  const renderStatusIcon = () => {
    const icons = [];
    let id = props.id ? `${props.id}-alert` : '';
    if (isDue && !isComplete) {
      icons.push(
        <Tooltip value="Past Due" id={id} place="top" effect="solid">
          <AlertIcon key="alert" />
        </Tooltip>,
      );
    }
    if (isRepeating) {
      id = props.id ? `${props.id}-repeat` : '';
      icons.push(
        <Tooltip value="Repeating" id={id} place="top" effect="solid">
          <RepeatIcon key="repeating" />
        </Tooltip>,
      );
    }
    return icons;
  };

  return (
    <DueDateWrapper pastDue={isDue && !isComplete}>
      {dueDate ? (
        <div>
          {formattedDate}{' '}
          <DueDateIcons>{(isDue || isRepeating) && renderStatusIcon()}</DueDateIcons>
        </div>
      ) : (
        <EmptyTableValue>-</EmptyTableValue>
      )}
    </DueDateWrapper>
  );
};
