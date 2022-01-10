// @flow

export type MenuItemType = {
  label: string,
  value: string,
  handleOnClick: Function,
  id?: number | string,
  key?: string,
  checked?: boolean,
  selectionIcon?: React$Node,
};
