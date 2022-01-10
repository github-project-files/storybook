// @flow
import React, { PureComponent } from 'react';
import Select from 'components/Select';

// eslint-disable-next-line no-unused-vars
type Props = {
  error?: string,
  raw?: boolean,
  additionalLinkTypes?: { label: string, value: string },
  [key: string]: any,
};

/**
 * return supported link types
 * @return {Array<Object>}
 */
function getLinkTypes() {
  return [
    {
      label: 'Blocked by',
      value: 'Blocked by',
    },
    {
      label: 'Blocks',
      value: 'Blocks',
    },
    {
      label: 'Split from',
      value: 'Split from',
    },
    {
      label: 'Split To',
      value: 'Split To',
    },
    {
      label: 'Relates to',
      value: 'Relates to',
    },
    {
      label: 'Duplicates',
      value: 'Duplicates',
    },
    {
      label: 'Duplicated by',
      value: 'Duplicated by',
    },
  ];
}

class SelectLinkType extends PureComponent<$FlowLintFix> {
  /**
   * Render an PageHeader
   * @return {React$Node}
   */
  render() {
    const linkTypes = getLinkTypes();
    const menuData = this.props.additionalLinkTypes
      ? linkTypes.concat([this.props.additionalLinks])
      : linkTypes;
    return (
      <Select {...this.props} error={this.props.error} fieldType="select" options={menuData} />
    );
  }
}

export default SelectLinkType;
