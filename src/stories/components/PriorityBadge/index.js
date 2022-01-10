// @flow

import React from 'react';
import Badge from 'components/Badge';

type Props = {
  priority: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH',
  displayStyle?: 'compact' | 'full',
};

export default (props: Props) => {
  const priorityColor = {
    NONE: 'gray',
    LOW: 'blue',
    MEDIUM: 'yellow',
    HIGH: 'red',
  };

  const priorityLabel = {
    NONE: { compact: '', full: 'Unprioritized' },
    LOW: { compact: 'Low', full: 'Low Priority' },
    MEDIUM: { compact: 'Med', full: 'Medium Priority' },
    HIGH: { compact: 'High', full: 'High Priority' },
  };

  return (
    <Badge theme={priorityColor[props.priority]}>
      {priorityLabel[props.priority || 'NONE'][props.displayStyle || 'compact']}
    </Badge>
  );
};
