# BS AI Business Intelligence Platform - Software Design Document

## Vision
Build an Arabic-first Business Intelligence platform that helps small and medium businesses move from raw operational data to clear decisions using dashboards, reports, exports, and AI-powered insights.

## Product Name
**BS AI Business Intelligence Platform**

Suggested future name:
**BS AI Decision Intelligence Platform**

Tagline:
**From Data to Decisions**

Arabic tagline:
**من البيانات إلى القرار**

---

## Version Roadmap

### Version 2.0 - Business Intelligence Core
Focus: Data entry, dashboards, reports, and export.

Features:
- Manual data entry without CSV dependency.
- Smart business templates:
  - Sales
  - Cafeteria
  - Employees
  - Inventory
  - School
  - Clinic
  - Custom template
- Executive Dashboard.
- KPI cards.
- Interactive charts.
- Smart recommendations.
- Report generation.
- Export options:
  - PDF
  - Word
  - Excel
  - Print
  - Email draft/share
  - Copy report link
- Local save/open project.
- Arabic RTL support.
- English support later.

### Version 3.0 - AI Intelligence Layer
Focus: AI assistant, forecasts, and alerts.

Features:
- Ask-your-data assistant.
- AI-generated insights.
- Forecasting module.
- Alerts and warnings.
- Anomaly detection.
- Decision Center.

### Version 4.0 - Enterprise Platform
Focus: users, permissions, database, and cloud.

Features:
- Login.
- User roles.
- Permissions.
- Supabase/Firebase integration.
- Cloud project storage.
- Audit log.
- Company settings.
- Multi-user reports.

---

## Version 2.0 Page Structure

### 1. Executive Dashboard
Purpose: Give managers a fast overview of performance.

Components:
- Total value/revenue.
- Total quantity/operations.
- Average productivity.
- Best category/department.
- Risk alerts.
- Recent insights.
- Charts summary.

### 2. Data Entry
Purpose: Make data input easy for non-technical users.

Components:
- Template selector.
- Simple table entry.
- Add row.
- Delete row.
- Clear data.
- Load sample data.
- Auto-analyze after changes.

### 3. Analytics
Purpose: Convert records into business indicators.

Components:
- KPI cards.
- Category comparison.
- Productivity by item.
- Time-based trend when dates exist.
- Best/worst performers.

### 4. Reports
Purpose: Generate professional outputs.

Components:
- Executive summary.
- KPIs.
- Insights.
- Recommendations.
- Charts.
- Action plan.

### 5. Export and Share
Purpose: Make the report easy to use outside the platform.

Export options:
- PDF using browser print or HTML-to-PDF.
- Word document export.
- Excel export.
- Print.
- Email share using mailto link.
- Copy report link or report text.

### 6. Settings
Purpose: Personalize the platform.

Settings:
- Company name.
- Logo text.
- Language.
- Theme.
- Report title.

---

## Recommended File Structure

```text
bs-ai-bi-platform/
├── index.html
├── README.md
├── css/
│   └── main.css
├── js/
│   ├── app.js
│   ├── data.js
│   ├── analytics.js
│   ├── charts.js
│   ├── reports.js
│   └── storage.js
├── assets/
│   └── icons/
├── docs/
│   └── software-design-document.md
└── samples/
    └── sample-data.json
```

---

## Version 2.0 Implementation Tasks

### Phase 1 - Clean Project Structure
- Move CSS from index.html to css/main.css.
- Move JavaScript from index.html to js/app.js and helper files.
- Keep index.html clean and readable.
- Add README.md.

### Phase 2 - Dashboard Upgrade
- Add KPI cards.
- Add chart area.
- Add insights panel.
- Add alerts panel.

### Phase 3 - Report Center
- Add report preview section.
- Add export PDF.
- Add export Word.
- Add export Excel.
- Add print button.
- Add email button.
- Add copy report text/link.

### Phase 4 - Local Storage
- Save project.
- Open project.
- Manage saved projects.
- Add project name and date.

---

## Technical Stack

Current stack:
- HTML
- CSS
- JavaScript
- Chart.js
- Browser print for PDF
- LocalStorage
- GitHub + Netlify deployment

Suggested additions:
- SheetJS for Excel export.
- docx.js for Word export.
- html2pdf.js only if Arabic PDF remains stable.
- Supabase in Version 4.0.

---

## Design Direction

Visual style:
- Luxury black and gold.
- Arabic-first RTL layout.
- Clear executive interface.
- Large KPI cards.
- Minimal steps for beginners.

Target user:
- Business owner.
- Manager.
- Data beginner.
- Small company employee.
- Student project presentation.

---

## Success Criteria for Version 2.0

Version 2.0 is complete when the user can:
1. Open the app from Netlify.
2. Choose an activity template.
3. Enter business data manually.
4. See KPIs and charts automatically.
5. Generate insights and recommendations.
6. Export the report as PDF, Word, Excel, print, email, or copied text.
7. Save and reopen the project locally.
