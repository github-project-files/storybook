import { renderLegend } from 'components/Charts/Legend/index';

describe('<renderLegend />', () => {
  const props = {
    payload: [
      {
        color: 'red',
        value: 0,
        payload: { value: 0 },
      },
      {
        color: 'blue',
        value: 1,
        payload: { value: 1 },
      },
      {
        value: 2,
        payload: { value: 2 },
      },
    ],
  };

  it('should render correctly with props', () => {
    const sut = renderLegend(props);

    expect(sut).toMatchSnapshot();
  });
});
