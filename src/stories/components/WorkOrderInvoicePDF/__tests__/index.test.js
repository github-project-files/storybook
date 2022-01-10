import React from 'react';
import { mount } from 'enzyme';
import WorkOrderInvoicePDF from 'components/WorkOrderInvoicePDF/index';

describe('<WorkOrderInvoicePDF />', () => {
  const mandatoryProps = {
    woInvoice: {
      companyAddress: {},
      parts: [
        {
          part: {
            id: '1',
            name: 'Name',
          },
        },
      ],
      customerDetails: {},
      additionalCostDetails: [],
    },
  };

  it('should render correctly with mandatory props', () => {
    const sut = mount(<WorkOrderInvoicePDF {...mandatoryProps} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with full props', () => {
    const mockDate = { format: jest.fn() };
    const props = {
      ...mandatoryProps,
      woInvoice: {
        ...mandatoryProps.woInvoice,
        useCompanyLogo: true,
        invoiceDate: mockDate,
        invoiceDueDate: mockDate,
        signatureDate: mockDate,
        currency: 1,
        invoiceNo: 2,
        partsSubTotal: 100,
        salesTax: 101,
        shippingCosts: 102,
        otherCosts: 103,
        partsTotal: 104,
        additonalCostSubtotal: 105,
        additonalOtherCost: 106,
        additionalCostPaid: 107,
        additonalCostTotal: 108,
        title: 'Title',
        description: 'Description',
        parts: [
          {
            quantity: 109,
            part: {
              id: '2',
              name: 'Name',
            },
          },
        ],
        additionalCostDetails: [
          {
            id: '1',
            info: 'info',
            price: 110,
            category: {
              name: 'Category',
            },
          },
        ],
        companyAddress: {
          companyLogo: {
            url: 'urlPath',
          },
        },
        image: {
          file: {
            preview: 'urlPath',
          },
        },
        customerDetails: {
          billingName: 'Name',
          billingAddressLine1: 'A1',
          billingAddressLine2: 'A2',
          billingAddressLine3: 'A3',
        },
      },
    };
    const sut = mount(<WorkOrderInvoicePDF {...props} />);

    expect(sut).toMatchSnapshot();
  });
});
