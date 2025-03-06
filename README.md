# Sidelines Group Assignment - QA Automation Homework

This project demonstrates QA automation skills using Playwright, focusing on website analysis, performance testing, and API validation. The assignment consists of two main tasks that showcase different aspects of automated testing.

## 🎯 Assignment Overview

### Time Allocation: 3-4 hours
- Website Analysis and Validation Task (2 hours)
- API Data Retrieval Task (2 hours)

## 🚀 Features

### 1. Website Analysis and Validation
- Performance Testing using Google Lighthouse
- Resource Validation (CSS, JS, images)
- Automated Report Generation
- Broken Link Detection

### 2. API Data Validation
- JSONPlaceholder API Integration
- Data Structure Validation
- Automated Error Logging
- Validation Report Generation

## 🛠️ Tech Stack

- **Framework**: Playwright
- **Language**: TypeScript
- **Testing Tools**: 
  - Playwright Test
  - Google Lighthouse
  - playwright-lighthouse
- **API**: JSONPlaceholder

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Chrome/Chromium browser (for Lighthouse testing)

## 🔧 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd sidelines-group-assignment
```

2. Install dependencies:
```bash
npm install
```

## 🧪 Test Suites

### 1. Website Analysis and Validation (`PerformanceTestingLighthouse.spec.ts`)
- **Performance Testing**:
  - Analyzes https://www.cbssports.com/betting using Google Lighthouse
  - Generates scores for:
    - Performance
    - SEO
    - Accessibility
    - Best Practices
  - Saves results in JSON format

- **Resource Validation**:
  - Checks all linked resources (CSS, JS, images)
  - Validates HTTP status codes
  - Logs broken resources
  - Generates detailed reports

### 2. API Data Validation (`ApiDataRetrievalTask.spec.ts`)
- Fetches posts from JSONPlaceholder API
- Validates data structure:
  - Non-empty title
  - Non-empty body
  - Numeric userId
- Generates validation reports
- Logs validation failures

## 📊 Reports and Deliverables

The test suite generates various reports:

### Website Analysis Reports
- Lighthouse performance report (`lighthouse-report.json`)
- Broken resources report (`broken-resources.json`)
- Playwright HTML reports (in `playwright-report/` directory)

### API Validation Reports
- Validation results (`validation-results.json`)
- Console output with detailed validation logs

## 🚀 Running Tests

Run tests in headed mode:
```bash
npm run test:headed
```

## 📁 Project Structure

```
sidelines-group-assignment/
├── tests/                    # Test files
│   ├── PerformanceTestingLighthouse.spec.ts  # Website analysis tests
│   └── ApiDataRetrievalTask.spec.ts          # API validation tests
├── pages/                    # Page objects
├── config/                   # Configuration files
├── fixtures/                 # Test fixtures
├── reports/                  # Test reports
├── playwright-report/        # Playwright HTML reports
├── test-results/            # Test results
├── package.json             # Project dependencies
├── playwright.config.ts     # Playwright configuration
└── tsconfig.json           # TypeScript configuration
```
