// @flow
import React from 'react';

import CardWrapper from './styled';

type Props = {
  children: React$Node,
  className?: string,
  overflow?: boolean,
};

const CardLayout = (props: Props) => {
  return (
    <CardWrapper className={props.className} overflow={props.overflow}>
      {props.children}
    </CardWrapper>
  );
};

export default CardLayout;
