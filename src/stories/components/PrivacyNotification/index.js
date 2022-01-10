// @flow

import React, { PureComponent } from 'react';
import { getCookie, setCookie } from 'utils';
import {
  Wrapper,
  PrivacyContent,
  PrivacyButton,
  PrivacyCTA,
  PrivacyHeader,
  PrivacyLink,
  PrivacyNotice,
} from './styled';

type Props = {
  t: Function,
};
type State = {
  showPrivacyContent: boolean,
};

class PrivacyNotification extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showPrivacyContent: true,
    };
  }

  handleAcceptButton = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setCookie('isComplianceAccepted', 1);

    this.setState({ showPrivacyContent: false });
  };

  /**
   * Render an PrivacyNotification
   * @return {React$Node}
   */
  render() {
    const { t } = this.props;
    const { state } = this;
    const { showPrivacyContent } = state;

    const isComplianceAccepted = getCookie('isComplianceAccepted');
    const showContent = showPrivacyContent && !isComplianceAccepted;

    return (
      showContent && (
        <Wrapper>
          <PrivacyContent>
            <PrivacyHeader>{t('pages.compliance.header')}</PrivacyHeader>
            <PrivacyNotice>
              {t('pages.compliance.primaryContent')}{' '}
              <PrivacyLink
                className="privacy-link"
                href="https://www.onupkeep.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('pages.compliance.policyLink')}
              </PrivacyLink>{' '}
              {t('pages.compliance.additionalContent')}
            </PrivacyNotice>
          </PrivacyContent>
          <PrivacyCTA>
            <PrivacyButton theme="white" onClick={this.handleAcceptButton}>
              {t('pages.compliance.policyCTA')}
            </PrivacyButton>
          </PrivacyCTA>
        </Wrapper>
      )
    );
  }
}

export default PrivacyNotification;
