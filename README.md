# Brent Oil Change Point Analysis

## Overview
This repository contains the complete workflow for analyzing Brent oil prices (1987–2022) using Bayesian Change Point Detection, as part of the 10 Academy AI Mastery Week 11 Challenge. The analysis identifies change points in oil prices and associates them with geopolitical/economic events to provide insights for investors, policymakers, and energy companies at Birhan Energies.

Key objectives:
- Perform EDA on Brent oil prices.
- Build a Bayesian change point model with PyMC.
- Associate change points with events.
- Create an interactive dashboard with Flask (backend) and React (frontend).
- Generate a professional report.

## Repository Structure

├── data/                # Raw data: BrentOilPrices.csv; Cleaned: brent_prices_cleaned.csv
├── notebooks/           # eda.ipynb (EDA), modeling.ipynb (Bayesian model)
├── dashboard/           # backend/ (Flask app), frontend/ (React app)
├── reports/             # interim_report.pdf, final_report.pdf
├── events/              # events.csv (geopolitical events)
├── README.md            # This file
├── requirements.txt     # Python dependencies
└── LICENSE              # MIT License
text


## Setup Instructions
1. Clone the repo: `git clone https://github.com/bekonad/brent-oil-change-point-analysis.git`
2. Create and activate a virtual environment: `python -m venv .venv; source .venv/bin/activate` (Unix) or `.venv\Scripts\Activate.ps1` (Windows)
3. Install dependencies: `pip install -r requirements.txt`
4. For the dashboard:
   - Backend: `cd dashboard/backend; flask run`
   - Frontend: `cd dashboard/frontend; npm install; npm start` (requires Node.js)
5. Run notebooks: `jupyter notebook` in the root, then open notebooks/eda.ipynb, etc.

## Branches
- `main`: Stable deliverables.
- `dev`: Active development.
- `eda`: Exploratory data analysis.
- `modeling`: Bayesian modeling.
- `dashboard`: Dashboard development.

## Data Sources
- Brent oil prices: From attached BrentOilPrices.csv (1987–2022).
- Events: Compiled in events/events.csv (15+ key geopolitical/economic events).

## Assumptions and Limitations
- Assumptions: Change points are detectable via shifts in mean prices; events are major contributors but not exhaustive.
- Limitations: Correlation ≠ causation; overlapping events (e.g., crises + policies); market noise from non-modeled factors.

## License
MIT License (see LICENSE file).

For questions, contact [bereketfeleke003@gmail.com]