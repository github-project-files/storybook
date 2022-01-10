// @flow

import React, { PureComponent } from 'react';
import NotificationIcon from 'assets/commonIcons/bellIcon.svg';
import * as Actions from 'store/Actions';
import Button from 'components/Button';
import DropdownMenu from 'components/DropdownMenu';
import NumberBadge from 'components/NumberBadge';
import ProfileIcon from 'assets/commonIcons/profileIcon.svg';
import generateUserName from 'utils/generateUserName';
import ReduxConnect from 'components/ReduxConnect';
import { withRouter } from 'react-router-dom';
import MenuIcon from './img/menuIcon.svg';
import AssistantIcon from './img/assistantIcon.svg';

import { Wrapper, NumberBadgeWrapper, UserNameWrapper } from './styled';

type Props = {
  title: string,
  beta: boolean,
  previous: string,
  sidebarBadges?: Object,
  profileHeader: ?Object,
  onNotificationsClick: Function,
  history: Function,
};

type State = {
  showProfileMenu: boolean,
};

export class PageHeader extends PureComponent<Props, State> {
  profileMenuItems = [
    {
      label: 'View Profile',
      // eslint-disable-next-line no-return-assign
      handleOnClick: () => (window.location = '/#/app/account/profile'),
    },
    {
      label: 'View Company Profile',
      // eslint-disable-next-line no-return-assign
      handleOnClick: () => (window.location = '/#/app/account/company-profile'),
    },
    {
      label: 'Log Out',
      // eslint-disable-next-line no-return-assign
      handleOnClick: () => (window.location = '/#/logout'),
    },
  ];

  constructor(props: Object) {
    super(props);
    this.state = {
      showProfileMenu: false,
    };
  }

  // eslint-disable-next-line react/sort-comp
  handleNotificationViewChange = () => {
    window.location = `/#/app/assistant`;
  };

  handleProfileToggle = () => {
    window.analytics.track('Profile', {
      category: 'Menu',
    });
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      showProfileMenu: !this.state.showProfileMenu,
    });
  };

  handleOnBack = () => {
    const { history, previous } = this.props;
    history.push(previous);
    Actions.updatePageNav('');
  };

  /**
   * Render an PageHeader
   * @return {React$Node}
   */
  render() {
    const { previous = '' } = this.props;
    return (
      <Wrapper>
        <MenuIcon
          className="_test-menu-icon menu-icon"
          onClick={() => Actions.toggleMainMenu(true)}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="_test-page-header-title">
          {previous !== '' && (
            <span
              className="prev-route-btn"
              onClick={this.handleOnBack}
              onKeyDown={this.handleOnBack}
              role="button"
              tabIndex={0}
            >
              &nbsp;
            </span>
          )}
          {this.props.title}
          {this.props.beta && <span className="beta">beta</span>}
        </label>
        <Button size="xs" theme="cancel" onClick={this.handleNotificationViewChange}>
          <AssistantIcon />
          {(() => {
            if (
              this.props.sidebarBadges &&
              this.props.sidebarBadges.totalUnreadAssistantCards > 0
            ) {
              return (
                <NumberBadgeWrapper>
                  <NumberBadge
                    theme="red"
                    count={this.props.sidebarBadges.totalUnreadAssistantCards}
                    plus={false}
                  />
                </NumberBadgeWrapper>
              );
            }
          })()}
        </Button>
        <span>
          <NotificationIcon onClick={this.props.onNotificationsClick} />
        </span>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
        <span onClick={this.handleProfileToggle}>
          <DropdownMenu
            menuItems={this.profileMenuItems}
            display={this.state.showProfileMenu}
            offsetY="30"
            direction="bottom-left"
            header={
              this.props.profileHeader ? (
                <UserNameWrapper>{generateUserName(this.props.profileHeader)}</UserNameWrapper>
              ) : (
                ''
              )
            }
            width="160"
          >
            <ProfileIcon />
          </DropdownMenu>
        </span>
      </Wrapper>
    );
  }
}

/**
 * extract pageTitle from redux directly in this component
 * this prevents rendering the complete page
 * @param {Object} props
 * @return {React$Element}
 */
const PageTitleConnector = ({ t, ...props }: Object) => (
  <ReduxConnect
    state={state => ({
      pageTitle: state.pageTitle,
      isBeta: state.isBeta,
      previous: state.previous,
    })}
  >
    {({ pageTitle, isBeta, previous }) => (
      <PageHeader {...props} title={t(pageTitle)} beta={isBeta} previous={previous} />
    )}
  </ReduxConnect>
);

export default withRouter(PageTitleConnector);
