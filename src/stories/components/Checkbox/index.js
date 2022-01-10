// @flow

import React from 'react';
import Tooltip from 'components/Tooltip';
import Asterisk from 'components/RequiredAsterisk';
import { CheckboxWrapper, CheckboxElem, DisabledWrapper, Label } from './styled';

type Props = {
  onClick?: Function,
  checked?: *,
  disabled?: boolean,
  tooltipMessage?: string,
  id?: string,
  label?: string,
  // TODO: Chech these props usage @moidmw
  // title?: string,
  // labelWidth?: number,
  className?: string,
  required?: boolean,
};

export default (props: Props) => {
  if (props.disabled) {
    if (props.tooltipMessage) {
      return (
        <Tooltip
          value={props.tooltipMessage}
          place="right"
          style={{ width: '100%' }}
          id={props.id && props.id}
        >
          <DisabledWrapper onClick={props.onClick} />
        </Tooltip>
      );
    }
    return <DisabledWrapper />;
  }

  return (
    <CheckboxWrapper className={props.className}>
      <CheckboxElem label={props.label} onClick={props.onClick} checked={props.checked}>
        <span />
      </CheckboxElem>
      {props.label && <Label onClick={props.onClick}>{props.label}</Label>}
      {props.required && <Asterisk />}
    </CheckboxWrapper>
  );
};
