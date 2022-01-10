// @flow
import type { User } from 'types';

export type MenuItemType = {
  label: string,
  handleOnClick: Function,
  id?: number | string,
  key?: string,
  assignedTo?: [User],
  disabled?: boolean,
  allowed?: boolean,
  menuIcon?: React$Node,
  nested?: boolean,
};
