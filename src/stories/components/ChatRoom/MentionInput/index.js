// @flow

import React, { PureComponent } from 'react';
import { Picker } from 'emoji-mart';
import fileUpload from 'utils/fileUpload';
import uniqueId from 'lodash.uniqueid';
import * as Actions from 'store/Actions';
import { Mention } from 'react-mentions';
import apolloClient from 'gql/apolloClient';
import USER_QUERY from 'gql/queries/Users.graphql';

import {
  Wrapper,
  TextArea,
  MentionArea,
  MentionAreaAvatar,
  MentionAreaAvatarImage,
  MentionAreaInfo,
  MentionAreaAvatarInitials,
  FileButton,
  PaperclipIcon,
  ThumbnailContainer,
  ThumbnailPreview,
  EmojiWrapper,
  EmojiIconActive,
  EmojiIconInactive,
  UploadingImage,
  Error,
  everyoneSVG,
} from './styled';

const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

type Props = {
  t: Function,
  message: string,
  images: Array<Object>,
  imagesUploading: boolean,
  singleUpload?: boolean,
  pickerStyle?: Object,
  disabled?: boolean,
  disableEnterSubmit?: boolean,
  onImagesMutate: (Array<Object>) => *,
  onChange: string => *,
  onSubmit: () => *,
  triggerFileUpgradeModal?: Function,
};

type State = {
  emojiKeyboard: boolean,
  error: ?string,
};

class ChatRoomMentionInput extends PureComponent<Props, State> {
  inputForm = null;

  textarea = null;

  // eslint-disable-next-line react/state-in-constructor
  state = {
    emojiKeyboard: false,
    error: null,
  };

  /**
   * Handle sizing of textArea
   * @param {Object} prevProps
   */
  componentDidUpdate() {
    this.handleGrow();
  }

  getUsers = async (name: String, callback: Function) => {
    const { data } = await apolloClient.query({
      query: USER_QUERY,
      variables: {
        search: name,
      },
    });
    let users = JSON.parse(JSON.stringify(data.users));
    // eslint-disable-next-line array-callback-return
    users.map(user => {
      if (user.id === 'user:wo-all') {
        return;
      }
      let display = user.email;
      if (user.firstName) {
        display = user.firstName;
        if (user.lastName) {
          display += ` ${user.lastName}`;
        }
      }
      if (!user.id.startsWith('user')) {
        // eslint-disable-next-line no-param-reassign
        user.id = `user:${user.id}`;
      }
      // eslint-disable-next-line no-param-reassign
      user.display = display;
      if (!user.avatar) {
        if (display.indexOf('@') > -1) {
          // eslint-disable-next-line no-param-reassign
          user.avatar = display.split('@')[0].charAt(0);
        } else {
          const userChar = display.split(' ');
          // eslint-disable-next-line no-param-reassign
          user.avatar =
            userChar[0].charAt(0) + (userChar[1] ? userChar[1].charAt(0) : userChar[0].charAt(1));
        }
        // eslint-disable-next-line no-param-reassign
        user.avatar = user.avatar.toUpperCase();
      }
    });

    users = [
      {
        id: 'user:wo-all',
        display: 'Everyone',
        email: 'Notify everyone assigned to this Work Order',
        avatar: everyoneSVG,
        legacyAccountType: 'Notify everyone assigned to this Work Order',
      },
    ].concat(users);
    callback(users);
  };

  processSelectedFiles = (files: Array<File>) => {
    const validFiles = [];
    let invalidFiles = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      const extension = file.name
        .split('.')
        .pop()
        .toLowerCase();
      if (validExtensions.indexOf(extension) === -1) {
        invalidFiles += 1;
        // eslint-disable-next-line no-continue
        continue;
      }
      this.readFile(file);
      validFiles.push({
        _id: uniqueId('thumb-'),
        file,
      });
    }

    if (invalidFiles) {
      this.setState({
        error:
          `${invalidFiles} unsupported file${invalidFiles === 1 ? '' : 's'} ignored! ` +
          `Supported types are: ${validExtensions.join(', ')}`,
      });
    }

    if (validFiles.length) {
      const images = this.props.images.concat(validFiles);
      this.props.onImagesMutate(images);
    }
  };

  readFile = async (file: File) => {
    try {
      const dataUrl = await fileUpload.readAsDataUrl(file);
      const images = this.props.images.slice(0);
      images.forEach(i => {
        if (i.file === file) {
          // eslint-disable-next-line no-param-reassign
          i.dataUrl = dataUrl;
        }
      });
      this.props.onImagesMutate(images);
    } catch (e) {
      this.setState({
        error: `Error reading file!`,
      });
    }
  };

  handleFileSelected = (e: Object) => {
    const { files } = e.currentTarget;
    const { singleUpload, triggerFileUpgradeModal } = this.props;
    if (triggerFileUpgradeModal) {
      triggerFileUpgradeModal();
      e.preventDefault();
      return;
    }

    if (singleUpload && files.length > 1) {
      Actions.alertModal({
        id: 1,
        maxWidth: 522,
        header: 'Max upload of one file per comment',
        body: 'Please select one file to upload.',
        onConfirm: () => Actions.removeModal(1),
        confirmLabel: 'Close',
        cancelLabel: 'cancel',
      });
      e.preventDefault();
      return;
    }
    this.processSelectedFiles(files);
  };

  handleFileIconClick = (e: Object) => {
    const { triggerFileUpgradeModal } = this.props;
    if (triggerFileUpgradeModal) {
      triggerFileUpgradeModal();
      e.preventDefault();
    }
  };

  handleDeleteImage = (imageId: string) => {
    const images = this.props.images.slice(0);
    images.forEach(i => {
      // eslint-disable-next-line no-underscore-dangle
      if (i._id === imageId) {
        // eslint-disable-next-line no-param-reassign
        i.deleted = true;
        // eslint-disable-next-line no-param-reassign
        i.file = null;
        // eslint-disable-next-line no-param-reassign
        i.dataUrl = null;
      }
    });

    this.props.onImagesMutate(images);
  };

  handleToggleEmojiKeyboard = () => {
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      emojiKeyboard: !this.state.emojiKeyboard,
    });
  };

  handlePickEmoji = (emoji: Object) => {
    this.props.onChange(`${this.props.message}${emoji.native}`);
  };

  handleGrow = () => {
    if (!this.textarea) {
      return;
    }
    if (!this.textarea.style) {
      return;
    }

    if (!this.props.message) {
      // Needed to reset textarea height
      this.textarea.style.height = null;
    } else {
      this.textarea.style.height = `${this.textarea.scrollHeight}px`;
    }
  };

  handleEnterPress = (e: Object) => {
    if (e.keyCode === 13 && e.shiftKey === false && this.props.disableEnterSubmit !== true) {
      e.preventDefault();
      this.setState({ error: null });
      this.props.onSubmit();
    }
  };

  /**
   * Renders the thumbnail previews for selected images
   * @return {React$Node}
   */
  renderImages() {
    const thumbnails = this.props.images.map(item => {
      if (item.deleted) {
        return null;
      }

      return (
        // eslint-disable-next-line no-underscore-dangle
        <ThumbnailPreview key={item._id}>
          <span className="thumbnail" style={{ backgroundImage: `url(${item.dataUrl})` }} />
          {/* eslint-disable-next-line no-underscore-dangle, jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <span className="delete-image" onClick={() => this.handleDeleteImage(item._id)}>
            ×
          </span>
          {this.props.imagesUploading ? (
            <UploadingImage>
              <div />
              <div />
              <div />
            </UploadingImage>
          ) : null}
        </ThumbnailPreview>
      );
    });

    return <ThumbnailContainer>{thumbnails}</ThumbnailContainer>;
  }

  renderSuggestion = (entry: Object) => {
    return (
      <MentionArea key={entry.id}>
        <MentionAreaAvatar>
          {// eslint-disable-next-line no-nested-ternary
          entry.avatar && typeof entry.avatar === 'string' ? (
            entry.avatar.length <= 2 ? (
              <MentionAreaAvatarInitials>{entry.avatar}</MentionAreaAvatarInitials>
            ) : (
              <MentionAreaAvatarImage>
                <img alt="" src={entry.avatar} />
              </MentionAreaAvatarImage>
            )
          ) : (
            <entry.avatar />
          )}
        </MentionAreaAvatar>
        <MentionAreaInfo>
          <p>{entry.display}</p>
          {entry.email && entry.email.indexOf('@') > 1 && <p>{entry.email}</p>}
          <p>{entry.legacyAccountType}</p>
        </MentionAreaInfo>
      </MentionArea>
    );
  };

  /**
   * Renders the input text box for the chat room view
   * @return {React$Node}
   */
  render() {
    const imageCount = this.props.images.reduce((sum, image) => {
      return sum + !image.deleted;
    }, 0);

    return (
      // eslint-disable-next-line no-return-assign
      <form ref={comp => (this.inputForm = comp)}>
        <Wrapper>
          <FileButton onClick={this.handleFileIconClick}>
            <PaperclipIcon />
            <input
              type="file"
              onChange={this.handleFileSelected}
              value=""
              accept="image/*"
              multiple
            />
          </FileButton>
          <TextArea
            type="text"
            // eslint-disable-next-line no-return-assign
            innerRef={r => (this.textarea = r)}
            autoFocus
            value={this.props.message}
            onChange={e => this.props.onChange(e.target.value)}
            placeholder={this.props.t('pages.messages.writeMessagePlaceholder')}
            onKeyDown={this.handleEnterPress}
            disabled={this.props.disabled}
            className="custom-mention-input"
          >
            <Mention
              trigger="@"
              data={this.getUsers}
              displayTransform={(id, display) => `@${display}`}
              markup="@[__display__](__id__)"
              renderSuggestion={this.renderSuggestion}
            />
          </TextArea>
          {this.state.emojiKeyboard ? (
            <EmojiIconActive onClick={this.handleToggleEmojiKeyboard} />
          ) : (
            <EmojiIconInactive onClick={this.handleToggleEmojiKeyboard} />
          )}
          {this.state.emojiKeyboard && (
            <EmojiWrapper>
              <Picker
                onSelect={this.handlePickEmoji}
                style={this.props.pickerStyle && this.props.pickerStyle}
              />
            </EmojiWrapper>
          )}
        </Wrapper>
        {imageCount ? <div>{this.renderImages()}</div> : null}
        {this.state.error ? <Error>{this.state.error}</Error> : null}
      </form>
    );
  }
}

export default ChatRoomMentionInput;
