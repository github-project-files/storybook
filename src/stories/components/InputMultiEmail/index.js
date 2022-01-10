// @flow

import React, { PureComponent } from 'react';
import Button from 'components/Button';

import {
  TagItem,
  RemoveButton,
  InputMultiEmailWrapper,
  InputWrapper,
  Email,
  InputHeading,
  Hint,
  ButtonWrapper,
} from './styled';

type State = {
  items: Array<*>,
  value: string,
  error: any,
  info: any,
};

type Props = {
  onHandleSubmit: Function,
  isSubmitting: boolean,
  // eslint-disable-next-line react/no-unused-prop-types
  session: Object,
  t: Function,
};

class InputMultiEmail extends PureComponent<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    items: [],
    value: '',
    error: null,
    info: null,
  };

  handleKeyDown = (evt: Object) => {
    if (['Enter', 'Tab', ','].includes(evt.key)) {
      evt.preventDefault();

      const value = this.state.value.trim();

      if (value && this.isValid(value)) {
        this.setState({
          // eslint-disable-next-line react/no-access-state-in-setstate
          items: [...this.state.items, this.state.value],
          value: '',
          error: null,
          info: null,
        });
      }
    }
  };

  handleChange = (evt: Object) => {
    const { value } = evt.target;
    let info = null;
    if (value) {
      info = `Hit 'Tab' or 'Enter' to validate this email address and add it to the list 
      of users to be invited.`;
    }
    this.setState({
      value,
      info,
      error: null,
    });
  };

  handleDelete = (item: *) => {
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      items: this.state.items.filter(i => i !== item),
    });
  };

  handlePaste = (evt: Object) => {
    evt.preventDefault();

    const paste = evt.clipboardData.getData('text');
    // eslint-disable-next-line no-useless-escape
    const emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      const toBeAdded = emails.filter(email => !this.isInList(email));

      this.setState({
        // eslint-disable-next-line react/no-access-state-in-setstate
        items: [...this.state.items, ...toBeAdded],
      });
    }
  };

  handleBlur = () => {
    window.analytics.track('trackEmailFieldTapped', {
      category: 'AddPerson',
    });
    const value = this.state.value.trim();

    if (value && this.isValid(value)) {
      this.setState({
        // eslint-disable-next-line react/no-access-state-in-setstate
        items: [...this.state.items, this.state.value],
        value: '',
        error: null,
        info: null,
      });
    }
  };

  handleSubmit = () => {
    window.analytics.track('SendInviteTapped', {
      category: 'AddPerson',
    });
    const value = this.state.value.trim();
    if (value && this.isValid(value)) {
      this.setState(
        {
          // eslint-disable-next-line react/no-access-state-in-setstate
          items: [...this.state.items, this.state.value],
          value: '',
          error: null,
          info: null,
        },
        () => this.props.onHandleSubmit(this.state.items),
      );
    } else if (this.state.items.length) {
      this.props.onHandleSubmit(this.state.items);
    }
  };

  /**
   * Check if email is valid
   * @param {string} email
   * @return {boolean}
   */
  isValid(email: string) {
    let error = null;

    if (this.isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (!this.isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (error) {
      this.setState({ error });

      return false;
    }

    return true;
  }

  /**
   * Check if email is in list
   * @param {string} email
   * @return {boolean}
   */
  isInList(email: string) {
    return this.state.items.includes(email);
  }

  /* eslint-disable class-methods-use-this */
  /**
   * Check if email is of type email
   * @param {string} email
   * @return {boolean}
   */
  isEmail(email: string) {
    // eslint-disable-next-line no-useless-escape
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }
  /* eslint-enable class-methods-use-this */

  /**
   * Render a modal with a form for adding a new user
   * @return {React$Node}
   */
  render() {
    const { t } = this.props;
    const localeKey = 'modals.userCreationModal';

    return (
      <InputMultiEmailWrapper>
        <InputHeading>{t('modals.userCreationModal.enterEmail')}</InputHeading>
        {this.state.items.map(item => (
          <TagItem key={item}>
            {item}
            <RemoveButton onClick={() => this.handleDelete(item)}>&times;</RemoveButton>
          </TagItem>
        ))}
        <InputWrapper>
          <Email />
          <input
            className={`input ${this.state.error ? ' has-error' : ''}`}
            value={this.state.value}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}
            onPaste={this.handlePaste}
            onBlur={this.handleBlur}
          />
        </InputWrapper>
        {this.state.error && <p className="error">{this.state.error}</p>}
        {this.state.info && !this.state.error && <p className="info">{this.state.info}</p>}
        <Hint>
          You may add 20 users at a time by pressing &lsquo;tab&rsquo; or &lsquo;enter&rsquo; after
          each email entry. Any duplicate and registered emails will be removed while registering
          the requested users.
        </Hint>
        <ButtonWrapper>
          <Button
            className="invite-button"
            theme="blue"
            type="submit"
            pill={false}
            onClick={this.handleSubmit}
            loading={this.props.isSubmitting}
            disabled={!this.state.value && !this.state.items.length}
          >
            {t(`${localeKey}.sendInvite`)}
          </Button>
        </ButtonWrapper>
      </InputMultiEmailWrapper>
    );
  }
}

export default InputMultiEmail;
