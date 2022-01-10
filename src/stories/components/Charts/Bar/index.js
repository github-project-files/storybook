// @flow

import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { ChartWrapper } from '../styled';
import { renderTooltip } from '../Tooltip';

type Props = {
  data: Array<string>,
};

class UpkBarChart extends PureComponent<Props> {
  /**
   * Render the Bar chart component
   * @return {React$Node}
   */
  render() {
    return (
      <ChartWrapper height="500px">
        <ResponsiveContainer>
          <BarChart barGap={20} data={this.props.data} margin={{ top: 40, right: 20, left: 20 }}>
            <XAxis
              dataKey="name"
              height={150}
              interval={0}
              fontSize={13}
              fontWeight="600"
              angle={-45}
              textAnchor="end"
              dy={15}
            />
            <YAxis type="number" domain={[0, 100]} />
            <Tooltip content={renderTooltip} />
            <Bar
              dataKey="value"
              fill="#007bff"
              radius={[6, 6, 0, 0]}
              label={{
                position: 'top',
                fontSize: 13,
                fontWeight: '600',
                formatter: value => {
                  return `${value > 0 ? value : '0'}%`;
                },
              }}
            >
              <LabelList
                dataKey="actualValue"
                position="bottom"
                fontSize={13}
                fill="#007bff"
                fontWeight="600"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    );
  }
}

export default UpkBarChart;
