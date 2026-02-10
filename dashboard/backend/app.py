from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)  # Allow React frontend to connect

# Paths relative to backend folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, 'data', 'brent_cleaned.csv')
EVENTS_PATH = os.path.join(BASE_DIR, '..', '..', 'events', 'events.csv')

# Load data once
try:
    df = pd.read_csv(DATA_PATH, parse_dates=['Date'], index_col='Date')
    events = pd.read_csv(EVENTS_PATH)
    print("Data loaded successfully")
except Exception as e:
    print(f"Error loading data: {e}")
    df = pd.DataFrame()
    events = pd.DataFrame()

@app.route('/api/prices', methods=['GET'])
def get_prices():
    """Return all prices as JSON"""
    if df.empty:
        return jsonify({"error": "Data not loaded"}), 500
    data = df.reset_index().to_dict(orient='records')
    return jsonify(data)

@app.route('/api/events', methods=['GET'])
def get_events():
    """Return all events"""
    if events.empty:
        return jsonify({"error": "Events not loaded"}), 500
    return jsonify(events.to_dict(orient='records'))

@app.route('/api/change-points', methods=['GET'])
def get_change_points():
    """Return detected change points (hard-coded for now – later from model)"""
    change_points = [
        {
            "date": "2014-11-05",
            "description": "OPEC maintains production → 2014–2016 oil glut",
            "mean_before": 102.97,
            "mean_after": 62.17,
            "shift_pct": -39.6
        }
        # Add more when you have multi-change-point results
    ]
    return jsonify(change_points)

if __name__ == '__main__':
    app.run(debug=True, port=5000)