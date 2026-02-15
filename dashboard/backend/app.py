from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, 'data', 'brent_cleaned.csv')
EVENTS_PATH = os.path.join(BASE_DIR, '..', '..', 'events', 'events.csv')

# Global data (loaded once)
df = pd.DataFrame()
events = pd.DataFrame()

# Load prices (2010+ subset)
try:
    df_full = pd.read_csv(DATA_PATH, parse_dates=['Date'], index_col='Date')
    df = df_full.loc['2010-01-01':].copy()
    print(f"Prices loaded: {len(df)} rows (2010+ subset)")
except Exception as e:
    print(f"Error loading prices CSV: {e}")

# Load events – fixed version
try:
    events = pd.read_csv(EVENTS_PATH)
    print("Events CSV columns:", list(events.columns))

    # Force column names if header is missing or wrong
    if events.columns[0].strip() == 'Event_Date':
        print("Header detected correctly")
    else:
        print("No valid header – forcing column names")
        events.columns = ['Event_Date', 'Event_Name', 'Description', 'Expected_Impact']

    # Convert date to string ISO format
    events['Event_Date'] = pd.to_datetime(events['Event_Date'], errors='coerce').dt.strftime('%Y-%m-%d')
    events = events.dropna(subset=['Event_Date'])
    print(f"Events loaded successfully: {len(events)} rows")
except Exception as e:
    print(f"Error loading events CSV: {e}")
    events = pd.DataFrame()

@app.route('/')
def home():
    return """
    <h1>Brent Oil Change Point API</h1>
    <ul>
      <li><a href="/api/prices">/api/prices</a> – Brent prices (2010+)</li>
      <li><a href="/api/events">/api/events</a> – Geopolitical events</li>
      <li><a href="/api/change-points">/api/change-points</a> – Detected change points</li>
    </ul>
    """

@app.route('/api/prices')
def get_prices():
    if df.empty:
        return jsonify({"error": "Prices data not loaded"}), 500

    start = request.args.get('start')
    end = request.args.get('end')

    filtered = df.copy()
    if start:
        filtered = filtered[filtered.index >= pd.to_datetime(start)]
    if end:
        filtered = filtered[filtered.index <= pd.to_datetime(end)]

    data = filtered.reset_index().to_dict(orient='records')
    return jsonify(data)

@app.route('/api/events')
def get_events():
    if events.empty:
        return jsonify({"error": "Events data not loaded"}), 500

    return jsonify(events.to_dict(orient='records'))

@app.route('/api/change-points')
def get_change_points():
    return jsonify([{
        "date": "2014-11-05",
        "description": "OPEC production decision → 2014–2016 oil glut",
        "mean_before": 102.97,
        "mean_after": 62.17,
        "shift_pct": -39.6
    }])

if __name__ == '__main__':
    app.run(debug=True, port=5000)