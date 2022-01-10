// @flow
import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { renderLegend } from '../Legend';
import { ChartWrapper } from '../styled';
import { renderTooltip } from '../Tooltip';

type Props = {
  data: Array<string>,
  colors?: Array<string>,
};

const COLORS = [
  '#007bff',
  '#73f393',
  '#fefd57',
  '#fbc333',
  '#ff7c4f',
  '#b11f58',
  '#7d1b9c',
  '#240672',
  '#b7bbbf',
];

class UpkPieChart extends PureComponent<Props> {
  /**
   * Render the Pie chart
   * @return {React$Node}
   */
  render() {
    const { colors } = this.props;
    const colorArr = colors && colors.length ? colors : COLORS;
    const width = window.innerWidth;
    return (
      <ChartWrapper>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={this.props.data}
              innerRadius="75%"
              outerRadius="95%"
              fill="#8884d8"
              paddingAngle={1}
              dataKey="value"
            >
              {this.props.data.map((entry, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Cell key={`cell-${index}`} fill={colorArr[index % colorArr.length]} />
              ))}
            </Pie>
            <Tooltip content={renderTooltip} />
            <Legend
              layout={width < 1036 ? 'horizontal' : 'vertical'}
              align="right"
              verticalAlign={width < 1036 ? 'bottom' : 'middle'}
              iconSize={16}
              iconType="square"
              content={renderLegend}
              margin={{ top: 20, left: 20 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartWrapper>
    );
  }
}

export default UpkPieChart;
