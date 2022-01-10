// @flow
import React from 'react';

import { Wrapper, Label, Check } from './styled';

type Props = {
  option: Object,
  onClick: Function,
  className?: string,
  children?: React$Node,
};

const RadioToggle = (props: Props) => {
  const { value, checked, label } = props.option;

  return (
    <Wrapper className={props.className} onClick={() => props.onClick(value)}>
      <Check className={checked && 'checked'} />
      <Label value={value}>{label || props.children}</Label>
    </Wrapper>
  );
};

export default RadioToggle;
