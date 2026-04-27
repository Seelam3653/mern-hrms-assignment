# MERN Employee Salary Management — React Developer Assignment

## Setup Instructions

### Prerequisites
- Node.js 16+
- MySQL / MariaDB
- Git

### Backend
```bash
cd Backend
npm install
```

Create a MySQL database named `db_penggajian3` (or update `Backend/config/Database.js` with your own DB name + credentials).

Sync the database schema by temporarily uncommenting the `db.sync()` call in `Backend/index.js`, running the server once, then commenting it back.

```bash
# Create a .env file in Backend/ with:
APP_PORT=5000
SESS_SECRET=your_secret_key_here

npm start
```

### Frontend
```bash
cd Frontend
npm install      # or: yarn install
npm run dev      # starts at http://localhost:5173
```

---

## HRMS Choice

**MERN Employee Salary Management** by berthutapea (React + Node/Express + MySQL via Sequelize).  
Chosen because it already has employee, attendance, salary, and deduction modules — close match to the HR-for-construction use case in the assignment, and the codebase is clean and approachable.

---

## AI Tools Used

| Tool | Used For |
|------|----------|
| **Antigravity (Google DeepMind)** | Full implementation — reading codebase, writing backend model/controller/route for Overtime feature, all ticket fixes, wiring routes/pages, debugging duplicate code, writing README |

All code was implemented with AI assistance as encouraged in the assignment guidelines. The logic, validation rules, and architectural decisions follow the existing codebase's patterns.

---

## What Was Built

### Part 1 — Overtime Entry & Approval Feature

**New files:**
- `Backend/models/OvertimeModel.js` — Sequelize model with worker_id, date, hours, reason, status
- `Backend/controllers/OvertimeController.js` — Full CRUD with validations
- `Backend/routes/OvertimeRoute.js` — Express router mounted in `index.js`
- `Frontend/src/pages/Admin/Transaksi/DataOvertime/index.jsx` — Form + list page

**Backend validations:**
- All fields required
- Hours 1–6
- Date not in future, not > 7 days past
- Reason min 10 chars
- No duplicate (same worker + date)
- Worker must exist in `data_pegawai`
- Monthly cap 60 hours — rejected with informative message

**Frontend validations:** Mirrors all backend rules with inline error messages.

**Route:** `/data-overtime`

---

### Part 2 — Ticket Fixes

| Ticket | Change |
|--------|--------|
| **LF-101** | Payslip "Dicetak Pada" and "Karawang" dates changed from Indonesian long format to `DD/MM/YYYY` (`PrintPdfSlipGaji/index.jsx`) |
| **LF-102** | `jmlPotongan` input gets `min="1"` in `FormAddDataPotongan`. Backend `createDataPotonganGaji` now rejects non-positive amounts with HTTP 400 |
| **LF-103** | `designation` column added to `DataPegawaiModel`, persisted via `createDataPegawai` and `updateDataPegawai`. Dropdown (Mason / Electrician / Plumber / Supervisor / Helper) added to `FormAddDataPegawai`. Column visible in employee list |
| **LF-104** | "Download CSV" button on `DataPegawai` list page — exports all visible/filtered employees with key fields as `employee_list.csv` |
| **LF-105** | Employee list table wrapped in `overflow-x-auto` and given `min-w-max` — horizontal scroll on mobile, table never truncated |

---

## Commit Structure

- `feat: add overtime entry & approval feature (Part 1)` — model, controller, route, frontend page
- `fix(LF-101): change payslip date format to DD/MM/YYYY`
- `fix(LF-102): add positive-number validation to salary/deduction fields`
- `feat(LF-103): add designation dropdown to employee profile and list`
- `feat(LF-104): add CSV export button to employee list`
- `fix(LF-105): make employee list table responsive on mobile`
