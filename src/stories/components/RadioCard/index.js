// @flow

import React, { PureComponent } from 'react';
import {
  Wrapper,
  RadioCheck,
  Content,
  Title,
  SubTitle,
} from './styled';

type Props = {
  checked?: boolean,
  title: string,
  subtitle: string,
  valueType: string,
  selectItem: Function,
};

class RadioCard extends PureComponent<Props> {
  /** Renders radio card
  * @return {React$Node}
  */
  render() {
    const { checked, title, subtitle, valueType } = this.props;
    return (
      <Wrapper selected={checked} onClick={() => this.props.selectItem(valueType)}>
        <RadioCheck selected={checked}/>
        <Content>
          <Title selected={checked}>{title}</Title>
          <SubTitle>{subtitle}</SubTitle>
        </Content>
      </Wrapper>
    );
  }
}

export default RadioCard;
