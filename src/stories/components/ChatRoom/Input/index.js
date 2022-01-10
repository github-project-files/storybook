// @flow

import React, { PureComponent } from 'react';
import { Picker } from 'emoji-mart';
import fileUpload from 'utils/fileUpload';
import uniqueId from 'lodash.uniqueid';
import * as Actions from 'store/Actions';
import {
  Wrapper,
  TextArea,
  FileButton,
  PaperclipIcon,
  ThumbnailContainer,
  ThumbnailPreview,
  EmojiWrapper,
  EmojiIconActive,
  EmojiIconInactive,
  UploadingImage,
  Error,
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
};

type State = {
  emojiKeyboard: boolean,
  error: ?string,
};

class ChatRoomInput extends PureComponent<Props, State> {
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
    if (this.props.singleUpload && files.length > 1) {
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
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <span
            className="delete-image"
            onClick={
              // eslint-disable-next-line no-underscore-dangle
              () => this.handleDeleteImage(item._id)
            }
          >
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
          <FileButton>
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
          />
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

export default ChatRoomInput;
