// @flow

import React, { PureComponent } from 'react';
import apolloClient from 'gql/apolloClient';
import * as Actions from 'store/Actions';

import Tooltip from 'components/Tooltip';
import { withErrorBoundary } from 'utils/hocs';
import SidebarCardError from 'components/ErrorComponent/SidebarCard';

import UPDATE_FORM_ITEM_MUTATION from 'gql/mutations/UpdateFormItem.graphql';
import FormItemView from './FormItemView';

import { Wrapper, HeaderRow, ClipboardIcon, SubTitle } from './styled';

// eslint-disable-next-line no-unused-vars
type Props = {
  title?: string,
  formItems: Array<Object>,
  allowUpdate?: boolean,
  canEditFormValues?: boolean,
  onFormItemChange?: Function,
  required?: boolean,
  triggerImageUpgradeModal?: Function,
  [key: string]: any,
};

type State = {
  images: Array<Object>,
};

class FormTemplateView extends PureComponent<$FlowLintFix, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    // eslint-disable-next-line react/no-unused-state
    images: [],
  };

  handleUpdateFormItem = async (formItem: Object) => {
    const formItemObject = formItem;
    if (!this.props.allowUpdate) {
      return;
    }
    const formItemsArr = this.props.formItems;
    formItemObject.formType = formItemsArr.filter(item => item.id === formItem.id)[0].type;

    try {
      await apolloClient.mutate({
        mutation: UPDATE_FORM_ITEM_MUTATION,
        variables: formItemObject,
      });

      if (this.props.onFormItemChange) {
        this.props.onFormItemChange(formItem);
      }

      Actions.alertNotification('Task updated!', 'success');
    } catch (e) {
      Actions.alertNotification('Something went wrong!', 'error');
    }
  };

  /**
   * Render the edit form for a form template
   * @return {React$Node}
   */
  render() {
    const {
      title,
      formItems,
      allowUpdate,
      canEditFormValues,
      triggerImageUpgradeModal,
      required,
      t,
    } = this.props;

    return (
      <Wrapper>
        <HeaderRow>
          <ClipboardIcon />
          <SubTitle>
            {title || 'Task Preview'}
            {required && (
              <Tooltip id="required-tasks" value={t('pages.workorders.tooltips.formItemsRequired')}>
                <span>&nbsp;*</span>
              </Tooltip>
            )}
          </SubTitle>
        </HeaderRow>
        {(() => {
          const results = [];

          formItems.forEach(formItem => {
            results.push(
              <FormItemView
                key={formItem.id}
                formItem={formItem}
                onUpdate={this.handleUpdateFormItem}
                allowUpdate={allowUpdate}
                canEditFormValues={canEditFormValues}
                session={this.props.session}
                triggerImageUpgradeModal={triggerImageUpgradeModal}
              />,
            );
          });

          return results;
        })()}
      </Wrapper>
    );
  }
}

export default withErrorBoundary(FormTemplateView, () => <SidebarCardError name="Tasks" />);
