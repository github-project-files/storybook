// @flow

import React, { PureComponent } from 'react';
import type { RouterHistory, Match } from 'react-router';
import { Query } from 'react-apollo';

import Modal, { ModalHeader, ModalBody, ModalFooter } from 'components/Modal';
import SearchBar from 'components/SearchBar';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Checkbox from 'components/Checkbox';
import fileUpload from 'utils/fileUpload';
import apolloClient from 'gql/apolloClient';

import FILES_QUERY from 'gql/queries/Files.graphql';
import ADD_FILE_MUTATION from 'gql/mutations/AddFile.graphql';
import { Table, TableBody, ColumnHeader, TableCell, FileButton, Error } from './styled';

type Props = {
  onClose: () => void,
  t: Function,
  // eslint-disable-next-line react/no-unused-prop-types
  history: RouterHistory,
  // eslint-disable-next-line react/no-unused-prop-types
  match: Match,
  selectedFiles: Object,
  onSubmit: Function,
};

type State = {
  searchInput: string,
  selectedFiles: Object,
  error: string,
  uploading: boolean,
};

const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'mp4', 'mov', 'txt'];

const mapFileType = {
  jpg: 'photo',
  jpeg: 'photo',
  png: 'photo',
  gif: 'photo',
  pdf: 'pdf',
  mp4: 'video',
  mov: 'video',
  txt: 'text/plain',
};

class SelectFileModal extends PureComponent<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    searchInput: '',
    // React anti-pattern, using props for initial value as it is a modal
    selectedFiles: this.props.selectedFiles.reduce((obj, file) => {
      // eslint-disable-next-line no-param-reassign
      obj[file.id] = file;
      return obj;
    }, {}),
    error: '',
    uploading: false,
  };

  handleSearch = (value: string) => {
    this.setState({ searchInput: value });
  };

  handleSelect = (file: Object) => {
    const { ...state } = this.state.selectedFiles;

    if (state[file.id]) {
      delete state[file.id];
    } else {
      state[file.id] = file;
    }

    this.setState({ selectedFiles: state });
  };

  handleSubmit = () => {
    window.analytics.track('FileAdded', {
      category: 'WorkOrderDetailsCategory',
    });
    const { selectedFiles } = this.state;
    const files = Object.values(selectedFiles);
    this.props.onSubmit(files);
    this.props.onClose();
  };

  processSelectedFile = async (file: File) => {
    const { searchInput } = this.state;
    const extension = file.name
      .split('.')
      .pop()
      .toLowerCase();
    if (validExtensions.indexOf(extension) === -1) {
      this.setState({
        error:
          `The file you are trying to upload is unsupported.` +
          `Supported types are: ${validExtensions.join(', ')}`,
      });
      return;
    }
    this.setState({ uploading: true, error: '' });
    const uploadedFile = await fileUpload.uploadFile('files', file);

    try {
      await apolloClient.mutate({
        mutation: ADD_FILE_MUTATION,
        variables: {
          name: file.name,
          mimeType: file.type.toString(),
          originalPlatform: 'web',
          url: uploadedFile,
          fileType: mapFileType[extension] || 'file',
        },
        update: async (proxy, { data: { addFile } }) => {
          this.setState({ uploading: false });
          const queryData = proxy.readQuery({
            query: FILES_QUERY,
            variables: {
              search: searchInput,
              limit: 10,
            },
          });
          const newFilesList = Array.from(queryData.files);
          newFilesList.unshift(addFile);
          proxy.writeQuery({
            query: FILES_QUERY,
            variables: {
              search: searchInput,
              limit: 10,
            },
            data: { files: newFilesList },
          });
        },
      });
    } catch (e) {
      this.setState({ uploading: false, error: 'Something went wrong!' });
    }
  };

  handleFileSelected = (e: Object) => {
    const { files } = e.currentTarget;
    this.processSelectedFile(files[0]);
  };

  renderTable = (records: Object) => {
    const { selectedFiles } = this.state;

    return (
      <>
        <Table>
          <thead>
            <tr>
              <ColumnHeader />
              <ColumnHeader>File Name</ColumnHeader>
              <ColumnHeader>File Type</ColumnHeader>
            </tr>
          </thead>
          <TableBody>
            {records.map(ele => (
              <tr key={ele.id}>
                <TableCell>
                  <Checkbox
                    onClick={() => this.handleSelect(ele)}
                    checked={selectedFiles[ele.id]}
                  />
                </TableCell>
                <TableCell>{ele.originalName}</TableCell>
                <TableCell>{ele.fileType}</TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
        <br />
        {!records.length ? (
          <div style={{ textAlign: 'center' }}>
            You have not added any files. <a href="/#/app/account/files">Create a new file here.</a>
          </div>
        ) : null}
      </>
    );
  };

  /**
   * Render a modal with a form for initiating a new group message
   * @return {React$Node}
   */
  render() {
    const limit = 10;
    const { t } = this.props;
    const { searchInput, uploading, error } = this.state;
    const localeKey = 'modals.selectFiles';

    return (
      <Modal maxWidth={600} padding={30}>
        <ModalHeader header={t(`${localeKey}.header`)} onClose={this.props.onClose} />
        <ModalBody withPadding>
          <Query query={FILES_QUERY} variables={{ search: searchInput, limit }}>
            {// eslint-disable-next-line no-shadow
            ({ loading, data }) => {
              return (
                <>
                  <SearchBar
                    size="sm"
                    onClick={event => event.stopPropagation()}
                    onSearchChange={this.handleSearch}
                  />
                  <br />
                  {loading ? <Loader /> : this.renderTable(data.files)}
                </>
              );
            }}
          </Query>
        </ModalBody>
        <ModalFooter>
          <FileButton>
            <input
              type="file"
              onChange={this.handleFileSelected}
              value=""
              disabled={uploading}
              accept="image/*, video/*, .pdf, .txt"
            />
            {uploading ? <Loader size="sm" /> : 'Upload File'}
          </FileButton>
          {error && <Error>{error}</Error>}
          <Button theme="cancel" type="submit" pill onClick={this.props.onClose}>
            {t(`${localeKey}.cancel`)}
          </Button>
          <Button theme="blue-gradient" pill onClick={this.handleSubmit}>
            {t(`${localeKey}.submit`)}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default SelectFileModal;
