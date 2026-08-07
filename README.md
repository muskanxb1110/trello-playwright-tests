# Trello Playwright Automation Framework

![Playwright Tests](https://github.com/muskanxb1110/Playwright-JavaScript-Trello/actions/workflows/playwright.yml/badge.svg)

## Description
This repository contains an end-to-end test automation framework built with Playwright and JavaScript, testing real-world Trello scenarios through both UI and API automation, including user authentication, board management, list creation, and card creation.

## Tech Stack
- **Playwright** - end-to-end test automation framework
- **JavaScript** - programming language
- **Node.js** - runtime environment
- **VS Code** - recommended IDE
- **GitHub Actions** - CI/CD pipeline (configured)

## Project Structure
```
trello-playwright-tests/
├── pages/              # Contains loginPage and boardPage classes with reusable methods
├── pageobjects/        # Contains selector definitions for selectors in loginPage and boardPage
├── tests/              # Contains TC for user authentication, board management, list creation, and card creation
├── testFixtures/       # Custom Playwright fixtures wiring up page objects
├── data/               # Test data (gitignored for security)
├── .github/workflows/  # GitHub Actions CI/CD configuration
└── playwright.config.js # Playwright configuration
```

## Framework Features

- **Page Object Model (POM)** - UI interactions are organized into reusable page classes to improve maintainability.
- **Custom Playwright Fixtures** - Test setup is centralized through fixtures for cleaner test files and dependency management.
- **Test Data Management** - Test data is separated from test logic for easier maintenance.
- **Test Isolation & Cleanup** - Each UI scenario creates its own test data and automatically removes created Trello boards using Playwright afterEach hooks to prevent test dependencies and leftover data.
- **API Testing Coverage** - Trello REST API workflows are validated alongside UI scenarios.
- **HTML Test Reporting** - Playwright's built-in reporting provides execution results and debugging information.

## Prerequisites
- **Node.js** (v18 or higher) - [download here](https://nodejs.org)
- **Git** — [download here](https://git-scm.com)
- **VS Code** (recommended) - [download here](https://code.visualstudio.com)

## Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/muskanxb1110/trello-playwright-tests.git
cd trello-playwright-tests
```

2. **Install dependencies:**
```bash
npm install
```

3. **Install Playwright browsers:**
```bash
npx playwright install
```

4. **Set up authentication:**

Generate the Playwright authentication state locally:

```bash
npx playwright codegen --save-storage=auth.json https://trello.com
```

> ⚠️ `auth.json` is gitignored for security - you must generate it locally before running tests.

5. **Run the tests:**
```bash
# Run all tests
npx playwright test --project=chromium

# Run regression tests
npx playwright test --grep @regression --project=chromium

# Run a specific test file
npx playwright test TC_01_login.test.js --project=chromium

# View the HTML report
npx playwright show-report
```

## Test Coverage

### UI Tests

| Test File | Description |
|-----------|-------------|
| `TC_01_login.test.js` | Verifies successful login and user is redirected to home page |
| `TC_02_createBoard.test.js` | Creates a board, verifies navigation, and cleans up test data |
| `TC_03_createList.test.js`  | Creates a board, adds a list, verifies list creation, and cleans up test data |
| `TC_04_createCard.test.js`  | Creates a board, adds a list, adds a card, verifies card creation, and cleans up test data |

### API Tests
| Test File | Description |
|-----------|-------------|
| `TC_05_apiCreateBoard.test.js` | Creates a board via API, verifies creation, and cleans up test data through API requests |
| `TC_06_apiCreateList.test.js`  | Creates a board and list via API, verifies creation, and cleans up test data through API requests |
| `TC_07_apiCreateCard.test.js`  | Creates a board, list, and card via API, verifies creation, and cleans up test data through API requests |

## Authentication

This project uses Playwright's `storageState` to reuse an authenticated Trello browser session. Trello authentication includes two-factor authentication and security protections that are handled through manual login during session generation.

`auth.json` is **not included in this repository** to protect account security. You must generate it locally before running tests.

**To regenerate when expired:**
```bash
npx playwright codegen --save-storage=auth.json https://trello.com
```

> 💡 Log in manually in the browser that opens, wait until you land on your boards page, then close the browser. The session is saved automatically.

API tests require a Trello API key and token stored in `data/users.json` (gitignored). 
See [Trello Power-Up Admin Portal](https://trello.com/power-ups/admin) to generate credentials.