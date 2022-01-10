// @flow

import React, { PureComponent } from 'react';
import 'whatwg-fetch';

// Components
import { Document, Page } from 'react-pdf';
import Modal, { ModalHeader, ModalBody, ModalFooter } from 'components/Modal';
import Button from 'components/Button';
import PageLoader from 'components/PageLoader';
import Tooltip from 'components/Tooltip';
import generateCloudfrontUrl from 'utils/generateCloudfrontUrl';
import { DownloadWrapper, DownloadIcon } from './styled';

// Utilities

type Props = {
  onClose: () => void,
  pdfURL: string,
  fileName: string,
};

type State = {
  numPages: null | number,
  loaded: boolean,
};

class ViewPDFModal extends PureComponent<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    numPages: null,
    loaded: false,
  };

  /**
   * Click handler for download button
   * @return {Function}
   */
  handleDownload = () => {
    const file = generateCloudfrontUrl(this.props.pdfURL);
    return fetch(file)
      .then(r => r.blob())
      .then(blob => this.createBlob(blob));
  };

  /**
   * Create Blob object to view PDFs.
   * For all browsers except Chrome it is
   * necessary to explicitly set the mime-type
   * @param {Blob} blob
   * @param {string} fileName
   * @param {string} ext
   */
  createBlob = (blob: Blob) => {
    const newBlob = new Blob([blob], { type: 'application/pdf' });
    const data = window.URL.createObjectURL(newBlob);

    // Internet Explorer does not support blobs directly as an href
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }

    // Create a link pointing to the ObjectURL containing the blob.
    this.buildLink(data);
  };

  /**
   * Create an a tag with appropriate url as href.
   * For pdfs this will be an Object URL generated in createBlob.
   * For all other files this will come directly from this.props.workOrderFiles.url
   * Simulate click.
   * @param {string} data
   * @param {string} fileName
   */
  buildLink = (data: string) => {
    const link = document.createElement('a');
    const evt = new MouseEvent('click', { view: window, bubbles: true, cancelable: false });

    link.href = data;
    link.target = '_blank';
    link.download = this.props.fileName;
    link.dispatchEvent(evt);

    // Firefox requires a delay before revoking the ObjectURL
    setTimeout(() => {
      window.URL.revokeObjectURL(data);
    }, 100);
  };

  /**
   * Render a modal to view PDF files
   * @return {React$Node}
   */
  render() {
    const { pdfURL, fileName } = this.props;
    const { numPages, loaded } = this.state;
    const modalPadding = 20;
    const modalWidth = window.innerWidth - 400;
    const pageWidth = modalWidth - modalPadding * 2;

    return (
      <Modal maxWidth={modalWidth} padding={modalPadding}>
        <ModalHeader
          onClose={this.props.onClose}
          header={() => {
            return (
              <>
                <span>{fileName}</span>
                <DownloadWrapper onClick={this.handleDownload}>
                  <Tooltip id="pdf-modal-download" value="Download">
                    <DownloadIcon />
                  </Tooltip>
                </DownloadWrapper>
              </>
            );
          }}
        />
        <ModalBody withPadding>
          <Document
            file={{ url: pdfURL }}
            // eslint-disable-next-line no-shadow
            onLoadSuccess={({ numPages }) => this.setState({ numPages, loaded: true })}
            loading={<PageLoader />}
          >
            {numPages &&
              Array.from(new Array(numPages), (el, index) => {
                return (
                  <React.Fragment key={`page_${index + 1}`}>
                    <Page
                      pageNumber={index + 1}
                      width={pageWidth}
                      renderAnnotations={false}
                      renderTextLayer={false}
                    />
                    {loaded && (
                      <span>
                        Page
                        {index + 1} of
                        {numPages}
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
          </Document>
        </ModalBody>
        <ModalFooter>
          <Button theme="cancel" pill onClick={this.props.onClose}>
            close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ViewPDFModal;
