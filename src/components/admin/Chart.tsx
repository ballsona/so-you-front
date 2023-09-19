import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const Chart = ({ data, domain }: { data: any; domain: any }) => (
  <LineChart
    width={800}
    height={400}
    data={data}
    // margin={{
    //  top: 5,
    //  right: 30,
    //  left: 20,
    //  bottom: 5,
    // }}
  >
    {/* <CartesianGrid strokeDasharray="3 3" /> */}
    <XAxis dataKey="date" />
    <YAxis domain={domain} />
    <Tooltip />
    <Line
      type="monotone"
      dataKey="count"
      stroke="#484848"
      activeDot={{ r: 8 }}
    />
  </LineChart>
);

export default Chart;
