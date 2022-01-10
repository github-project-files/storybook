// @flow

import React from 'react';
import RadioButton from 'components/RadioButton';
import Checkbox from 'components/Checkbox';
import { FieldArray } from 'formik';
import { CustomError } from '../Input/styled';
import {
  Title,
  Note,
  Option,
  Count,
  OptionTitle,
  OptionDescription,
  OptionWrapper,
  CheckboxWrapper,
  CheckboxLayoutWrapper,
} from './styled';

export type RadioOptionConfig = {
  title: string,
  id: string,
  description: string,
  isOptionCountShown: boolean,
};

type OptionType = {
  name: string,
  id: string,
};

type Props = {
  fieldName: string,
  required: boolean,
  options: OptionType[],
  checkedOptions: string[],
  radioOptions: RadioOptionConfig[],
  selecetedRadioId: string | null,
  isCheckboxLayoutHidden: ?boolean,
  setFieldValue: (name: string, value: string[]) => void,
  handleRadioSelect: (options: Object[], id: string, setFieldValue: Function) => void,
  handleOptionSelect: (
    selectedOptions: string[],
    options: Object[],
    id: string,
    setFieldValue: Function,
  ) => void,
  sectionTitle?: string,
  sectionTitleNote?: string,
  error: ?string,
};

/**
 * @param {Props} props
 * @return {React$Node}
 */
export class CheckboxGroup extends React.Component<Props> {
  renderCheckboxes = () => {
    const { checkedOptions, handleOptionSelect, options, setFieldValue } = this.props;

    return options.map(({ name, id }) => (
      <CheckboxWrapper key={id}>
        <Checkbox
          title={name}
          label={name}
          labelWidth={160}
          name={id}
          checked={checkedOptions.includes(id)}
          onClick={() => handleOptionSelect(checkedOptions, options, id, setFieldValue)}
          id={id}
        />
      </CheckboxWrapper>
    ));
  };

  /**
   * @return {React$Node}
   */
  render() {
    const {
      required,
      sectionTitle,
      sectionTitleNote,
      fieldName,
      options,
      selecetedRadioId,
      handleRadioSelect,
      setFieldValue,
      radioOptions,
      error,
      isCheckboxLayoutHidden,
    } = this.props;

    return (
      <>
        {sectionTitle && (
          <Title required={required}>
            {sectionTitle} {sectionTitleNote && <Note>{sectionTitleNote}</Note>}
          </Title>
        )}
        {radioOptions.map(({ title, description, id, isOptionCountShown }) => (
          <OptionWrapper
            key={id}
            checked={selecetedRadioId === id}
            onClick={() => handleRadioSelect(options, id, setFieldValue)}
          >
            <RadioButton checked={selecetedRadioId === id} />
            <Option>
              <OptionTitle>
                {title}
                {isOptionCountShown && <Count>({options.length})</Count>}
              </OptionTitle>
              <OptionDescription>{description}</OptionDescription>
            </Option>
          </OptionWrapper>
        ))}
        {error && <CustomError>{error}</CustomError>}
        {!isCheckboxLayoutHidden && !!options.length && (
          <CheckboxLayoutWrapper>
            <FieldArray name={fieldName} render={this.renderCheckboxes} />
          </CheckboxLayoutWrapper>
        )}
      </>
    );
  }
}
