import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';
import { format, isValid } from 'date-fns';

const PriceChart = () => {
  const [prices, setPrices] = useState([]);
  const [changePoints, setChangePoints] = useState([]);
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {};
        if (startDate) params.start = startDate;
        if (endDate) params.end = endDate;

        // Fetch prices
        const pricesRes = await axios.get('/api/prices', { params });
        console.log(`Prices loaded: ${pricesRes.data.length} rows`);

        // Robust mapping – skip invalid dates
        const formatted = pricesRes.data
          .filter(item => {
            if (!item || !item.Date || typeof item.Date !== 'string' || item.Date.trim() === '') {
              console.warn('Skipping row with invalid/missing Date:', item);
              return false;
            }
            const parsed = new Date(item.Date);
            if (!isValid(parsed)) {
              console.warn('Invalid date format in row:', item.Date);
              return false;
            }
            return true;
          })
          .map(item => ({
            date: format(new Date(item.Date), 'yyyy-MM-dd'),
            price: Number(item.Price) || 0,
            vol30d: Number(item.Vol_30d) || 0
          }));

        console.log(`Valid formatted prices: ${formatted.length}`);
        setPrices(formatted);

        // Change points
        const cpRes = await axios.get('/api/change-points');
        console.log('Change points loaded:', cpRes.data);
        setChangePoints(cpRes.data || []);

        // Events
        const eventsRes = await axios.get('/api/events');
        console.log(`Events loaded: ${eventsRes.data.length}`);
        setEvents(eventsRes.data || []);
      } catch (err) {
        console.error('Fetch error:', err.message, err.config?.url);
        setError('Failed to load data. Check Flask backend (port 5000).');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  return (
    <div style={{
      margin: '40px auto',
      maxWidth: '1400px',
      fontFamily: 'Arial, sans-serif',
      padding: '0 20px'
    }}>
      <h2 style={{
        textAlign: 'center',
        color: '#1f77b4',
        marginBottom: '30px',
        fontSize: '2.4rem',
        fontWeight: 600
      }}>
        Brent Oil Prices (2010+) with Detected Change Point & Events
      </h2>

      {/* Date Range Filter */}
      <div style={{
        marginBottom: '40px',
        textAlign: 'center',
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}>
        <label style={{ marginRight: '16px', fontWeight: 600, fontSize: '1.1rem' }}>
          Start Date:
        </label>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          style={{
            padding: '10px 14px',
            marginRight: '32px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />

        <label style={{ marginRight: '16px', fontWeight: 600, fontSize: '1.1rem' }}>
          End Date:
        </label>
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          style={{
            padding: '10px 14px',
            marginRight: '32px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />

        <button
          onClick={() => { setStartDate(''); setEndDate(''); }}
          style={{
            padding: '12px 28px',
            backgroundColor: '#1f77b4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}
        >
          Reset Filter
        </button>
      </div>

      {loading && <p style={{ textAlign: 'center', color: '#555', fontSize: '1.3rem' }}>Loading data...</p>}
      {error && <p style={{ textAlign: 'center', color: '#d32f2f', fontSize: '1.3rem', fontWeight: '500' }}>{error}</p>}

      {!loading && !error && prices.length > 0 && (
        <ResponsiveContainer width="100%" height={650}>
          <LineChart data={prices}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" stroke="#444" />
            <YAxis yAxisId="left" domain={['dataMin - 10', 'dataMax + 10']} stroke="#1f77b4" />
            <YAxis yAxisId="right" orientation="right" domain={[0, 'auto']} stroke="#ff7f0e" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              formatter={(value, name) => [
                name === 'vol30d' ? value.toFixed(4) : `${value.toFixed(2)} USD`,
                name
              ]}
              labelFormatter={(date) => format(new Date(date), 'MMM dd, yyyy')}
            />
            <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }} />

            {/* Price */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="price"
              stroke="#1f77b4"
              strokeWidth={2.5}
              dot={false}
              name="Brent Price"
            />

            {/* Volatility */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="vol30d"
              stroke="#ff7f0e"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="30-Day Volatility"
            />

            {/* Change point – thick solid purple */}
            {changePoints.map((cp, i) => (
              <ReferenceLine
                key={i}
                x={cp.date}
                stroke="#8e44ad"
                strokeWidth={6}
                strokeDasharray="none"
                label={{
                  value: `${cp.description} (${cp.shift_pct}%)`,
                  position: 'top',
                  fill: '#8e44ad',
                  fontSize: 15,
                  fontWeight: 'bold',
                  offset: 40,
                  backgroundColor: 'rgba(255,255,255,0.98)',
                  borderRadius: 8,
                  padding: '8px 12px'
                }}
              />
            ))}

            {/* Events */}
            {events.map((ev, i) => (
              <ReferenceLine
                key={i}
                x={ev.Event_Date}
                stroke="orange"
                strokeWidth={2}
                strokeDasharray="3 3"
                label={{
                  value: ev.Event_Name,
                  position: 'bottom',
                  fill: 'orange',
                  fontSize: 11,
                  offset: -20
                }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}

      {!loading && prices.length === 0 && !error && (
        <p style={{ textAlign: 'center', color: '#888', fontSize: '18px' }}>
          No price data available for selected range
        </p>
      )}
    </div>
  );
};

export default PriceChart;