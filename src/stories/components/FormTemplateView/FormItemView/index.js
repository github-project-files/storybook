// @flow

import React, { PureComponent } from 'react';
import debounce from 'lodash.debounce';
import generateUserName from 'utils/generateUserName';
import fileUpload from 'utils/fileUpload';
import * as Actions from 'store/Actions';
import uniqueId from 'lodash.uniqueid';
import generateCloudfrontUrl from 'utils/generateCloudfrontUrl';
import Lightbox from 'react-images';

import Select from 'components/Select';
import SelectStatus from 'components/SelectStatus';
import AssetIcon from 'assets/commonIcons/assetsIcon.svg';
import MeterIcon from 'assets/commonIcons/metersIcon.svg';
import PeopleIcon from 'assets/commonIcons/peopleTeamsIcon.svg';
import ImageIcon from 'assets/commonIcons/imageIcon.svg';
import NotesIcon from 'assets/commonIcons/notesIcon.svg';
import Tooltip from 'components/Tooltip';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { USER_ROLES } from 'constants/userRoles';

import {
  ItemRow,
  SubRow,
  SubRowHeader,
  CloseWrapper,
  SubRowActions,
  StyledInput,
  RowContent,
  RowActions,
  RowIcon,
  TextArea,
  CloseIcon,
  FileSelectorWrapper,
  ImageWrapper,
  AttachmentsWrapper,
} from './styled';

// eslint-disable-next-line no-unused-vars
type Props = {
  formItem: Object,
  onUpdate: Function,
  allowUpdate?: boolean,
  canEditFormValues?: boolean,
  triggerImageUpgradeModal?: Function,
  [key: string]: any,
};

type State = {
  showSubMenu: null | 'images' | 'notes',
  status: string,
  note: string,
  images: Array<Object>,
  value: string,
  lightboxImage: ?string,
  loading: boolean,
};

class FormItemView extends PureComponent<$FlowLintFix, State> {
  /**
   * Debounces the handleSave method
   * @param {Object} props
   */
  constructor(props: $FlowLintFix) {
    super(props);
    this.handleDelayedSaveFormItem = debounce(this.handleDelayedSaveFormItem, 1000);
  }

  // eslint-disable-next-line react/state-in-constructor
  state = {
    showSubMenu: null,
    status: (this.props.allowUpdate && this.props.formItem.value) || 'OPEN',
    note: this.props.allowUpdate ? this.props.formItem.note : '',
    value: this.props.allowUpdate ? this.props.formItem.value : '',
    images: this.props.allowUpdate ? this.props.formItem.images : [],
    lightboxImage: null,
    loading: false,
  };

  handleToggleImages = () => {
    const { triggerImageUpgradeModal } = this.props;
    if (triggerImageUpgradeModal) {
      triggerImageUpgradeModal();
    } else {
      this.setState({
        // eslint-disable-next-line react/no-access-state-in-setstate
        showSubMenu: this.state.showSubMenu === 'images' ? null : 'images',
      });
    }
  };

  handleToggleNotes = () => {
    window.analytics.track('TaskEditNoteTapped', {
      category: 'WorkOrderDetailsCategory',
    });
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      showSubMenu: this.state.showSubMenu === 'notes' ? null : 'notes',
    });
  };

  handleCloseSubMenu = () => {
    this.setState({ showSubMenu: null });
  };

  handleSaveNote = async () => {
    this.setState({ loading: true });

    await this.handleSaveFormItem({ note: this.state.note });

    this.setState({
      showSubMenu: null,
      loading: false,
    });
  };

  handleSaveImages = async () => {
    this.setState({ loading: true });

    let images = [];

    if (this.state.images) {
      const oldImages = [];

      const uploadImagePromises = this.state.images.reduce((uploadedImages, image) => {
        if (image.deleted) {
          return uploadedImages;
        }

        if (image.file) {
          return uploadedImages.concat([fileUpload.uploadFile('work-order', image.file)]);
        }
        oldImages.push(image);
        return uploadedImages;
      }, []);

      let newImages = await Promise.all(uploadImagePromises);
      newImages = newImages.map(image => {
        return { id: null, url: image };
      });

      images = oldImages.concat(newImages);

      images = images.map(image => {
        return { id: image.id, url: image.url };
      });
    }

    await this.handleSaveFormItem({ images });
    this.setState({
      images,
      showSubMenu: null,
      loading: false,
    });
  };

  handleChangeStatus = async (status: string) => {
    await this.handleSaveFormItem({ value: status });
    this.setState({ status });
  };

  handleUpdateNote = (event: Object) => {
    this.setState({ note: event.target.value });
  };

  handleUpdateValue = (value: string) => {
    this.setState({ value });
    this.handleDelayedSaveFormItem({ value });
  };

  handleDelayedSaveFormItem = (valuesToUpdate: Object) => {
    this.handleSaveFormItem(valuesToUpdate);
  };

  handleSaveFormItem = async (valuesToUpdate: Object) => {
    const { formItem, onUpdate } = this.props;

    if (!formItem.id) {
      return;
    }

    await onUpdate({
      id: formItem.id,
      ...valuesToUpdate,
    });
  };

  // image upload --- START
  // eslint-disable-next-line react/sort-comp
  validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  readFile = async (file: File) => {
    try {
      return await fileUpload.readAsDataUrl(file);
    } catch (e) {
      Actions.alertNotification('Error reading file!', 'error');
    }
  };

  processSelectedFiles = async (files: Array<File>) => {
    const validFiles = [];
    let invalidFiles = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      const extension = file.name
        .split('.')
        .pop()
        .toLowerCase();
      if (this.validExtensions.indexOf(extension) === -1) {
        invalidFiles += 1;
        // eslint-disable-next-line no-continue
        continue;
      }
      // eslint-disable-next-line no-await-in-loop
      const dataUrl = await this.readFile(file);
      validFiles.push({
        _id: uniqueId('thumb-'),
        file,
        url: dataUrl,
        deleted: false,
      });
    }

    if (invalidFiles) {
      Actions.alertNotification('Invalid file!', 'error');
    }

    if (validFiles.length) {
      // eslint-disable-next-line react/no-access-state-in-setstate
      const images = this.state.images.concat(validFiles);

      images.filter(image => {
        return !image.deleted;
      });

      this.setState({
        images,
      });
    }
  };

  handleFileSelected = (e: Object) => {
    window.analytics.track('TaskAddImageTapped', {
      category: 'WorkOrderDetailsCategory',
    });
    this.processSelectedFiles([...e.currentTarget.files]);
  };

  handleDeleteImage = (image: Object) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const images = this.state.images.map(i => {
      const newImage = { ...i };
      // eslint-disable-next-line no-underscore-dangle
      if ((image.url && i.url === image.url) || (image._url && i._url === image._url)) {
        newImage.deleted = true;
      }
      return newImage;
    });

    this.setState({
      images,
    });
  };

  /**
   * Handle clicking carousel image
   * @param {string} src
   */
  handleImageClick = (src: string) => {
    this.setState({
      lightboxImage: src,
    });
  };

  /**
   * Handle closing image lightbox
   */
  handleLightboxClose = () => {
    this.setState({
      lightboxImage: null,
    });
  };

  // image upload -- END

  notDeletedImages = () => {
    return this.state.images.reduce((notDeletedImages, image) => {
      if (!image.deleted) {
        return notDeletedImages.concat(image);
      }
      return notDeletedImages;
    }, []);
  };

  hasImageEditingAccess = (session: Object) => {
    switch (session.accountType) {
      case USER_ROLES.ADMIN:
      case USER_ROLES.TECH:
      case USER_ROLES.LIMITED_TECH:
        return true;
      default:
        return false;
    }
  };

  /**
   * Render images
   * @param {boolean} hasEditAccess
   * @return {React$Node}
   */
  renderImages = (hasEditAccess: boolean | typeof undefined) => {
    const result = [];

    this.state.images.forEach(image => {
      if (!image.deleted) {
        const imageUrl = generateCloudfrontUrl(image.url);
        const imageRender = (
          <ImageWrapper>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
            <img alt="" src={imageUrl} onClick={() => this.handleImageClick(imageUrl)} />
            {(hasEditAccess || hasEditAccess === undefined) && ( // backwards compatibility,
              // handles use cases where edit access is not available
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
              <span className="delete-image" onClick={() => this.handleDeleteImage(image)}>
                ×
              </span>
            )}
          </ImageWrapper>
        );

        result.push(imageRender);
      }
    });

    if (result.length > 0) {
      return result;
    }
    return null;
  };

  renderRowIcons = () => {
    const { formItem } = this.props;
    const { note } = this.state;
    return (
      <RowActions>
        {formItem.user && formItem.user.id && (
          <Tooltip
            id={`tooltip-user-${formItem.id}`}
            value={formItem.user ? generateUserName(formItem.user) : ''}
            effect="solid"
            display={!!formItem.user}
          >
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
            <span onClick={() => window.open(`/web/people/${formItem.user.id}`)}>
              <RowIcon selected={formItem.user}>
                <PeopleIcon />
              </RowIcon>
            </span>
          </Tooltip>
        )}
        {formItem.asset && formItem.asset.id && (
          <Tooltip
            id={`tooltip-asset-${formItem.id}`}
            value={formItem.asset ? formItem.asset.name : ''}
            effect="solid"
            display={!!formItem.asset}
          >
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
            <span onClick={() => window.open(`/#/app/assets/view/${formItem.asset.id}`)}>
              <RowIcon selected={formItem.asset}>
                <AssetIcon />
              </RowIcon>
            </span>
          </Tooltip>
        )}
        {formItem.meter && formItem.meter.id && (
          <Tooltip
            id={`tooltip-meter-${formItem.id}`}
            value={formItem.meter ? formItem.meter.name : ''}
            effect="solid"
            display={!!formItem.meter}
          >
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
            <span onClick={() => window.open(`/#/app/meters/view/${formItem.meter.id}`)}>
              <RowIcon selected={formItem.meter}>
                <MeterIcon />
              </RowIcon>
            </span>
          </Tooltip>
        )}
        <Tooltip id={`tooltip-note-${formItem.id}`} value={note} effect="solid" display={!!note}>
          <RowIcon selected={note} onClick={this.handleToggleNotes}>
            <NotesIcon />
          </RowIcon>
        </Tooltip>
        <Tooltip
          id={`tooltip-images-${formItem.id}`}
          value={`${this.notDeletedImages().length} Images`}
          effect="solid"
          display
        >
          <RowIcon selected={this.notDeletedImages().length > 0} onClick={this.handleToggleImages}>
            <ImageIcon />
          </RowIcon>
        </Tooltip>
      </RowActions>
    );
  };

  /**
   * Render the form item view
   * @return {React$Node}
   */
  render() {
    const { formItem, allowUpdate, canEditFormValues, session } = this.props;
    const { showSubMenu, status, images, value, lightboxImage, loading } = this.state;
    const hasEditAccess = session ? this.hasImageEditingAccess(session) : undefined;

    let row;

    const name = formItem.name || '<Enter a task name>';

    if (formItem.type === 'TASK') {
      row = (
        <SelectStatus
          value={status}
          onChange={selection => this.handleChangeStatus(selection.value)}
          disabled={!canEditFormValues}
        />
      );
    } else if (formItem.type === 'TEXT') {
      row = (
        <StyledInput
          type="text"
          value={value}
          onChange={event => this.handleUpdateValue(event.target.value)}
          disabled={!canEditFormValues}
        />
      );
    } else if (
      formItem.type === 'NUMBER' ||
      (formItem.type === 'METER_READING' && formItem.meter)
    ) {
      row = (
        <StyledInput
          type="number"
          value={value}
          onChange={event => this.handleUpdateValue(event.target.value)}
          disabled={!canEditFormValues}
        />
      );
    } else if (formItem.type === 'CHECKLIST') {
      const options = [
        { value: 'PASS', label: 'PASS' },
        { value: 'FLAG', label: 'FLAG' },
        { value: 'FAIL', label: 'FAIL' },
      ];

      row = (
        <Select
          options={options}
          value={value}
          onChange={selection => this.handleUpdateValue(selection.value)}
          disabled={!canEditFormValues}
        />
      );
    } else if (formItem.type === 'MULTIPLE_CHOICE') {
      const options = formItem.options
        ? formItem.options.map(option => {
            return { value: option, label: option };
          })
        : [];

      row = (
        <Select
          options={options}
          value={value}
          onChange={selection => this.handleUpdateValue(selection.value)}
          disabled={!canEditFormValues}
        />
      );
    }

    return (
      <div>
        <ItemRow>
          <RowContent>
            <h2>
              {name}
              {formItem.required ? <span className="required"> *</span> : null}
            </h2>
            {row}
          </RowContent>
          {this.renderRowIcons()}
        </ItemRow>
        <SubRow show={showSubMenu}>
          {(() => {
            if (showSubMenu === 'images') {
              return (
                <div>
                  <SubRowHeader>
                    <span className="image-count">
                      <span className="count-number">{this.notDeletedImages().length}</span> images
                    </span>
                    {(hasEditAccess || hasEditAccess === undefined) && (
                      <FileSelectorWrapper>
                        <input
                          type="file"
                          id="image"
                          onChange={this.handleFileSelected}
                          accept="image/*"
                          value=""
                          multiple
                          disabled={!allowUpdate}
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="image">+ Add Image</label>
                      </FileSelectorWrapper>
                    )}
                    <CloseIcon onClick={this.handleCloseSubMenu} />
                  </SubRowHeader>
                  {(() => {
                    if (images) {
                      return (
                        <AttachmentsWrapper>
                          {this.notDeletedImages().length > 0 ? (
                            this.renderImages(hasEditAccess)
                          ) : (
                            <span>No Images</span>
                          )}
                        </AttachmentsWrapper>
                      );
                    }
                  })()}
                  {(hasEditAccess || hasEditAccess === undefined) && (
                    <SubRowActions>
                      <Button theme="transparent" size="sm" onClick={this.handleCloseSubMenu}>
                        Cancel
                      </Button>
                      <Button
                        theme="blue-gradient"
                        size="sm"
                        pill
                        onClick={this.handleSaveImages}
                        disabled={loading || !allowUpdate}
                      >
                        {loading ? <Loader size="sm" /> : 'Save'}
                      </Button>
                    </SubRowActions>
                  )}
                </div>
              );
            }

            if (showSubMenu === 'notes') {
              return (
                <div>
                  <CloseWrapper>
                    <CloseIcon onClick={this.handleCloseSubMenu} />
                  </CloseWrapper>
                  <TextArea rows="5" onChange={event => this.handleUpdateNote(event)}>
                    {this.state.note}
                  </TextArea>
                  <SubRowActions>
                    <Button theme="transparent" size="md" onClick={this.handleCloseSubMenu}>
                      Cancel
                    </Button>
                    <Button
                      theme="blue-gradient"
                      size="md"
                      pill
                      onClick={this.handleSaveNote}
                      disabled={loading || !allowUpdate}
                    >
                      {loading ? <Loader size="sm" /> : 'Save'}
                    </Button>
                  </SubRowActions>
                </div>
              );
            }
          })()}
        </SubRow>
        {lightboxImage ? (
          <Lightbox
            images={[{ src: lightboxImage }]}
            isOpen={!!lightboxImage}
            onClose={this.handleLightboxClose}
          />
        ) : null}
      </div>
    );
  }
}

export default FormItemView;
