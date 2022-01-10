import React from 'react';
import { mount } from 'enzyme';
import AlertModal from 'components/AlertModal/index';

describe('<AlertModal />', () => {
  const header = 'Header';
  const body = 'Body';

  it('should render correctly with all params given', () => {
    const sut = mount(
      <AlertModal
        header={header}
        body={body}
        maxWidth={100}
        padding={100}
        confirmLabel="ConfirmLabel"
        denyLabel="DenyLabel"
        cancelLabel="CancelLabel"
        onDeny={jest.fn()}
        onCancel={jest.fn()}
        onConfirm={jest.fn()}
      />,
    );

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with only madatory params given', () => {
    const sut = mount(<AlertModal header={header} body={body} onConfirm={jest.fn()} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with specific params given', () => {
    const sut = mount(
      <AlertModal
        header={header}
        body={body}
        onConfirm={jest.fn()}
        onClose={jest.fn()}
        cancelLabel="CancelLabel"
      />,
    );

    expect(sut).toMatchSnapshot();
  });
});
