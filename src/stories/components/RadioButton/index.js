// @flow

import React from 'react';
import { RadioButtonWrapper, Label, ButtonLabelWrapper } from './styled';

type Props = {
  onClick?: Function,
  label?: string,
  checked?: *,
};

export default (props: Props) => (
  <>
    <ButtonLabelWrapper label={props.label}>
      <RadioButtonWrapper onClick={props.onClick} checked={props.checked}>
        <span />
      </RadioButtonWrapper>
      {props.label && <Label>{props.label}</Label>}
    </ButtonLabelWrapper>
  </>
);
