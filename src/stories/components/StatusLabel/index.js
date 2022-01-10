// @flow

import React from 'react';
import { StatusLabelWrapper, StatusIcon, StatusLabel, CheckIcon } from './styled';

type Props = {
  status: string,
  label?: string,
  size?: 'sm',
  offset?: number,
  index?: number,
};

export default (props: Props) => {
  const displayStatus = {
    OPEN: 'Open',
    IN_PROGRESS: 'In Progress',
    ON_HOLD: 'On Hold',
    COMPLETE: 'Complete',
  };

  const isComplete = props.status === 'COMPLETE';

  return (
    <StatusLabelWrapper
      status={props.status}
      label={props.label}
      size={props.size}
      offset={props.offset}
      index={props.index}
    >
      <StatusIcon {...props}>{isComplete && <CheckIcon size={props.size} />}</StatusIcon>
      <StatusLabel {...props}>{displayStatus[props.status]}</StatusLabel>
    </StatusLabelWrapper>
  );
};
