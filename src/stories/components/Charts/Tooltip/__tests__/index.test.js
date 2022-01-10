import { renderTooltip } from 'components/Charts/Tooltip/index';

describe('<renderTooltip />', () => {
  const props = {
    payload: [
      {
        payload: {
          name: 'Name',
          value: 0,
          actualValue: 0,
        },
      },
    ],
  };

  it('should render correctly with props', () => {
    const sut = renderTooltip(props);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with empty payload', () => {
    const sut = renderTooltip({ payload: [] });

    expect(sut).toMatchSnapshot();
  });
});
