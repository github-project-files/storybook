// @flow

import React, { PureComponent } from 'react';
import ReduxConnect from 'components/ReduxConnect';
import * as Actions from 'store/Actions';
import apolloClient from 'gql/apolloClient';
import Tooltip from 'components/Tooltip';
import { NonCancellableTaskStatus } from 'utils/Constants';

import CANCEL_BACKGROUND_TASK from 'gql/mutations/CancelBackgroundTask.graphql';
import BACKGROUND_TASK_STATUS from 'gql/queries/BackgroundTaskDetails.graphql';
import { ExportStatusWrapper, CloseBtn } from './styled';
import StatusBar from './StatusBar';


type Props = {
  visible: boolean,
  exportStatus: string,
};
type State = {
  closeTaskLoader: boolean,
  showClose: boolean,
};
class ExportStatus extends PureComponent<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    closeTaskLoader: false,
    showClose: true,
  };

  closeStatusBar = async () => {
    // here will cancel the current export action
    const statusArr = NonCancellableTaskStatus;
    const backgroundTaskID = localStorage.getItem('backgroundTaskID');
    this.setState({
      closeTaskLoader: true,
    });
    const { data } = await apolloClient.query({
      query: BACKGROUND_TASK_STATUS,
      fetchPolicy: 'network-only',
      variables: {
        id: backgroundTaskID,
      },
    });

    if (data && data.backgroundTask && data.backgroundTask.taskStatus) {
      if (!statusArr.includes(data.backgroundTask.taskStatus.toUpperCase())) {
        await apolloClient.mutate({
          mutation: CANCEL_BACKGROUND_TASK,
          variables: {
            id: backgroundTaskID,
            reason: 'Cancelled by user',
          },
          // eslint-disable-next-line no-unused-vars
          update: async (proxy, { data: { cancelBackgroundTask } }) => {
            Actions.alertNotification('Export cancelled', 'success');
            Actions.setExportStatus('', false);
            localStorage.removeItem('backgroundTaskID');
             this.setState({
                closeTaskLoader: false,
                showClose: false,
              });
          },
        });
      } else {
        Actions.setExportStatus('', false);
        localStorage.removeItem('backgroundTaskID');
      }
    }
  };

  /** Renders export status bar view
   */
  render() {
    return this.props.visible ? (
      <ExportStatusWrapper>
        <StatusBar exportStatus={this.props.exportStatus} />
        <Tooltip value="Close/Cancel export" place="left">
          <CloseBtn onClick={this.closeStatusBar} visible={this.state.showClose} loading={this.state.closeTaskLoader}/>
        </Tooltip>
      </ExportStatusWrapper>
    ) : null;
  }
}

/**
 * extract pageTitle from redux directly in this component
 * this prevents rendering the complete page
 * @param {Object} props
 * @return {React$Element}
 */
const ExportStatusBarConnector = ({ ...props }: Object) => {
  return (
    <ReduxConnect
      state={state => ({
        exportStatus: state.exportStatus,
        showStatus: state.showStatus,
      })}
    >
      {({ exportStatus, showStatus }) => (
        <ExportStatus {...props} visible={showStatus} exportStatus={exportStatus} />
      )}
    </ReduxConnect>
  );
};

export default ExportStatusBarConnector;
