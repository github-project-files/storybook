// @flow

import React, { PureComponent } from 'react';

// Utilities
import * as Actions from 'store/Actions';
import generateCloudfrontUrl from 'utils/generateCloudfrontUrl';

// Components
import Accordian from 'components/Accordian';
import SelectFileModal from 'components/SelectFileModal';
import Loader from 'components/Loader';
import Tooltip from 'components/Tooltip';
import { withErrorBoundary } from 'utils/hocs';
import SidebarError from 'components/ErrorComponent/SidebarCard';
import loadable from '@loadable/component';
import {
  TitleWrapper,
  SubTitle,
  Title,
  Count,
  FilesIcon,
  Table,
  TableBody,
  ColumnHeader,
  TableCell,
  DeleteIcon,
  AddButton,
  LoaderWrapper,
  TableWrapper,
} from './styled';

const LoadableViewPDFModalComponent = loadable(
  () =>
    import(
      /* webpackChunkName: 'components_ViewPDFModal' */
      /* webpackPrefetch: true */
      'components/ViewPDFModal'
    ),
  {
    fallback: <Loader />,
  },
);

type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  workOrderId: String,
  workOrderFiles: Array<Object>,
  t: Function,
  // eslint-disable-next-line react/no-unused-prop-types
  onUpdateWorkOrder?: Function,
  onRemove: Function,
  onUpdate: Function,
  alwaysOpen?: boolean,
  canEdit?: boolean,
  required?: boolean,
  triggerFileUpgradeModal?: Function,
};

type State = {
  submitting: boolean,
};

class PartAccordian extends PureComponent<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    submitting: false,
  };

  // eslint-disable-next-line react/sort-comp
  componentDidMount = () => {
    window.analytics.track('AddFileTapped', {
      category: 'WorkOrderDetailsCategory',
    });
  };

  quantityRefs = {};

  quantityDimensions = {};

  handleSelectFileModal = () => {
    const { canEdit, triggerFileUpgradeModal } = this.props;
    if (!canEdit) {
      return;
    }

    if (triggerFileUpgradeModal) {
      triggerFileUpgradeModal();
      return;
    }

    const selectedFiles = this.props.workOrderFiles.slice();
    Actions.modal(SelectFileModal, { selectedFiles, onSubmit: this.handleUpdate });
  };

  handleRemove = async (event: Object, id: string) => {
    window.analytics.track('RemoveFileTapped', {
      category: 'WorkOrderDetailsCategory',
    });
    if (!this.props.canEdit) {
      return;
    }

    event.stopPropagation();
    this.setState({ submitting: true });
    await this.props.onRemove(id);
    this.setState({ submitting: false });
  };

  handleUpdate = async (files: Array<Object>) => {
    if (!this.props.canEdit) {
      return;
    }

    this.setState({ submitting: true });
    await this.props.onUpdate(files);
    this.setState({ submitting: false });
  };

  renderHeader = () => {
    const { workOrderFiles, required, t } = this.props;

    return (
      <TitleWrapper>
        <FilesIcon />
        <div>
          <SubTitle>
            Files
            {required && (
              <Tooltip id="required-files" value={t('pages.workorders.tooltips.filesRequired')}>
                <span>&nbsp;*</span>
              </Tooltip>
            )}
          </SubTitle>
          <Title>
            <Count>{workOrderFiles.length}</Count> Attached Files
          </Title>
        </div>
      </TitleWrapper>
    );
  };

  /**
   * Table cell click handler
   * @param {Object} ele - File data
   * @return {Function}
   */
  handleRowClick = (ele: Object) => {
    window.analytics.track('ViewFile', {
      category: 'WorkOrderDetailsCategory',
    });
    const ext = ele.url.split('.').pop();
    const file = generateCloudfrontUrl(ele.url);
    const fileName = ele.originalName;

    if (ext === 'pdf') {
      return Actions.modal(LoadableViewPDFModalComponent, { pdfURL: file, fileName });
    }
    window.open(file, '_blank');
  };

  renderBody = () => {
    const { workOrderFiles } = this.props;

    return (
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <ColumnHeader />
              <ColumnHeader align="left">File Name</ColumnHeader>
              <ColumnHeader />
            </tr>
          </thead>
          <TableBody>
            {workOrderFiles.map((ele, idx) => {
              return (
                <tr key={ele.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell onClick={() => this.handleRowClick(ele)}>{ele.originalName}</TableCell>
                  <TableCell onClick={event => this.handleRemove(event, ele.id)}>
                    <DeleteIcon />
                  </TableCell>
                </tr>
              );
            })}
          </TableBody>
        </Table>
        {this.state.submitting ? (
          <LoaderWrapper>
            <Loader size="sm" />
          </LoaderWrapper>
        ) : null}
        <AddButton onClick={this.handleSelectFileModal}>+ Attach File</AddButton>
      </TableWrapper>
    );
  };

  /**
   * Render a modal with a form for initiating a new group message
   * @return {React$Node}
   */
  render() {
    return (
      <Accordian
        header={this.renderHeader()}
        body={this.renderBody()}
        alwaysOpen={this.props.alwaysOpen}
      />
    );
  }
}

export default withErrorBoundary(PartAccordian, () => <SidebarError name="File list" />);
