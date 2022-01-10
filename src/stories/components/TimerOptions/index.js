// @flow

import React from 'react';
import apolloClient from 'gql/apolloClient';
import DropdownMenu from 'components/DropdownMenu';
import Loader from 'components/Loader';
import { humanizeSeconds } from 'utils';

import TimerIcon from 'assets/commonIcons/timerIcon.svg';
import { Query } from 'react-apollo';
import { withErrorBoundary } from 'utils/hocs';
import { USER_ROLES } from 'constants/userRoles';

import WORKORDER_TIMERS_BY_USERS_QUERY from 'gql/queries/WorkOrderTimersByUsers.graphql';

import START_WORK_ORDER_TIMER_MUTATION from 'gql/mutations/StartWorkOrderTimer.graphql';
import STOP_WORK_ORDER_TIMER_MUTATION from 'gql/mutations/StopWorkOrderTimer.graphql';
import AddIcon from './img/addIcon.svg';
import ListIcon from './img/listIcon.svg';
import StopIcon from './img/stopIcon.svg';
import StartIcon from './img/playIcon.svg';
import { Wrapper, TimerWrapper, DropdownWrapper } from './styled';

type Props = {
  onTimerAdd: () => void,
  onDetailedView: () => void,
  onTimerStart: Function,
  onTimerStop: Function,
  workOrder: Object,
  session: Object,
};

type State = {
  showTimerDropdown: boolean,
  timerLoading: boolean,
};

class TimerOptions extends React.PureComponent<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    showTimerDropdown: false,
    timerLoading: false,
  };

  // eslint-disable-next-line require-jsdoc
  menuItems = (status: string, refetch: Function) => {
    const { onTimerAdd, onDetailedView, session } = this.props;
    const items = [{ label: 'Detailed View', handleOnClick: onDetailedView, menuIcon: ListIcon }];
    if (!this.hasModifyTimerAccess(session)) {
      return items;
    }

    [
      {
        label: 'Start Timer',
        handleOnClick: () => this.handleStartTimeClick(refetch),
        menuIcon: StartIcon,
        disabled: status === 'started',
      },
      {
        label: 'Stop Timer',
        handleOnClick: () => this.handleStopTimeClick(refetch),
        menuIcon: StopIcon,
        disabled: status !== 'started',
      },
      { label: 'Add time', handleOnClick: onTimerAdd, menuIcon: AddIcon },
    ].map(item => items.push(item));
    // make flow happy, flow errors out on using concat
    // https://github.com/facebook/flow/issues/6151
    return items;
  };

  hasModifyTimerAccess = (session: Object) => {
    switch (session.accountType) {
      case USER_ROLES.ADMIN:
      case USER_ROLES.TECH:
      case USER_ROLES.LIMITED_TECH:
        return true;
      default:
        return false;
    }
  };

  /**
   * @param {Function} refetch
   * Start Timer Handler
   */
  handleStartTimeClick = async (refetch: () => void) => {
    window.analytics.track('StartTimerTapped', {
      category: 'WorkOrderDetailsCategory',
    });
    this.setState({ showTimerDropdown: false, timerLoading: true });
    await apolloClient.mutate({
      mutation: START_WORK_ORDER_TIMER_MUTATION,
      variables: {
        id: this.props.workOrder.id,
      },
      update: async (proxy, { data: { startWorkOrderTimer } }) => {
        refetch();
        this.props.onTimerStart(startWorkOrderTimer);
      },
    });
    this.setState({ timerLoading: false });
  };

  /**
   * @param {Function} refetch
   * Start Timer Handler
   */
  handleStopTimeClick = async (refetch: () => void) => {
    window.analytics.track('StopTimerTapped', {
      category: 'WorkOrderDetailsCategory',
    });
    this.setState({ showTimerDropdown: false, timerLoading: true });
    await apolloClient.mutate({
      mutation: STOP_WORK_ORDER_TIMER_MUTATION,
      variables: {
        id: this.props.workOrder.id,
      },
      update: async (proxy, { data: { stopWorkOrderTimer } }) => {
        refetch();
        this.props.onTimerStop(stopWorkOrderTimer);
      },
    });
    this.setState({ timerLoading: false });
  };

  /**
   * Render TimerOptions Component.
   * @return {React$Node}
   */
  render() {
    const { workOrder } = this.props;
    const { showTimerDropdown, timerLoading } = this.state;
    return (
      <Wrapper>
        <Query
          query={WORKORDER_TIMERS_BY_USERS_QUERY}
          variables={{ workOrderId: workOrder.id }}
          fetchPolicy="network-only"
        >
          {({ loading, data, refetch }) => {
            const { workOrderTimersByUsers } = data;
            const totalDuration = workOrderTimersByUsers && workOrderTimersByUsers.totalDuration;
            const timerItems = workOrderTimersByUsers && workOrderTimersByUsers.items;
            const currentUserTimer =
              timerItems && timerItems.find
                ? timerItems.find(timer => timer.user.id === this.props.session.id)
                : undefined;
            // eslint-disable-next-line no-nested-ternary
            const status = currentUserTimer
              ? // eslint-disable-next-line no-nested-ternary
                currentUserTimer.latestStartTime && currentUserTimer.latestEndTime
                ? 'stopped'
                : currentUserTimer.startTime
                ? 'started'
                : 'stopped'
              : 'stopped';
            const menuItems = this.menuItems(status, refetch);
            return (
              <>
                {(loading || timerLoading) && !workOrderTimersByUsers ? (
                  <Loader />
                ) : (
                  <>
                    <DropdownWrapper
                      onClick={() =>
                        // eslint-disable-next-line react/no-access-state-in-setstate
                        this.setState({ showTimerDropdown: !this.state.showTimerDropdown })
                      }
                    >
                      <TimerWrapper status={status}>
                        <TimerIcon />
                        <span>
                          Time -&nbsp;
                          {totalDuration ? humanizeSeconds(totalDuration) : 0}
                        </span>
                      </TimerWrapper>
                      <DropdownMenu
                        theme="icon"
                        menuItems={menuItems}
                        display={showTimerDropdown}
                        direction="bottom-left"
                        width="180"
                        offsetY="30"
                      />
                    </DropdownWrapper>
                  </>
                )}
              </>
            );
          }}
        </Query>
      </Wrapper>
    );
  }
}

export default withErrorBoundary(TimerOptions);
