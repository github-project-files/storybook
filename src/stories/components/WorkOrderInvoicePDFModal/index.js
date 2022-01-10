// @flow

import React, { PureComponent } from 'react';

// Components
import Modal, { ModalBody, ModalFooter, ModalHeader } from 'components/Modal';
import Button from 'components/Button';
import { pdf, PDFViewer } from '@react-pdf/renderer';
import WorkOrderInvoicePDF from 'components/WorkOrderInvoicePDF';

type Props = {
  onClose: () => void,
  woInvoice: Object,
};

class WorkOrderInvoicePDFModal extends PureComponent<Props> {
  doc = (<WorkOrderInvoicePDF woInvoice={this.props.woInvoice} />);

  handleDownloadPDF = async () => {
    const blob = await pdf(this.doc).toBlob();
    const data = window.URL.createObjectURL(blob);

    // Internet Explorer does not support blobs directly as an href
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob);
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
    link.download = `Work-Order-Invoice-Preview-${this.props.woInvoice.invoiceNo}`;
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
    const modalPadding = 20;
    const modalWidth = window.innerWidth - 400;
    return (
      <Modal maxWidth={modalWidth} padding={modalPadding}>
        <ModalHeader
          header={`Work Order #${this.props.woInvoice.invoiceNo} Invoice Preview`}
          onClose={this.props.onClose}
        />
        <ModalBody withPadding>
          <PDFViewer width="100%" height="1000">
            {this.doc}
          </PDFViewer>
        </ModalBody>
        <ModalFooter>
          <Button theme="close" thin pill onClick={this.props.onClose}>
            Close
          </Button>
          <Button theme="blue-gradient" onClick={this.handleDownloadPDF} pill>
            Download
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default WorkOrderInvoicePDFModal;
