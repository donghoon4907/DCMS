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
const data = [
  {
    name: "04-07",
    request: 4000
  },
  {
    name: "04-08",
    request: 3000
  },
  {
    name: "04-09",
    request: 2000
  },
  {
    name: "04-10",
    request: 2780
  },
  {
    name: "04-11",
    request: 1890
  },
  {
    name: "04-12",
    request: 2390
  },
  {
    name: "04-13",
    request: 3490
  }
];
export default class Example extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/xqjtetw0/";
  render() {
    return (
      <LineChart
        width={this.props.width}
        height={300}
        data={this.props.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        /> */}
        <Line
          type="monotone"
          dataKey={this.props.legendTitle}
          stroke="#82ca9d"
        />
      </LineChart>
    );
  }
}
