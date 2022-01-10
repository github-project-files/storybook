// @flow
import React from 'react';
import Asterisk from 'components/RequiredAsterisk';
import ErrorMessage from '../HookForm/ErrorMessage';
import { Wrapper, IconWrapper } from './styled';

type Props = {
  icon: React$Node,
  label: string,
  onClick: Function,
  required?: boolean,
  error?: string | Object,
};

const ItemSelector = (props: Props) => {
  const { error, icon, label, onClick, required } = props;
  return (
    <Wrapper onClick={onClick} className={error && error.message ? 'error' : ''}>
      <div>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        {label || 'Default'}
        {required && <Asterisk />}
      </div>
      {error && error.message && <ErrorMessage error={error.message} />}
    </Wrapper>
  );
};

export default ItemSelector;
