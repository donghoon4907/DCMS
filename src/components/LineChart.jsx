import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default class Example extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/xqjtetw0/";
  render() {
    const xAxisDataKey = "date";
    const { category, followerData, postData, width, height } = this.props;

    const data = Array.from({ length: 7 }).map((v, idx) => {
      const date = followerData[idx].date;
      return {
        date,
        followerCount: followerData[idx].count,
        postCount: postData[idx].count
      };
    });
    return (
      <LineChart
        width={width}
        height={height}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {category.map((v, idx) => (
          <Line
            key={`line${idx}`}
            type="monotone"
            name={v.text}
            dataKey={v.label}
            stroke={v.strokeColor}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    );
  }
}
