// @flow

import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import type { RouterHistory, Match } from 'react-router';
import * as Actions from 'store/Actions';
import Modal, { ModalHeader, ModalBody, ModalFooter } from 'components/Modal';
import Button from 'components/Button';

import DELETE_CHANNEL_USER_MUTATION from 'gql/mutations/DeleteChannelUser.graphql';

type Props = {
  onClose: () => void,
  t: Function,
  history: RouterHistory,
  // eslint-disable-next-line react/no-unused-prop-types
  match: Match,
  session: Object,
  channel: Object,
  user: Object,
};

class RemoveUserModal extends PureComponent<Props> {
  handleSubmit = async (deleteChannelUser: Function) => {
    try {
      const { user, channel, session } = this.props;
      const deletingSelf = user.id === session.id;

      await deleteChannelUser({
        variables: {
          channelId: channel.id,
          userId: user.id,
        },
      });

      if (deletingSelf) {
        this.props.history.push(`/web/messages/`);
      }

      this.props.onClose();
    } catch (e) {
      Actions.alertNotification(this.props.t('generic.somethingWentWrong'), 'error');
    }
  };

  /**
   * Render a modal with a form for initiating a new group message
   * @return {React$Node}
   */
  render() {
    const { t } = this.props;
    const localeKey = 'modals.removeChannelUserModal';

    return (
      <Mutation mutation={DELETE_CHANNEL_USER_MUTATION}>
        {deleteChannelUser => (
          <Modal maxWidth={600} padding={30}>
            <ModalHeader header={t(`${localeKey}.header`)} onClose={this.props.onClose} />
            <ModalBody withPadding>{t(`${localeKey}.body`)}</ModalBody>
            <ModalFooter>
              <Button
                theme="red-gradient"
                type="submit"
                pill
                onClick={() => this.handleSubmit(deleteChannelUser)}
              >
                {t(`${localeKey}.removeUser`)}
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </Mutation>
    );
  }
}

export default RemoveUserModal;
