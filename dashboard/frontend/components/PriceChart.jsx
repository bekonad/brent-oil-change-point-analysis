import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import axios from 'axios';

const PriceChart = () => {
  const [prices, setPrices] = useState([]);
  const [changePoints, setChangePoints] = useState([]);

  useEffect(() => {
    // Fetch prices
    axios.get('/api/prices')
      .then(res => setPrices(res.data))
      .catch(err => console.error("Error loading prices:", err));

    // Fetch change points
    axios.get('/api/change-points')
      .then(res => setChangePoints(res.data))
      .catch(err => console.error("Error loading change points:", err));
  }, []);

  return (
    <div>
      <h2>Brent Oil Price History with Change Points</h2>
      <LineChart width={1000} height={500} data={prices}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Price" stroke="#1f77b4" dot={false} />

        {/* Change point vertical lines */}
        {changePoints.map((cp, i) => (
          <ReferenceLine
            key={i}
            x={cp.date}
            stroke="red"
            strokeDasharray="3 3"
            label={{
              value: cp.description,
              position: 'top',
              fill: 'red',
              fontSize: 12
            }}
          />
        ))}
      </LineChart>
    </div>
  );
};

export default PriceChart;