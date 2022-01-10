import React from 'react';
import { mount } from 'enzyme';
import ErrorBoundary from 'components/ErrorBoundary/index';
import Button from 'components/Button';

// assign ineum function to window for testing only
window.ineum = (name, error) => {
 console.log(name)
 console.log(error)
}

describe('<ErrorBoundary />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with mandatory props', () => {
    const sut = mount(
      <ErrorBoundary>
        <p>Child</p>
      </ErrorBoundary>,
    );

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly if child throws error', () => {
    const ChildWithError = () => {
      throw new Error('ERROR');
    };
    const sut = mount(
      <ErrorBoundary>
        <ChildWithError />
      </ErrorBoundary>,
    );
    const reloadSpy = jest.spyOn(window.location, 'reload');

    expect(sut).toMatchSnapshot();

    expect(reloadSpy).toHaveBeenCalledTimes(0);

    sut.find(Button).simulate('click');

    expect(reloadSpy).toHaveBeenCalledTimes(1);

    reloadSpy.mockClear();
  });
});
