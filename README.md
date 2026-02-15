Markdown<div align="center">

<h1>Brent Oil Change Point Analysis</h1>
  <p>
    <strong>10 Academy AI Mastery – Week 11 Challenge</strong><br/>
    Detecting structural changes & associating causes in Brent oil prices (1987–2022)
  </p>

  <img src="https://img.shields.io/badge/Python-3.9%2B-blue?style=flat-square&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/Flask-2.x-green?style=flat-square&logo=flask" alt="Flask"/>
  <img src="https://img.shields.io/badge/React-18.x-blue?style=flat-square&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/PyMC-Bayesian-orange?style=flat-square" alt="PyMC"/>
  <br/><br/>
  <strong>Author:</strong> Bereket Felek • <strong>Date:</strong> February 2026
</div>

# 📌 Project Overview

This project analyzes historical **Brent crude oil prices** using **Bayesian change point detection** (PyMC) to identify structural breaks, associates them with major geopolitical & economic events, and provides an **interactive dashboard** for visualization.

### **Main outcomes:** ###
- Cleaned data & EDA
- Single Bayesian change point model with convergence checks
- Probabilistic event association (14+ key events)
- Full-stack dashboard (price trend + volatility + events + filters)
- Professional final report with quantified insights

# 🚀 Quick Start

### 1. Clone & Navigate

```bash
   git clone https://github.com/bekonad/brent-oil-change-point-      analysis.git
   cd brent-oil-change-point-analysis
```
___

### 2. Run the Dashboard (Recommended)
- Backend (Flask API)
Open first terminal:
```PowerShell
   cd dashboard\backend
   .\venv\Scripts\Activate.ps1          # Activate virtual environment
   python app.py
```
→ API runs at http://127.0.0.1:5000
- Frontend (React Dashboard)
**Open second terminal:**
```PowerShell
   cd dashboard\frontend
   npm install
   npm start
```
→ Dashboard opens at http://localhost:3000
Now you can:

 - **See historical price + volatility trend**
 - **View the main change point (2014-11-05 OPEC decision)**
 - **Observe event markers (orange lines)**
 - **Filter dates and reset**

_____

### 3. Explore Notebooks (EDA + Modeling)
```PowerShell
   cd notebooks
   jupyter notebook
```
Open
  - eda-brent-oil-prices.ipynb
  - 02_bayesian_change_point.ipynb for full analysis.
___

### 🗂 Project Structure
```text
brent-oil-change-point-analysis/
├── data/                    # Cleaned Brent prices
├── events/                  # 14+ geopolitical events CSV
├── notebooks/               # EDA + PyMC modeling
├── dashboard/               # Full dashboard
│   ├── backend/             # Flask API
│   └── frontend/            # React + Recharts UI
├── reports/                 # Screenshots & final report
├── README.md
└── requirements.txt
```
____
### 🎯 Key Deliverables
Task,Description,Location
1,Foundation & EDA,"notebooks/, reports/interim/"
2,Bayesian change point model (PyMC),notebooks/eda_and_modeling.ipynb
3,Interactive dashboard (Flask + React),dashboard/
Final,Report with insights & screenshots,reports/final_report.md

- Full dashboard view
- 2014–2016 oil glut zoom
- Tooltip interaction
-  Volatility overlay
___

### 🛠 Tech Stack

-  **Data & Modeling:** Python, Pandas, PyMC, ArviZ
-   **Backend:** Flask
-   **Frontend:** React, Recharts
-   **Visualization:** Recharts (interactive charts)
___

### 📊 Dashboard Features

- 📈 Historical Brent price trend (2010+)

- 📉 30-day rolling volatility (Vol_30d)

- ⚡ Detected change point (thick purple line, 2014-11-05, –39.6% shift)

- 📍 Event markers (orange lines + names for 14 events)

- 🔍 Date range filter + reset button

- Hover tooltips (price + volatility)

___
### 📄 Final Report
- See reports/final_report.md for:
- Executive Summary
- Methodology
- Results & quantified impacts
- Dashboard screenshots
- Discussion & limitations
- Conclusion & actionable insights

Challenge completed – February 15, 2026
Bereket Feleke – 10 Academy AI Mastery

```

