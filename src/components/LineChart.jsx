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
    request: 4000,
    request2: 4000
  },
  {
    name: "04-08",
    request: 3000,
    request2: 4000
  },
  {
    name: "04-09",
    request: 2000,
    request2: 4000
  },
  {
    name: "04-10",
    request: 2780,
    request2: 4000
  },
  {
    name: "04-11",
    request: 1890,
    request2: 4000
  },
  {
    name: "04-12",
    request: 2390,
    request2: 4000
  },
  {
    name: "04-13",
    request: 3490,
    request2: 4000
  }
];
export default class Example extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/xqjtetw0/";
  render() {
    return (
      <LineChart
        width={500}
        height={500}
        data={data}
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
        <Line
          type="monotone"
          dataKey="request"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="request2"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    );
  }
}
