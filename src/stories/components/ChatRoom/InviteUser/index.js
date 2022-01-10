// @flow

import React, { PureComponent } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import type { RouterHistory, Match } from 'react-router';
import * as Actions from 'store/Actions';
import Modal, { ModalHeader, ModalBody, ModalFooter } from 'components/Modal';
import SelectUser from 'components/SelectUser';
import Button from 'components/Button';
import apolloClient from 'gql/apolloClient';
import { USER_ROLES } from 'constants/userRoles';

import ADD_CHANNEL_USER_MUTATION from 'gql/mutations/AddChannelUser.graphql';

type Props = {
  onClose: () => void,
  t: Function,
  // eslint-disable-next-line react/no-unused-prop-types
  history: RouterHistory,
  // eslint-disable-next-line react/no-unused-prop-types
  match: Match,
  channel: Object,
};

class InviteUserModal extends PureComponent<Props> {
  validationSchema = Yup.object().shape({
    userId: Yup.string().required('Required'),
  });

  /**
   * Render a modal with a form for initiating a new group message
   * @return {React$Node}
   */
  render() {
    const { t } = this.props;
    const localeKey = 'modals.addChannelUserModal';

    const userIds = this.props.channel.users.map(user => user.id);

    return (
      <Formik
        initialValues={{
          userId: null,
        }}
        validationSchema={this.validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);

          try {
            await apolloClient.mutate({
              mutation: ADD_CHANNEL_USER_MUTATION,
              variables: {
                channelId: this.props.channel.id,
                userId: values.userId,
              },
            });

            setSubmitting(false);
            this.props.onClose();
          } catch (e) {
            Actions.alertNotification(t('generic.somethingWentWrong'), 'error');
            setSubmitting(false);
          }
        }}
        render={({ errors, handleSubmit, isSubmitting }) => (
          <Form>
            <Modal maxWidth={600} padding={30}>
              <ModalHeader header={t(`${localeKey}.header`)} onClose={this.props.onClose} />
              <ModalBody withPadding>
                <SelectUser
                  name="userId"
                  label={t(`${localeKey}.usersLabel`)}
                  placeholder={t(`${localeKey}.usersPlaceholder`)}
                  error={errors.userId ? t('generic.required') : null}
                  excludeUserIds={userIds}
                  excludeUserTypes={[USER_ROLES.VIEW_ONLY, USER_ROLES.VENDOR, USER_ROLES.CUSTOMER]}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  theme="blue-gradient"
                  type="submit"
                  pill
                  onClick={handleSubmit}
                  loading={isSubmitting}
                >
                  {t(`${localeKey}.inviteUser`)}
                </Button>
              </ModalFooter>
            </Modal>
          </Form>
        )}
      />
    );
  }
}

export default InviteUserModal;
