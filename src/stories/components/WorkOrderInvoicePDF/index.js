// @flow

import React, { PureComponent } from 'react';
import { Page, Document, StyleSheet, View, Text, Image, Font } from '@react-pdf/renderer';
import fontRegular from 'assets/OpenSans-Regular.ttf';
import fontBold from 'assets/OpenSans-SemiBold.ttf';
import fontBolder from 'assets/OpenSans-Bold.ttf';
import { colors } from 'utils/StyleGuide';

Font.register({
  family: 'Open sans',
  fonts: [
    { src: fontRegular },
    { src: fontBold, fontWeight: 600 },
    { src: fontBolder, fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Open sans',
    padding: 20,
    '@media print': {
      padding: 10,
    },
  },
  viewWrapperSplit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewWrapperStart: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  viewWrapperSplitCenter: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewItem: {
    display: 'flex',
  },
  viewItemCost: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    '@media print': {
      width: '50%',
    },
  },
  viewItemCostSummary: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    '@media print': {
      width: '50%',
    },
  },
  viewItemColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  invoiceHeading: {
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    '@media print': {
      fontSize: 12,
    },
  },
  invoiceNumber: {
    fontSize: 16,
    fontWeight: 600,
    color: '#fb5447',
    '@media print': {
      fontSize: 12,
    },
  },
  infoItemWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  infoItemWrapperColumn: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 10,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 5,
    '@media print': {
      fontSize: 12,
    },
  },
  keyText: {
    display: 'flex',
    fontSize: 14,
    fontWeight: 600,
    marginRight: 5,
    '@media print': {
      fontSize: 10,
    },
  },
  valueText: {
    display: 'flex',
    fontSize: 14,
    '@media print': {
      fontSize: 10,
    },
  },
  descriptionText: {
    display: 'flex',
    fontSize: 14,
    marginRight: 50,
    paddingRight: 20,
    '@media print': {
      fontSize: 10,
    },
  },
  sectionDivider: {
    display: 'block',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#b7bbbf',
    marginTop: 10,
    marginBottom: 10,
    '@media print': {
      marginTop: 5,
      marginBottom: 5,
    },
  },
  sectionDividerMargin: {
    display: 'block',
    marginTop: 10,
    marginBottom: 20,
    '@media print': {
      marginTop: 10,
      marginBottom: 20,
    },
  },
  tableWrapper: {
    display: 'table',
    width: '100%',
  },
  costTableWrapper: {
    display: 'table',
    width: 380,
    textAlign: 'right',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    '@media print': {
      textAlign: 'left',
      width: 300,
      marginTop: 5,
      padding: 5,
    },
    padding: 10,
    marginTop: 10,
    backgroundColor: colors.lightGrey,
  },
  costTableDataTitle: {
    display: 'table-cell',
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: 600,
    fontSize: 14,
    width: '75%',
    '@media print': {
      fontSize: 10,
    },
  },
  costTableData: {
    display: 'table-cell',
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 14,
    width: '25%',
    textAlign: 'right',
    '@media print': {
      fontSize: 10,
    },
  },
  tableData4: {
    display: 'table-cell',
    padding: 10,
    paddingLeft: 5,
    borderBottom: '1px solid #e5e5ea',
    '@media print': {
      fontSize: 10,
      width: '25%',
    },
  },
  tableData4Cost: {
    display: 'table-cell',
    padding: 10,
    borderBottom: '1px solid #e5e5ea',
    paddingRight: 5,
    textAlign: 'right',
    '@media print': {
      fontSize: 10,
      width: '25%',
    },
  },
  tableData5: {
    display: 'table-cell',
    padding: 10,
    paddingLeft: 5,
    borderBottom: '1px solid #e5e5ea',
    '@media print': {
      fontSize: 10,
      width: '20%',
    },
  },
  tableData5Cost: {
    display: 'table-cell',
    padding: 10,
    borderBottom: '1px solid #e5e5ea',
    paddingRight: 5,
    textAlign: 'right',
    '@media print': {
      fontSize: 10,
      width: '20%',
    },
  },
  tableHeader: {
    display: 'table-row',
    flexDirection: 'row',
  },
  tableHeading5: {
    display: 'table-cell',
    fontSize: 14,
    padding: 10,
    fontWeight: 700,
    backgroundColor: '#fb5447',
    color: '#fff',
    borderRightWidth: 5,
    borderStyle: 'solid',
    borderColor: '#fff',
    '@media print': {
      width: '20%',
      padding: 7,
      fontWeight: 600,
      fontSize: 11,
    },
  },
  tableHeading4: {
    display: 'table-cell',
    fontSize: 14,
    padding: 10,
    fontWeight: 700,
    backgroundColor: '#fb5447',
    color: '#fff',
    borderRightWidth: 5,
    borderStyle: 'solid',
    borderColor: '#fff',
    '@media print': {
      width: '25%',
      padding: 7,
      fontWeight: 600,
      fontSize: 11,
    },
  },
  tableBody: {
    display: 'table-row-group',
  },
  costTableBody: {
    display: 'table-row-group',
    textAlign: 'right',
  },
  tableRow: {
    display: 'table-row',
    flexDirection: 'row',
  },
  tableRowSpecial: {
    display: 'table-row',
    flexDirection: 'row',
    backgroundColor: colors.lightGrey,
  },
  signDate: {
    display: 'flex',
    fontSize: 14,
    '@media print': {
      fontSize: 10,
    },
  },
});

type Props = {
  woInvoice: Object,
};

class WorkOrderInvoicePDF extends PureComponent<Props> {
  /**
   * Render a modal to view PDF files
   * @return {React$Node}
   */
  render() {
    const {
      companyAddress,
      parts,
      customerDetails,
      currency,
      image,
      additionalCostDetails,
      invoiceNo,
      title,
      description,
      invoiceDate,
      invoiceDueDate,
      signatureDate,
      useCompanyLogo,
      additonalOtherCost,
      additionalCostPaid,
      additonalCostTotal,
      additonalCostSubtotal,
      salesTax,
      shippingCosts,
      otherCosts,
      partsTotal,
      partsSubTotal,
    } = this.props.woInvoice;
    const stylesOnLoad = StyleSheet.create({
      companyLogo: {
        display: 'flex',
        height: 120,
        width: 120,
        borderRadius: 60,
        objectFit: 'contain',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#e5e5ea',
        marginRight: 20,
        '@media screen': {
          width: 90,
          height: 90,
          borderRadius: 45,
        },
      },
      signatureImage: {
        display: 'flex',
        height: 'auto',
        width: 150,
        backgroundImage:
          image && image.file && image.file.preview ? `url(${image.file.preview})` : 'none',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      },
    });
    return (
      <Document>
        <Page size="A4" style={styles.page} wrap>
          <View style={styles.viewWrapperSplit}>
            <View style={styles.viewItem}>
              <View style={styles.infoItemWrapper}>
                <Text style={styles.invoiceHeading}>Invoice#:</Text>
                <Text style={styles.invoiceNumber}>{invoiceNo}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.infoItemWrapper}>
                <Text style={styles.keyText}>Invoice Date:</Text>
                <Text style={styles.valueText}>{invoiceDate ? invoiceDate.format('L') : ' '}</Text>
              </View>
            </View>
          </View>
          <View style={styles.sectionDivider} />
          <View style={styles.viewWrapperSplit}>
            <View style={styles.viewItem}>
              <Text style={styles.sectionHeading}>Work Order Details</Text>
            </View>
            <View style={styles.viewItem}>
              {invoiceDueDate && (
                <View style={styles.viewItemColumn}>
                  <View style={styles.infoItemWrapper}>
                    <Text style={styles.keyText}>Invoice Due Date</Text>
                    <Text style={styles.valueText}>{invoiceDueDate.format('L')}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View style={styles.viewWrapperSplit}>
            <View style={styles.viewItemColumn}>
              <View style={styles.infoItemWrapper}>
                <Text style={styles.keyText}>Title:</Text>
                <Text style={styles.valueText}>{title}</Text>
              </View>
              <View style={styles.infoItemWrapper}>
                <Text style={styles.keyText}>Description:</Text>
                <Text style={styles.descriptionText}>{description}</Text>
              </View>
            </View>
          </View>
          <View style={styles.sectionDivider} />
          <View style={styles.viewWrapperStart}>
            <View style={styles.viewItem}>
              <View style={styles.viewWrapperStart}>
                {useCompanyLogo &&
                  companyAddress &&
                  companyAddress.companyLogo &&
                  companyAddress.companyLogo.url && (
                    <Image style={stylesOnLoad.companyLogo} src={companyAddress.companyLogo.url} />
                  )}
                <View style={styles.viewItemColumn}>
                  <View style={styles.infoItemWrapper}>
                    <Text style={styles.sectionHeading}>Company Information</Text>
                  </View>
                  <View style={styles.infoItemWrapperColumn}>
                    <Text style={styles.valueText}>{companyAddress.companyName || ''}</Text>
                    <Text style={styles.valueText}>
                      {companyAddress.businessAddressLine1 || ''}
                    </Text>
                    <Text style={styles.valueText}>
                      {companyAddress.businessAddressLine2 || ''}
                    </Text>
                    <Text style={styles.valueText}>
                      {companyAddress.businessAddressLine3 || ''}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.viewItemColumn}>
              <View style={styles.infoItemWrapper}>
                <Text style={styles.sectionHeading}>Customer Information</Text>
              </View>
              <View style={styles.infoItemWrapperColumn}>
                <Text style={styles.valueText}>{customerDetails.billingName || ''}</Text>
                <Text style={styles.valueText}>{customerDetails.billingAddressLine1 || ''}</Text>
                <Text style={styles.valueText}>{customerDetails.billingAddressLine2 || ''}</Text>
                <Text style={styles.valueText}>{customerDetails.billingAddressLine3 || ''}</Text>
              </View>
            </View>
          </View>
          <View style={styles.sectionDivider} />
          <Text style={styles.sectionHeading}>Parts Details</Text>
          <View style={styles.tableWrapper} withSeparator>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeading5}>Item</Text>
              <Text style={styles.tableHeading5}>Description</Text>
              <Text style={styles.tableHeading5}>Unit Cost</Text>
              <Text style={styles.tableHeading5}>Quantity</Text>
              <Text style={styles.tableHeading5}>Total</Text>
            </View>
            <View style={styles.tableBody}>
              {parts.map((item, index) => {
                return (
                  <View style={styles.tableRow} key={item.part.id}>
                    <Text style={styles.tableData5}>{index + 1}</Text>
                    <Text style={styles.tableData5}>{item.part.name}</Text>
                    <Text style={styles.tableData5}>
                      {currency} {item.part.cost || 0}
                    </Text>
                    <Text style={styles.tableData5}>{item.quantity || 0}</Text>
                    <Text style={styles.tableData5Cost}>
                      {currency}
                      &nbsp;
                      {(Number(item.part.cost) * Number(item.quantity)).toFixed(2)}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.viewWrapperSplitCenter}>
            <View style={styles.viewItemCost}>
              <Text style={styles.keyText}>&nbsp;</Text>
            </View>
            <View style={styles.viewItemCost}>
              <View style={styles.costTableWrapper}>
                <View style={styles.costTableBody}>
                  <View style={styles.tableRow}>
                    <Text style={styles.costTableDataTitle}>Sub Total</Text>
                    <Text style={styles.costTableData}>
                      {currency} {partsSubTotal && partsSubTotal.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.costTableDataTitle}>Sales Tax</Text>
                    <Text style={styles.costTableData}>
                      {currency} {salesTax && salesTax.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.costTableDataTitle}>Shipping Costs</Text>
                    <Text style={styles.costTableData}>
                      {currency} {shippingCosts && shippingCosts.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.costTableDataTitle}>Other Costs</Text>
                    <Text style={styles.costTableData}>
                      {currency} {otherCosts && otherCosts.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.tableRowSpecial}>
                    <Text style={styles.costTableDataTitle}>Total Parts Cost</Text>
                    <Text style={styles.costTableData}>
                      {currency} {partsTotal && partsTotal.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.sectionHeading}>Additional Cost Details</Text>
          <View style={styles.tableWrapper} withSeparator>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeading4}>Item</Text>
              <Text style={styles.tableHeading4}>Description</Text>
              <Text style={styles.tableHeading4}>Category</Text>
              <Text style={styles.tableHeading4}>Cost</Text>
            </View>
            <View style={styles.tableBody}>
              {additionalCostDetails.map((item, index) => {
                return (
                  <View style={styles.tableRow} key={item.id}>
                    <Text style={styles.tableData4}>{index + 1}</Text>
                    <Text style={styles.tableData4}>{item.info}</Text>
                    <Text style={styles.tableData4}> {item.category.name}</Text>
                    <Text style={styles.tableData4Cost}>
                      {currency} {Number(item.price).toFixed(2)}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.viewWrapperSplit}>
            <View style={styles.viewItemCost}>
              <Text style={styles.keyText}>&nbsp;</Text>
            </View>
            <View style={styles.viewItemCost}>
              <View style={styles.costTableWrapper}>
                <View style={styles.costTableBody}>
                  <View style={styles.tableRow}>
                    <Text style={styles.costTableDataTitle}>Subtotal</Text>
                    <Text style={styles.costTableData}>
                      {currency} {additonalCostSubtotal && additonalCostSubtotal.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.costTableDataTitle}>Other Costs</Text>
                    <Text style={styles.costTableData}>
                      {currency} {additonalOtherCost && additonalOtherCost.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.costTableDataTitle}>&nbsp;</Text>
                    <Text style={styles.costTableData}>-</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.costTableDataTitle}>Paid</Text>
                    <Text style={styles.costTableData}>
                      {currency} {additionalCostPaid && additionalCostPaid.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.tableRowSpecial}>
                    <Text style={styles.costTableDataTitle}>Total Additional Cost</Text>
                    <Text style={styles.costTableData}>
                      {currency} {additonalCostTotal && additonalCostTotal.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.sectionDividerMargin} />
          <View style={styles.viewWrapperSplit}>
            <View style={styles.viewItemColumn}>
              <View style={styles.infoItemWrapper}>
                {image && image.file && image.file.preview && (
                  <Image style={stylesOnLoad.signatureImage} src={image.file.preview} />
                )}
              </View>
              <View style={styles.infoItemWrapper}>
                <Text style={styles.keyText}>Signature</Text>
              </View>
              <View style={styles.infoItemWrapper}>
                {signatureDate && (
                  <Text style={styles.signDate}>Signed on -{signatureDate.format('L')}</Text>
                )}
              </View>
            </View>
            <View style={styles.viewItemCostSummary}>
              <View style={styles.costTableWrapper}>
                <View style={styles.costTableBody}>
                  <View style={styles.tableRow}>
                    <Text style={styles.sectionHeading}>Invoice Summary</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.costTableDataTitle}>Parts</Text>
                    <Text style={styles.costTableData}>
                      {currency} {partsTotal && partsTotal.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.costTableDataTitle}>Additional Costs</Text>
                    <Text style={styles.costTableData}>
                      {currency} {additonalCostTotal && additonalCostTotal.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.costTableDataTitle}>Total</Text>
                    <Text style={styles.costTableData}>
                      {currency} {(partsTotal + additonalCostTotal).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );
  }
}

export default WorkOrderInvoicePDF;
