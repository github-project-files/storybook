// @flow

import React from 'react';
import Tooltip from 'components/Tooltip';
import { Wrapper, CalendarIcon, ListIcon, ScrumIcon } from './styled';

type Props = {
  options: Array<Object>,
  tooltip?: string,
  value: string | Array<string>,
  onChange?: Function,
  theme?: 'blue-gradient' | 'red-gradient',
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  multiSelect?: boolean,
  disabled?: boolean,
  flex?: boolean,
};

/**
 * Render a radio button group
 * @param {Object} props
 * @return {React$Node}
 */
export default (props: Props) => (
  <Wrapper clearable={false} {...props}>
    {(() => {
      const value = Array.isArray(props.value) ? props.value : [props.value];
      return props.options.map(function(option) {
        return (
          <Tooltip
            className="tooltip-option"
            id={option.tooltip}
            value={option.tooltip}
            effect="solid"
            key={option.value}
          >
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              className={`radio-option ${option.disabled || props.disabled ? 'disabled ' : ''}${
                value.includes(option.value) ? 'selected' : ''
              }`}
            >
              <input
                type="radio"
                className="radio-option-value"
                name="option"
                value={option.value}
                onChange={ev => {
                  if (props.disabled) {
                    return;
                  }

                  // eslint-disable-next-line no-shadow
                  const value = ev ? ev.target.value : '';
                  if (typeof props.onChange === 'function') {
                    let result;
                    if (props.multiSelect) {
                      // eslint-disable-next-line no-shadow
                      const availableOptions = props.options.map(option => {
                        return option.value;
                      });
                      const selectedOptions = Array.isArray(props.value)
                        ? props.value.slice()
                        : [props.value];
                      const optionsObj = {};

                      // eslint-disable-next-line no-shadow
                      availableOptions.forEach(option => {
                        optionsObj[option] = selectedOptions.includes(option);
                      });

                      if (optionsObj.hasOwnProperty(value)) {
                        optionsObj[value] = !optionsObj[value];
                      } else {
                        optionsObj[value] = true;
                      }

                      // eslint-disable-next-line no-shadow
                      result = Object.keys(optionsObj).filter(value => {
                        return optionsObj[value];
                      });
                    } else {
                      result = value;
                    }

                    props.onChange(result);
                  }
                }}
              />
              {(() => {
                if (option.label) {
                  return <span className="option-label">{option.label}</span>;
                }
                if (option.image === 'calendar') {
                  return <CalendarIcon />;
                }
                if (option.image === 'list') {
                  return <ListIcon />;
                }
                if (option.image === 'scrum') {
                  return <ScrumIcon />;
                }
              })()}
            </label>
          </Tooltip>
        );
      });
    })()}
  </Wrapper>
);
