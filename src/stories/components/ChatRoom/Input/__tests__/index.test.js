import React from 'react';
import { mount } from 'enzyme';
import Input from 'components/ChatRoom/Input/index';

describe('<Input />', () => {
  const mandatoryProps = {
    t: jest.fn(),
    message: 'Message',
    images: [{}],
    imagesUploading: true,
    onImagesMutate: jest.fn(),
    onChange: jest.fn(),
    onSubmit: jest.fn(),
  };

  it('should render correctly with mandatory props', () => {
    const sut = mount(<Input {...mandatoryProps} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with deleted image', () => {
    const props = {
      ...mandatoryProps,
      images: [
        {
          _id: 0,
          file: '',
          dataUrl: '',
          deleted: true,
        },
        {
          _id: 1,
          file: '',
          dataUrl: '',
          deleted: false,
        },
      ],
    };
    const sut = mount(<Input {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly without images uploading', () => {
    const props = {
      ...mandatoryProps,
      imagesUploading: false,
    };
    const sut = mount(<Input {...props} />);

    expect(sut).toMatchSnapshot();
  });
});
