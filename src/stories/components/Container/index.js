// @flow
import React from 'react';
import Container from './styled';

type Props = {
  children: React$Node,
  className?: string,
  dir?: string,
};

const ContainerWrapper = (props: Props) => (
  <Container className={props.className} dir={props.dir}>{props.children}</Container>
);

export default ContainerWrapper;
