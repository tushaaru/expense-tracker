# 🎓 Campus Spend Tracker
### Business Analytics Project | MBA Semester IV | 2024–25

A full-stack web application for tracking, visualizing, and analyzing college student spending habits.

---

## 📋 Project Overview

**Problem Statement:**  
College students often overspend in certain categories (food, entertainment) without realizing it until their pocket money runs out. This project uses business analytics to help students track expenses, stay within budget, and understand their spending patterns through data visualization.

**Objective:**  
Build a data-driven spend tracker tailored for campus life, with category budgets, trend analysis, and smart insights.

---

## 🛠️ Tech Stack

| Layer    | Technology           |
|----------|----------------------|
| Frontend | HTML5, CSS3, Vanilla JS, Chart.js |
| Backend  | Node.js, Express.js  |
| Storage  | JSON file (data.json) |

---

## 🚀 How to Run

### Step 1 — Backend
```bash
cd backend
npm install
node server.js
```
API runs at: http://localhost:3000

### Step 2 — Frontend
```bash
cd frontend
# Just open index.html in your browser
# Or use Live Server in VS Code
```

> **Note:** The frontend works in demo mode even without the backend running.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/expenses?studentId=S001&month=2025-05` | Get all expenses (filterable) |
| POST | `/expenses` | Add a new expense |
| DELETE | `/expenses/:id` | Delete an expense |
| GET | `/analytics/:studentId` | Get spending analytics |
| GET | `/budgets/:studentId` | Get budget settings |
| PUT | `/budgets/:studentId` | Update budgets |

### Sample POST /expenses body:
```json
{
  "category": "Food",
  "amount": 120,
  "description": "Canteen lunch",
  "date": "2025-05-15",
  "studentId": "S001"
}
```

---

## 📊 Features

- **Dashboard** — 4 KPI cards, daily spend trend line chart, category donut chart, budget progress bars, smart insights
- **Expenses Page** — Filterable transaction log with delete functionality
- **Add Expense** — Quick form to log new expenses by category
- **Reports Page** — Bar charts, budget vs actual comparison, spending heatmap by category & week

---

## 📂 Project Structure

```
campus-spend-tracker/
├── backend/
│   ├── server.js       ← Express API server
│   ├── package.json
│   └── data.json       ← Auto-generated database (JSON)
└── frontend/
    └── index.html      ← Single-page dashboard (all CSS + JS inline)
```

---

## 👥 Team Members

| Name | Roll No | Contribution |
|------|---------|--------------|
| [Your Name] | [Roll No] | Frontend, Design |
| [Your Name] | [Roll No] | Backend API |
| [Your Name] | [Roll No] | Analytics, Report |

**Guide:** Prof. [Name]  
**Department:** Business Analytics & Strategy  
**Institution:** [College Name]

---

## 📈 Analytics Implemented

1. **Category-wise spend breakdown** (Pie + Bar charts)
2. **Daily spending trend** (Line chart)
3. **Budget utilisation %** (Progress bars with color-coded alerts)
4. **Weekly heatmap** (Spending intensity by category × week)
5. **Smart alerts** (Auto-generated insights based on thresholds)
6. **KPIs:** Total spent, budget remaining, avg daily spend, top category
