// @flow

import React from 'react';
import FormLabel from 'components/Forms/FormLabel';
import { Wrapper, StyledPdfOptionSelect } from './styled';

// eslint-disable-next-line no-unused-vars
type Props = {
  label: boolean,
  placeholder?: string,
  onChange?: () => void,
  [key: string]: any,
};

const pdfOptions = [
  { label: 'With Update Notes', value: 'with_notes' },
  { label: 'Without Update Notes', value: 'without_notes' },
];

export default (props: $FlowLintFix) => (
  <Wrapper>
    {props.label && <FormLabel htmlFor="pdfOption">PdfOption</FormLabel>}
    <StyledPdfOptionSelect
      name="pdfOption"
      placeholder={props.placeholder || 'PDF Options'}
      options={pdfOptions}
      {...props}
    />
  </Wrapper>
);
