/* eslint-disable no-nested-ternary */
// @flow

import React, { PureComponent } from 'react';
import { Line } from 'rc-progress';
import Button from 'components/Button';
import config from 'utils/config';
import apolloClient from 'gql/apolloClient';
import * as Actions from 'store/Actions';
import Loader from 'components/Loader';
import { NonCancellableTaskStatus } from 'utils/Constants';
import BACKGROUND_TASK_STATUS from 'gql/queries/BackgroundTaskDetails.graphql';
import {
  StatusWrapper,
  Title,
  Subtitle,
  Content,
  IconWrapper,
  InfoIcon,
  CompletedIcon,
  ErrorIcon,
  DownloadIcon,
  RetryIcon,
  ActionStatus,
  LoadingText,
} from './styled';

const statusType = [
  {
    status: 'inProgress',
    title: 'Preparing your CSV file...',
    subtitle:
      'We’ll notify you when the file is ready for download (might be a few minutes ' +
      'for large data files)',
  },
  {
    status: 'completed',
    title: 'Your CSV file is ready!',
    subtitle: 'Click the button to the right to download your CSV file.',
  },
  {
    status: 'error',
    title: 'There was an issue with exporting your work orders.',
    subtitle: 'Please try again in a few minutes. If the problem persists, contact us at',
  },
];

type Props = {
  exportStatus: string,
};

type State = {
  percent: number,
  currentStatus: string,
  showProgressBar: boolean,
};

class ExportStatusBar extends PureComponent<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      percent: 0,
      currentStatus: this.props.exportStatus,
      showProgressBar: false,
    };
  }

  componentDidMount = () => this.componentInit();

  handleBackgroundServiceInfo = async () => {
    const backgroundTaskID = localStorage.getItem('backgroundTaskID') || '';
    const { data } = await apolloClient.query({
      query: BACKGROUND_TASK_STATUS,
      fetchPolicy: 'network-only',
      variables: {
        id: backgroundTaskID,
      },
    });
    if (data && data.backgroundTask) {
      localStorage.removeItem('backgroundTaskID');
      Actions.setExportStatus('', false);

      const exportLink = document.createElement('a');
      exportLink.href = data.backgroundTask.outputFileURL;
      exportLink.download = `work-order-${backgroundTaskID}-export.csv`;
      // $FlowFixMe
      document.body.appendChild(exportLink);
      exportLink.click();
      // $FlowFixMe
      document.body.removeChild(exportLink);
      window.open();
    }
  };

  componentInit = () => {
    const socketIOServer = config('API_GATEWAY_URL');
    const backgroundTaskID = localStorage.getItem('backgroundTaskID') || '';
    const statusArr = NonCancellableTaskStatus;

    // $FlowFixMe
    const bgTaskSocket = io.connect(
      `${socketIOServer}/background-tasks?taskId=${backgroundTaskID}`,
      {
        path: '/socket',
        transports: ['websocket', 'polling'],
      },
    );

    bgTaskSocket.on('connect', () => {
      if (bgTaskSocket.connected) {
        this.setState({
          showProgressBar: true,
        });
      }
    });
    bgTaskSocket.on('disconnect', () => {
      bgTaskSocket.close(); // stop reconnecting
    });
    bgTaskSocket.on(backgroundTaskID, data => {
      if (data.progress === 'task-ended') {
        this.setState({
          currentStatus: 'completed',
        });
      } else if (Number(data.progress) === -1) {
        this.setState({
          currentStatus: 'error',
        });
        if (statusArr.includes(data.taskStatus.toUpperCase())) {
          bgTaskSocket.disconnect();
        }
      }
      this.setState({
        percent: Number(data.progress),
      });
    });
    bgTaskSocket.on('connect_error', error => {
      if (error || error.length || Object.keys(error).length) {
        this.taskStatusPolling();
      }
    });
    bgTaskSocket.on('error', error => {
      if (error || error.length || Object.keys(error).length) {
        this.taskStatusPolling();
      }
    });

    bgTaskSocket.on('reconnect_failed', () => {
      this.taskStatusPolling();
    });
  };

  taskStatusPolling = () => {
    this.setState({
      showProgressBar: false,
    });

    const polling = setInterval(async () => {
      const backgroundTaskID = localStorage.getItem('backgroundTaskID') || '';
      if (backgroundTaskID) {
        const { data } = await apolloClient.query({
          query: BACKGROUND_TASK_STATUS,
          fetchPolicy: 'network-only',
          variables: {
            id: backgroundTaskID,
          },
        });
        if (data && data.backgroundTask) {
          const taskStatus = data.backgroundTask.taskStatus.toLowerCase();
          if (taskStatus === 'success') {
            clearInterval(polling);
            this.setState({
              currentStatus: 'completed',
            });
          }
        }
      } else {
        clearInterval(polling);
      }
    }, 500);
  };

  handleRetry = () => {
    Actions.setExportStatus('inProgress', true);
    this.componentInit();
  };

  /** Render Export status bar
   * @return {React$Node}
   */
  render() {
    const data = statusType.filter(item => item.status === this.state.currentStatus)[0];
    const { showProgressBar } = this.state;
    return (
      <StatusWrapper status={data.status}>
        <Content>
          <IconWrapper>
            {/* eslint-disable-next-line no-nested-ternary */}
            {data.status === 'inProgress' ? (
              <InfoIcon />
            ) : data.status === 'completed' ? (
              <CompletedIcon />
            ) : (
              <ErrorIcon />
            )}
          </IconWrapper>
          <div>
            <Title>{data.title}</Title>
            <Subtitle>
              {`${data.subtitle} `}
              {data.status === 'error' ? (
                <a href="mailto:info@onupkeep.com">info@onupkeep.com</a>
              ) : (
                ''
              )}
            </Subtitle>
          </div>
        </Content>
        <ActionStatus>
          {showProgressBar && data.status === 'inProgress' ? (
            <Line
              percent={this.state.percent}
              strokeWidth="5"
              trailWidth="5"
              trailColor="#b7bbbf"
              strokeColor="#007bff"
            />
          ) : !showProgressBar && data.status === 'inProgress' ? (
            <LoadingText>
              Exporting Work Orders...
              <Loader size="sm" inline />
            </LoadingText>
          ) : data.status === 'completed' ? (
            <Button
              theme="dark-green"
              className="completed-btn"
              onClick={this.handleBackgroundServiceInfo}
            >
              <DownloadIcon />
              Download File
            </Button>
          ) : (
            <Button className="retry-btn" onClick={this.handleRetry}>
              <RetryIcon />
              Retry
            </Button>
          )}
        </ActionStatus>
      </StatusWrapper>
    );
  }
}

export default ExportStatusBar;
