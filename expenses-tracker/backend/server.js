// Campus Spend Tracker v2 — Advanced Backend
// Features: Auth, Student Profiles, Friends Splitting, AI Advice, Month Comparison, Goals, Forecast
// Run: npm install && node server.js

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Campus Spend Tracker Backend Running Successfully 🚀");
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
function hashPassword(pw) {
  return crypto.createHash('sha256').update(pw).digest('hex');
}
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}
function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ─── Seed Data ────────────────────────────────────────────────────────────────
const seed = {
  students: [
    {
      id: "S001", name: "Rahul Anand", email: "rahul@college.edu",
      password: hashPassword("pass123"), rollNo: "MBA-2024-047",
      branch: "Business Analytics", semester: 4,
      avatar: "RA", token: null,
      friends: ["S002", "S003"],
      monthlyAllowance: 5000,
      joinedAt: "2025-01-01"
    },
    {
      id: "S002", name: "Priya Nair", email: "priya@college.edu",
      password: hashPassword("pass123"), rollNo: "MBA-2024-031",
      branch: "Business Analytics", semester: 4,
      avatar: "PN", token: null,
      friends: ["S001", "S003"],
      monthlyAllowance: 4500,
      joinedAt: "2025-01-01"
    },
    {
      id: "S003", name: "Arjun Mehta", email: "arjun@college.edu",
      password: hashPassword("pass123"), rollNo: "MBA-2024-062",
      branch: "Business Analytics", semester: 4,
      avatar: "AM", token: null,
      friends: ["S001", "S002"],
      monthlyAllowance: 6000,
      joinedAt: "2025-01-01"
    }
  ],
  expenses: [
    // May 2025
    { id:1, category:"Food", amount:120, description:"Canteen lunch", date:"2025-05-01", studentId:"S001" },
    { id:2, category:"Transport", amount:40, description:"Bus pass", date:"2025-05-01", studentId:"S001" },
    { id:3, category:"Stationery", amount:85, description:"Notebooks", date:"2025-05-02", studentId:"S001" },
    { id:4, category:"Food", amount:65, description:"Coffee & snacks", date:"2025-05-03", studentId:"S001" },
    { id:5, category:"Entertainment", amount:200, description:"Movie", date:"2025-05-04", studentId:"S001" },
    { id:6, category:"Food", amount:95, description:"Dinner outside", date:"2025-05-05", studentId:"S001" },
    { id:7, category:"Stationery", amount:30, description:"Printouts", date:"2025-05-06", studentId:"S001" },
    { id:8, category:"Transport", amount:55, description:"Auto fare", date:"2025-05-07", studentId:"S001" },
    { id:9, category:"Food", amount:110, description:"Lunch + tea", date:"2025-05-08", studentId:"S001" },
    { id:10, category:"Entertainment", amount:150, description:"Fest ticket", date:"2025-05-09", studentId:"S001" },
    { id:11, category:"Food", amount:75, description:"Canteen breakfast", date:"2025-05-10", studentId:"S001" },
    { id:12, category:"Stationery", amount:45, description:"Highlighters", date:"2025-05-11", studentId:"S001" },
    { id:13, category:"Transport", amount:60, description:"Cab to college", date:"2025-05-12", studentId:"S001" },
    { id:14, category:"Food", amount:130, description:"Group dinner", date:"2025-05-13", studentId:"S001" },
    { id:15, category:"Miscellaneous", amount:90, description:"Medicine", date:"2025-05-14", studentId:"S001" },
    // April 2025 (for month comparison)
    { id:16, category:"Food", amount:900, description:"April food total", date:"2025-04-15", studentId:"S001" },
    { id:17, category:"Transport", amount:250, description:"April transport", date:"2025-04-10", studentId:"S001" },
    { id:18, category:"Stationery", amount:180, description:"April books", date:"2025-04-05", studentId:"S001" },
    { id:19, category:"Entertainment", amount:320, description:"April entertainment", date:"2025-04-20", studentId:"S001" },
    { id:20, category:"Miscellaneous", amount:130, description:"April misc", date:"2025-04-25", studentId:"S001" },
    // March 2025
    { id:21, category:"Food", amount:820, description:"March food", date:"2025-03-15", studentId:"S001" },
    { id:22, category:"Transport", amount:290, description:"March transport", date:"2025-03-10", studentId:"S001" },
    { id:23, category:"Entertainment", amount:450, description:"March entertainment", date:"2025-03-20", studentId:"S001" },
    { id:24, category:"Stationery", amount:120, description:"March stationery", date:"2025-03-08", studentId:"S001" },
  ],
  splits: [
    {
      id: "SP001",
      title: "Group dinner at Mehfil",
      totalAmount: 1200,
      paidBy: "S001",
      participants: ["S001","S002","S003"],
      perPerson: 400,
      date: "2025-05-13",
      settled: { "S001": true, "S002": false, "S003": false },
      category: "Food"
    },
    {
      id: "SP002",
      title: "Movie — Interstellar rerun",
      totalAmount: 600,
      paidBy: "S002",
      participants: ["S001","S002","S003"],
      perPerson: 200,
      date: "2025-05-04",
      settled: { "S001": false, "S002": true, "S003": true },
      category: "Entertainment"
    }
  ],
  goals: [
    {
      id: "G001", studentId: "S001",
      title: "Save for Laptop",
      targetAmount: 40000,
      savedAmount: 8500,
      deadline: "2025-12-31",
      monthlySaving: 3000,
      icon: "💻",
      createdAt: "2025-01-01"
    },
    {
      id: "G002", studentId: "S001",
      title: "Trip to Goa",
      targetAmount: 12000,
      savedAmount: 3200,
      deadline: "2025-10-01",
      monthlySaving: 1500,
      icon: "🏖️",
      createdAt: "2025-02-01"
    }
  ],
  budgets: {
    "S001": { Food:800, Transport:300, Stationery:200, Entertainment:400, Miscellaneous:200 }
  },
  nextId: 25,
  nextSplitId: 3,
  nextGoalId: 3
};

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2));
}

// ─── Auth Middleware ──────────────────────────────────────────────────────────
function authMiddleware(req, res, next) {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });
  const db = readDB();
  const student = db.students.find(s => s.token === token);
  if (!student) return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  req.student = student;
  next();
}

// ─── AUTH ROUTES ─────────────────────────────────────────────────────────────

// POST /auth/login
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  const student = db.students.find(s => s.email === email && s.password === hashPassword(password));
  if (!student) return res.status(401).json({ success: false, message: 'Invalid email or password' });

  const token = generateToken();
  student.token = token;
  writeDB(db);

  const { password: _, ...safeStudent } = student;
  res.json({ success: true, token, student: safeStudent });
});

// POST /auth/register
app.post('/auth/register', (req, res) => {
  const { name, email, password, rollNo, branch, semester, monthlyAllowance } = req.body;
  if (!name || !email || !password || !rollNo) {
    return res.status(400).json({ success: false, message: 'name, email, password, rollNo required' });
  }
  const db = readDB();
  if (db.students.find(s => s.email === email)) {
    return res.status(409).json({ success: false, message: 'Email already registered' });
  }

  const id = 'S' + String(db.students.length + 1).padStart(3, '0');
  const avatar = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const token = generateToken();
  const newStudent = {
    id, name, email, password: hashPassword(password),
    rollNo, branch: branch || 'MBA', semester: semester || 1,
    avatar, token, friends: [],
    monthlyAllowance: monthlyAllowance || 3000,
    joinedAt: new Date().toISOString().slice(0, 10)
  };

  db.students.push(newStudent);
  db.budgets[id] = { Food: 800, Transport: 300, Stationery: 200, Entertainment: 400, Miscellaneous: 200 };
  writeDB(db);

  const { password: _, ...safeStudent } = newStudent;
  res.status(201).json({ success: true, token, student: safeStudent });
});

// POST /auth/logout
app.post('/auth/logout', authMiddleware, (req, res) => {
  const db = readDB();
  const student = db.students.find(s => s.id === req.student.id);
  student.token = null;
  writeDB(db);
  res.json({ success: true, message: 'Logged out' });
});

// GET /auth/me
app.get('/auth/me', authMiddleware, (req, res) => {
  const { password: _, token: __, ...safe } = req.student;
  res.json({ success: true, student: safe });
});

// ─── EXPENSES ─────────────────────────────────────────────────────────────────

app.get('/expenses', authMiddleware, (req, res) => {
  const db = readDB();
  let results = db.expenses.filter(e => e.studentId === req.student.id);
  if (req.query.category) results = results.filter(e => e.category === req.query.category);
  if (req.query.month) results = results.filter(e => e.date.startsWith(req.query.month));
  res.json({ success: true, count: results.length, data: results });
});

app.post('/expenses', authMiddleware, (req, res) => {
  const { category, amount, description, date } = req.body;
  const CATS = ['Food','Transport','Stationery','Entertainment','Miscellaneous'];
  if (!category || !amount || !date) return res.status(400).json({ success: false, message: 'category, amount, date required' });
  if (!CATS.includes(category)) return res.status(400).json({ success: false, message: 'Invalid category' });

  const db = readDB();
  const newExp = { id: db.nextId++, category, amount: Number(amount), description: description || '', date, studentId: req.student.id };
  db.expenses.push(newExp);
  writeDB(db);
  res.status(201).json({ success: true, data: newExp });
});

app.delete('/expenses/:id', authMiddleware, (req, res) => {
  const db = readDB();
  const idx = db.expenses.findIndex(e => e.id === parseInt(req.params.id) && e.studentId === req.student.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Not found' });
  const deleted = db.expenses.splice(idx, 1)[0];
  writeDB(db);
  res.json({ success: true, data: deleted });
});

// ─── ANALYTICS ────────────────────────────────────────────────────────────────

app.get('/analytics/:studentId', authMiddleware, (req, res) => {
  const db = readDB();
  const sid = req.student.id;
  const allExp = db.expenses.filter(e => e.studentId === sid);
  const budgets = db.budgets[sid] || {};

  // Current month
  const now = new Date();
  const curMonth = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  const monthExp = allExp.filter(e => e.date.startsWith(curMonth));
  const totalSpent = monthExp.reduce((s, e) => s + e.amount, 0);

  const byCategory = {};
  monthExp.forEach(e => byCategory[e.category] = (byCategory[e.category]||0) + e.amount);

  const dailyTrend = {};
  monthExp.forEach(e => dailyTrend[e.date] = (dailyTrend[e.date]||0) + e.amount);

  const days = Object.keys(dailyTrend).length || 1;
  const avgDailySpend = Math.round(totalSpent / days);

  // Budget status
  const budgetStatus = {};
  Object.keys(budgets).forEach(cat => {
    const spent = byCategory[cat] || 0;
    budgetStatus[cat] = { budget: budgets[cat], spent, remaining: budgets[cat]-spent, percentage: Math.round((spent/budgets[cat])*100) };
  });

  // Month-over-month (last 4 months)
  const monthComparison = [];
  for (let i = 3; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    const label = d.toLocaleString('default', { month: 'short' }) + ' ' + d.getFullYear();
    const mExp = allExp.filter(e => e.date.startsWith(key));
    const total = mExp.reduce((s,e)=>s+e.amount,0);
    const catBreak = {};
    mExp.forEach(e => catBreak[e.category] = (catBreak[e.category]||0)+e.amount);
    monthComparison.push({ month: key, label, total, byCategory: catBreak });
  }

  // Spending forecast (linear regression on daily spend)
  const sortedDays = Object.entries(dailyTrend).sort((a,b)=>a[0].localeCompare(b[0]));
  let forecast = 0;
  if (sortedDays.length >= 2) {
    const avgSpend = totalSpent / days;
    const daysInMonth = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    forecast = Math.round(avgSpend * daysInMonth);
  }

  // Category daily breakdown (last 7 days)
  const catDailyBreakdown = {};
  const last7 = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate()-i);
    last7.push(d.toISOString().slice(0,10));
  }
  last7.forEach(day => {
    catDailyBreakdown[day] = {};
    ['Food','Transport','Stationery','Entertainment','Miscellaneous'].forEach(c => {
      catDailyBreakdown[day][c] = monthExp.filter(e=>e.date===day&&e.category===c).reduce((s,e)=>s+e.amount,0);
    });
  });

  res.json({
    success: true,
    data: {
      totalSpent, avgDailySpend,
      byCategory, dailyTrend, budgetStatus,
      totalBudget: Object.values(budgets).reduce((a,b)=>a+b,0),
      monthComparison, forecast, catDailyBreakdown,
      currentMonth: curMonth
    }
  });
});

// ─── GOALS ────────────────────────────────────────────────────────────────────

app.get('/goals', authMiddleware, (req, res) => {
  const db = readDB();
  const goals = db.goals.filter(g => g.studentId === req.student.id);
  res.json({ success: true, data: goals });
});

app.post('/goals', authMiddleware, (req, res) => {
  const { title, targetAmount, deadline, monthlySaving, icon } = req.body;
  if (!title || !targetAmount || !deadline) return res.status(400).json({ success: false, message: 'title, targetAmount, deadline required' });

  const db = readDB();
  const newGoal = {
    id: 'G' + String(db.nextGoalId++).padStart(3,'0'),
    studentId: req.student.id,
    title, targetAmount: Number(targetAmount),
    savedAmount: 0,
    deadline, monthlySaving: Number(monthlySaving)||0,
    icon: icon||'🎯', createdAt: new Date().toISOString().slice(0,10)
  };
  db.goals.push(newGoal);
  writeDB(db);
  res.status(201).json({ success: true, data: newGoal });
});

app.patch('/goals/:id/save', authMiddleware, (req, res) => {
  const { amount } = req.body;
  const db = readDB();
  const goal = db.goals.find(g => g.id === req.params.id && g.studentId === req.student.id);
  if (!goal) return res.status(404).json({ success: false, message: 'Goal not found' });
  goal.savedAmount = Math.min(goal.savedAmount + Number(amount), goal.targetAmount);
  writeDB(db);
  res.json({ success: true, data: goal });
});

app.delete('/goals/:id', authMiddleware, (req, res) => {
  const db = readDB();
  const idx = db.goals.findIndex(g => g.id === req.params.id && g.studentId === req.student.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Not found' });
  db.goals.splice(idx, 1);
  writeDB(db);
  res.json({ success: true });
});

// ─── SPLITS ───────────────────────────────────────────────────────────────────

app.get('/splits', authMiddleware, (req, res) => {
  const db = readDB();
  const mySplits = db.splits.filter(s => s.participants.includes(req.student.id));
  // Populate participant names
  const enriched = mySplits.map(split => ({
    ...split,
    participantDetails: split.participants.map(pid => {
      const s = db.students.find(st => st.id === pid);
      return s ? { id: s.id, name: s.name, avatar: s.avatar } : null;
    }).filter(Boolean),
    paidByName: db.students.find(s => s.id === split.paidBy)?.name || 'Unknown'
  }));
  res.json({ success: true, data: enriched });
});

app.post('/splits', authMiddleware, (req, res) => {
  const { title, totalAmount, participants, category } = req.body;
  if (!title || !totalAmount || !participants || participants.length < 2) {
    return res.status(400).json({ success: false, message: 'title, totalAmount, and at least 2 participants required' });
  }
  const db = readDB();
  const settled = {};
  participants.forEach(p => settled[p] = (p === req.student.id));

  const newSplit = {
    id: 'SP' + String(db.nextSplitId++).padStart(3,'0'),
    title, totalAmount: Number(totalAmount),
    paidBy: req.student.id,
    participants,
    perPerson: Math.round(Number(totalAmount) / participants.length),
    date: new Date().toISOString().slice(0,10),
    settled, category: category||'Miscellaneous'
  };
  db.splits.push(newSplit);
  writeDB(db);
  res.status(201).json({ success: true, data: newSplit });
});

app.patch('/splits/:id/settle', authMiddleware, (req, res) => {
  const db = readDB();
  const split = db.splits.find(s => s.id === req.params.id);
  if (!split) return res.status(404).json({ success: false, message: 'Split not found' });
  split.settled[req.student.id] = true;
  writeDB(db);
  res.json({ success: true, data: split });
});

// ─── FRIENDS ─────────────────────────────────────────────────────────────────

app.get('/friends', authMiddleware, (req, res) => {
  const db = readDB();
  const me = db.students.find(s => s.id === req.student.id);
  const friends = db.students
    .filter(s => me.friends.includes(s.id))
    .map(({ password, token, ...safe }) => safe);
  res.json({ success: true, data: friends });
});

app.post('/friends/add', authMiddleware, (req, res) => {
  const { email } = req.body;
  const db = readDB();
  const target = db.students.find(s => s.email === email);
  if (!target) return res.status(404).json({ success: false, message: 'Student not found' });
  if (target.id === req.student.id) return res.status(400).json({ success: false, message: "Can't add yourself" });
  const me = db.students.find(s => s.id === req.student.id);
  if (!me.friends.includes(target.id)) {
    me.friends.push(target.id);
    if (!target.friends.includes(me.id)) target.friends.push(me.id);
  }
  writeDB(db);
  const { password, token, ...safe } = target;
  res.json({ success: true, data: safe });
});

// ─── BUDGETS ──────────────────────────────────────────────────────────────────

app.get('/budgets', authMiddleware, (req, res) => {
  const db = readDB();
  res.json({ success: true, data: db.budgets[req.student.id] || {} });
});

app.put('/budgets', authMiddleware, (req, res) => {
  const db = readDB();
  db.budgets[req.student.id] = req.body;
  writeDB(db);
  res.json({ success: true, data: db.budgets[req.student.id] });
});

// ─── AI ADVICE (uses Anthropic API) ──────────────────────────────────────────
// Students can ask spending questions; we send their analytics as context.
app.post('/ai/advice', authMiddleware, async (req, res) => {
  const { question, analyticsData } = req.body;
  if (!question) return res.status(400).json({ success: false, message: 'question is required' });

  // Check if Anthropic API key is configured
  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_KEY) {
    // Return rule-based advice if no key
    const advice = generateRuleBasedAdvice(analyticsData, question);
    return res.json({ success: true, advice, source: 'rule-based' });
  }

  try {
    const systemPrompt = `You are a financial advisor for college students in India. 
    Be concise, friendly, and practical. Give specific, actionable advice.
    Use ₹ for currency. Keep responses under 150 words.
    Student context: ${JSON.stringify(analyticsData)}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        system: systemPrompt,
        messages: [{ role: 'user', content: question }]
      })
    });

    const data = await response.json();
    res.json({ success: true, advice: data.content[0].text, source: 'ai' });
  } catch (err) {
    const advice = generateRuleBasedAdvice(analyticsData, question);
    res.json({ success: true, advice, source: 'rule-based' });
  }
});

function generateRuleBasedAdvice(analytics, question) {
  if (!analytics) return "Log your expenses consistently to get personalized advice!";
  const { totalSpent, totalBudget, byCategory, avgDailySpend, forecast } = analytics;
  const pct = totalBudget ? Math.round((totalSpent/totalBudget)*100) : 0;

  if (question.toLowerCase().includes('food') || question.toLowerCase().includes('eat')) {
    const foodSpend = byCategory?.Food || 0;
    return `You've spent ₹${foodSpend} on food this month. Try cooking 2 meals a week — students typically save ₹800–1200/month this way. Also, canteen meals are ~40% cheaper than eating outside.`;
  }
  if (question.toLowerCase().includes('save') || question.toLowerCase().includes('saving')) {
    const canSave = Math.max(0, totalBudget - totalSpent);
    return `You have ₹${canSave} left in your budget. At your current rate, you'll spend ₹${forecast} by month end. To save more, cut entertainment by 20% — that's ₹${Math.round((byCategory?.Entertainment||0)*0.2)} back in your pocket.`;
  }
  if (pct > 90) return `⚠️ You've used ${pct}% of your monthly budget! Avoid non-essential spending for the rest of the month. Focus only on food and transport.`;
  if (pct > 70) return `You're at ${pct}% of your budget with ${new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate() - new Date().getDate()} days left. Stick to ₹${Math.round((totalBudget-totalSpent)/Math.max(1, 30-new Date().getDate()))} per day maximum.`;
  return `Great financial discipline! You're at ${pct}% budget usage. Your top spend is ${Object.entries(byCategory||{}).sort((a,b)=>b[1]-a[1])[0]?.[0]||'Food'}. Consider putting ₹${Math.round(avgDailySpend * 0.3 * 30)} into savings this month.`;
}

// ─── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🎓 Campus Spend Tracker v2 API → http://localhost:${PORT}`);
  console.log(`\n   Test credentials:`);
  console.log(`   Email: rahul@college.edu  |  Password: pass123`);
  console.log(`   Email: priya@college.edu  |  Password: pass123`);
  console.log(`\n   Set ANTHROPIC_API_KEY env var to enable AI advice`);
  console.log(`   export ANTHROPIC_API_KEY=your_key_here\n`);
});