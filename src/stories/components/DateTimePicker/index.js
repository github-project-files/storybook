// @flow

import React, { useState, useEffect } from 'react';
import { ReactWidgetsCommonDropdownProps, DateTimePicker } from 'react-widgets';
import { Wrapper } from './styled';

type Props = {
  ...ReactWidgetsCommonDropdownProps,
};

export default (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(props.open);

  const handleOnFocus = () => {
    setIsOpen(true);
  };

  const handleOnBlur = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // the open state is either false, date, time
    // https://jquense.github.io/react-widgets/api/DateTimePicker/#open
    // figure out the default open value based on type of widget in use
    // eg. for datetime - open date
    // eg. for date     - open date
    // eg. for time     - open time
    if (!isOpen) {
      setOpen(false);
      return;
    }

    if (isOpen && props.date === false) {
      // time widget, date needs to be explicitly set to false
      // date undefined can mean date is active
      setOpen('time');
      return;
    }

    if (isOpen) {
      // datetime or date widget
      setOpen('date');
      return;
    }

    setOpen(false);
  }, [isOpen]);

  return (
    <Wrapper>
      <DateTimePicker {...props} open={open} onFocus={handleOnFocus} onBlur={handleOnBlur} />
    </Wrapper>
  );
};
