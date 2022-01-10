// @flow

import React from 'react';
import { I18n } from 'react-i18next';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import MAIN_SESSION_QUERY from 'gql/queries/MainSession.graphql';

import type { RouterHistory, Match } from 'react-router';
import Loader from '../Loader';

// These are props that get injected by MainLayout
export type ModalHOCProps = {
  onClose: () => void,
  t: Function,
  history: RouterHistory,
  match: Match,
  session: Object,
};

export { default as ModalHeader } from './ModalHeader';
export { default as ModalBody } from './ModalBody';
export { default as ModalFooter } from './ModalFooter';

/**
 * HOC for modals that will inject commonly-needed things,
 * such as router props, translations, etc
 * @param {Object} injectedProps
 * @return {Function}
 */
const modalHOC = (injectedProps: *) => (WrappedComponent: *) => {
  const ModalHOC = withRouter(props => (
    <I18n>
      {t => (
        <Query query={MAIN_SESSION_QUERY}>
          {({ loading, data }) => {
            if (loading) {
              return <Loader />;
            }

            return <WrappedComponent {...injectedProps} {...props} t={t} session={data.session} />;
          }}
        </Query>
      )}
    </I18n>
  ));

  return ModalHOC;
};

export default modalHOC;