// @flow

import React, { PureComponent } from 'react';
import type { ModalHOCProps } from 'components/Modal/modalHOC';
import Button from '../Button';
import Modal, { ModalHeader } from '../Modal';
import {
  Wrapper,
  SubHeader,
  Header,
  HeaderWrapper,
  GraphicWrapper,
  Description,
  ButtonWrapper,
  ButtonDescription,
  LearnMore,
} from './styled';

type Props = ModalHOCProps & {
  requiredPlan: 'PROFESSIONAL' | 'BUSINESS_PLUS' | 'ENTERPRISE',
  backgroundImage: string,
  icon: React$Node,
  title: string,
  description: string,
  learnMoreLink: string,
};

class UpgradeModal extends PureComponent<Props> {
  handleClose = () => {
    this.props.onClose();
    window.analytics.track(`UpgradeModalClose${this.props.title}`, {
      category: 'UpgradeModal',
      title: this.props.title,
      learnMoreLink: this.props.learnMoreLink,
    });
  };

  handleUpgrade = () => {
    window.analytics.track(`UpgradeModalClickCTA${this.props.title}`, {
      category: 'UpgradeModal',
      title: this.props.title,
    });

    window.location = '/#/app/account/subscription';
  };

  handleLearnMore = () => {
    window.analytics.track(`UpgradeModalClickLearnMore${this.props.title}`, {
      category: 'UpgradeModal',
      title: this.props.title,
      learnMoreLink: this.props.learnMoreLink,
    });
  };

  handleStartTrial = () => {
    window.analytics.track(`UpgradeModal7DayTrialCTA${this.props.title}`, {
      category: 'UpgradeModal',
      title: this.props.title,
    });
    const { requiredPlan } = this.props;
    if (requiredPlan === 'PROFESSIONAL') {
      window.open('https://upkeep.typeform.com/to/M7TKw4');
      return;
    }
    window.open('https://upkeep.typeform.com/to/Q1yUF4');
  };

  renderSubHeader = () => {
    const { requiredPlan, t } = this.props;

    if (requiredPlan === 'STARTER') {
      return t('modals.upgradeModal.starterPlan');
    }

    if (requiredPlan === 'PROFESSIONAL') {
      return t('modals.upgradeModal.professionalPlan');
    }

    if (requiredPlan === 'BUSINESS_PLUS') {
      return t('modals.upgradeModal.businessPlusPlan');
    }

    return t('modals.upgradeModal.enterprisePlan');
  };

  /**
   * Render an "Upgrade for this feature" modal
   * @return {React$Node}
   */
  render() {
    const { t, requiredPlan } = this.props;
    const iconHeader = this.props.icon ? 'true' : 'false';
    const isStarter = requiredPlan === 'STARTER';

    return (
      <Modal maxWidth={450} padding={0}>
        <ModalHeader
          icon={iconHeader}
          header={() => (
            <HeaderWrapper backgroundImage={this.props.backgroundImage}>
              <SubHeader>{this.renderSubHeader()}</SubHeader>
              <Header>{this.props.title}</Header>
              {this.props.icon && <GraphicWrapper>{this.props.icon}</GraphicWrapper>}
            </HeaderWrapper>
          )}
          onClose={this.handleClose}
        />
        <Wrapper>
          <Description hasButtonDescription={isStarter}>{this.props.description}</Description>
          {isStarter && (
            <LearnMore>
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <a href={this.props.learnMoreLink} target="_blank" onClick={this.handleLearnMore}>
                {t('modals.upgradeModal.learnMore')}
              </a>
            </LearnMore>
          )}
          {!isStarter ? (
            <ButtonWrapper>
              <ButtonDescription>
                {`${t('modals.upgradeModal.readyToTest')} ${this.props.title}.`}
              </ButtonDescription>
              <Button theme="blue" onClick={this.handleStartTrial} size="xxxl">
                {t('modals.upgradeModal.startTrial')}
              </Button>
            </ButtonWrapper>
          ) : (
            <Button theme="blue" onClick={this.handleUpgrade} size="xxxl">
              {t('modals.upgradeModal.upgradeNow')}
            </Button>
          )}
        </Wrapper>
      </Modal>
    );
  }
}

export default UpgradeModal;
