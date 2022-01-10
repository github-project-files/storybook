// @flow
import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { ChartWrapper } from '../styled';

type Props = {
  data:
    | any
    | Array<{
        name: string,
        value: number,
        fill: string,
      }>,
  percentValue?: boolean,
};

class UpkRadialBarChart extends PureComponent<Props> {
  /**
   * Render Radial bar chart
   * @return {React$Node}
   */
  render() {
    const { percentValue, data } = this.props;
    return (
      <ChartWrapper height="300px">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            barSize={28}
            data={data}
            endAngle={-30}
            startAngle={210}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar
              minAngle={10}
              angleAxisId={0}
              data={[data[0]]}
              label={{
                fontSize: 36,
                fontWeight: 'bold',
                position: 'center',
                fill: '#0d0d0e',
                formatter: value => {
                  return (value > 0 ? value : '0') + (percentValue ? '%' : '');
                },
              }}
              background
              clockWise
              dataKey="value"
              cornerRadius={20}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    );
  }
}

export default UpkRadialBarChart;
