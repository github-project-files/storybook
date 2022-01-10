// @flow

import React from 'react';
import { Tab } from './styled';

import type { ControlBarItem } from './index';

type Props = {
  item: ControlBarItem,
  onSelectItem: ControlBarItem => void,
  theme?: string,
};

export default (props: Props) => {
  const active = Boolean(props.item.value);

  return (
    <Tab active={active} onClick={() => props.onSelectItem(props.item)} theme={props.theme}>
      {props.item.label}
    </Tab>
  );
};
