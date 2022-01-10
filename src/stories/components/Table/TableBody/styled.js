// @flow

import styled from 'styled-components';
import Button from 'components/Button';
import { lighten } from 'polished';
import { colors } from 'utils/StyleGuide';
import upTriangle from 'assets/commonIcons/upTriangle.svg';
import downTriangle from 'assets/commonIcons/downTriangle.svg';
import optionsIcon from 'assets/commonIcons/optionsIcon.svg';
import settingsIcon from 'assets/commonIcons/settingsIcon.svg';

export const TableWrapper = styled.section`
  width: 100%;
  height: 100%;

  .uk-table {
    font-size: 14px;
    letter-spacing: -0.3px;
  }

  .uk-table-header {
    display: flex;
    align-items: center;
    font-weight: 600;
    text-transform: none;
    color: ${colors.steel};

    &:focus {
      outline: none;
    }

    &[aria-sort='ascending'],
    &[aria-sort='descending'] {
      color: ${colors.darkGrey};
    }
  }

  .uk-table-grid,
  .ReactVirtualized__Grid__innerScrollContainer {
    color: ${colors.slateGrey};

    > div {
      left: 0 !important;
      width: calc(100% - 5px) !important;
    }

    /* scrollbar */
    ::-webkit-scrollbar {
      width: 7px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #4d5259;
    }
    &:hover {
      ::-webkit-scrollbar-thumb {
        background-color: ${lighten(0.2, '#4d5259')};
      }
    }

    &:focus {
      outline: none;
    }
  }

  /* All rows & header */
  .uk-table-row {
    border-bottom: 1px solid ${colors.paleGrey};
  }

  .overflow-col {
    overflow: visible !important;
  }

  .center-col {
    display: flex;
    justify-content: center;
    text-align: center;
  }

  .wo-controls {
    display: flex;
    justify-content: flex-end;
  }

  @media (max-width: 1300px) and (min-width: 1200px) {
    .wo-controls {
      display: none;
    }
  }

  @media (max-width: 1045px) {
    .wo-controls,
    .wo-asset,
    .wo-number {
      display: none;
    }

    .wo-assignedTo,
    .wo-priority {
      flex: 0 0 80px !important;
    }
  }

  @media (max-width: 875px) {
    .wo-status {
      flex: 0 0 60px !important;
    }
  }
`;

export const DragHandle = styled.span`
  margin-left: auto;
  cursor: col-resize;

  &:hover > svg {
    fill: ${colors.brightBlue};
  }
`;

export const UpIcon = styled(upTriangle)`
  width: 8px;
  height: 8px;
`;

export const DownIcon = styled(downTriangle)`
  width: 8px;
  height: 8px;
`;

export const OptionsIcon = styled(optionsIcon)`
  fill: ${colors.silver};
  height: 10px;
  width: 10px;
`;

export const SettingsWrapperWhenIcon = styled.div`
  position: absolute;
  right: 5px;
  width: 16px;
  height: 16px;
  cursor: pointer;

  &:hover svg {
    fill ${colors.brightBlue};
  }
`;

export const SettingsWrapperWhenText = styled.div`
  position: absolute;
  top: -15px;
  right: 2px;
  height: 16px;
  cursor: pointer;

  &:hover button {
    color ${colors.peacockBlue};
  }
`;

export const SettingsIcon = styled(settingsIcon)`
  position: absolute;
  top: 0;
  left: 0;
  fill: ${colors.silver};
  width: 16px;
  height: 16px;
`;

export const SettingsButtonTextWrapper = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 16px;
  font-size: 10px;
  padding: 1px 14px 1px;
`;

export const CustomizeColumnsButton = styled(Button)`
  top: 0;
  left: 0;
  width: 75px;
  height: 20px;
  margin-right: 20px;
`;

export const TableHeader = styled.div`
  cursor: ${p => (p.disableSort ? 'not-allowed' : 'pointer')};
`;