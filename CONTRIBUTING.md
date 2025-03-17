Thank you for your interest in contributing to the **AI Pop-Up Chromium Extension**! We value your time and effort. This document outlines best practices and guidelines to make your contribution process as smooth and efficient as possible.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)  
2. [Types of Contributions](#types-of-contributions)  
3. [Getting Started](#getting-started)  
4. [Issue Reporting](#issue-reporting)  
5. [Feature Requests](#feature-requests)  
6. [Pull Requests](#pull-requests)  
7. [Code Style Guidelines](#code-style-guidelines)  
8. [Commit Messages](#commit-messages)  
9. [Testing](#testing)  
10. [Documentation](#documentation)  
11. [Contact](#contact)  

---

## 1. Code of Conduct

By participating in this project, you agree to uphold our [Code of Conduct](https://github.com/ewtaylor-it/ai-popup-chromium-extension/CODE_OF_CONDUCT.md). Be respectful, inclusive, and open-minded. We appreciate diverse perspectives and ask that all interactions remain constructive and supportive.

---

## 2. Types of Contributions

We welcome any and all contributions, including but not limited to:

- **Bug Reports**: Found an issue? Let us know.  
- **Feature Requests**: Have an idea to improve the extension? Submit a request!  
- **Pull Requests**: Submit code or documentation updates.  
- **Documentation**: Improving clarity, spelling, grammar, or examples.  

---

## 3. Getting Started

1. **Fork** this repository to your own GitHub account.  
2. **Clone** the project to your local machine:  
   ```bash
   git clone https://github.com/ewtaylor-it/ai-popup-chromium-extension.git
   ``` 
3. **Create a new branch** for your contribution:  
   ```bash
   git checkout -b feature/new-feature
   ```

---

## 4. Issue Reporting

1. Check the [Issues](https://github.com/ewtaylor-it/ai-popup-chromium-extension/issues) tab to see if a similar issue already exists.  
2. If not, open a new issue and include the following:
   - **Title**: Short and descriptive.
   - **Description**: A clear and concise description of the issue.
   - **Screenshots**: If applicable, add screenshots to help explain the issue.
   - **Additional context**: Any other context about the issue. Example: Browser version, OS, extension version.

Providing logs, screenshots, or relevant console output can significantly speed up the troubleshooting process.

---

## 5. Feature Requests

1. Verify that a similar request does not already exist in the [Issues](https://github.com/ewtaylor-it/ai-popup-chromium-extension/issues) or [Discussions](https://github.com/ewtaylor-it/ai-popup-chromium-extension/discussions).  
2. If new, open an issue or discussion with:
   - **Use Case**: Why this feature is needed. Example: Is there an existing issue that this feature would fix?
   - **Description** A clear and concise description of what you want to happen.
   - **Additional context**: Add any other context or screenshots about the feature request here.

We prioritize features based on usefulness, complexity, and alignment with the project’s goals.

---

## 6. Pull Requests

1. **Open or reference an issue**: Discuss significant changes in an issue before sending a pull request.  
2. **Create a dedicated branch**: Never work directly on the `main` or `master` branch.  
3. **Follow Code Style**: See [Code Style Guidelines](#code-style-guidelines) below.  
4. **Write Tests** (if applicable): Ensure your changes pass existing tests and add new tests if needed.  
5. **Commit** and **push** to your fork.  
6. **Open a Pull Request**:
   - Provide a **clear title** and **description** of your changes.  
   - Reference the issue number if the PR addresses an existing issue (e.g., `Closes #123`).  
   - Ensure all automated checks pass (builds, tests, linting).

A maintainer will review your pull request, provide feedback, and once approved, merge it into the main branch. Response times may vary, but we aim to review PRs as quickly as possible.

---

## 7. Code Style Guidelines

We aim for readability and consistency. Please follow these guidelines:

- **JavaScript/TypeScript**:
  - Prefer `const`/`let` over `var`.  
  - Use [camelCase](https://en.wikipedia.org/wiki/Camel_case) for variables and function names.  
  - Use [PascalCase](https://en.wikipedia.org/wiki/Pascal_case) for class names (if applicable).  
  - Indent with **2 spaces** (align with the existing codebase).  
  - Keep lines under **80-100 characters** when possible.  

- **HTML/CSS** (within content scripts):
  - Use semantic HTML when appropriate.  
  - Keep inline styles minimal; consider using CSS classes.  
  - Maintain consistency in naming conventions (e.g., `custom-overlay`, `custom-popup`).

- **General**:
  - Avoid large, monolithic functions.  
  - Provide explanatory comments where necessary.  

If in doubt, look at existing code patterns in this repository for guidance.

---

## 8. Commit Messages

Use **descriptive** and **concise** commit messages. I prefer to write them as a follow-on from "This commit will..."

Examples:
```
- *This commit will...* Add this new feature
- *This commit will...* Create a function that does x and y
- *This commit will...* Fix this particular bug
```

---

## 9. Testing

### Local Testing

- Load the extension in `chrome://extensions` or `edge://extensions`.  
- Interact with AI websites listed in `target-hosts.json`.  
- Validate that the pop-up displays as expected and no errors appear in the developer console.

---

## 10. Documentation

When you add new features or change existing ones, please also update:

1. **README**: Document any new environment variables, dependencies, or setup steps.  
2. **Wiki Pages**: If your change affects deployment, configuration, or advanced usage, add or modify relevant Wiki pages.  
3. **Inline Comments**: Keep code comments up to date to reflect code changes.

---

## 11. Contact

If you have any questions or need clarification:

- Open an [Issue](https://github.com/ewtaylor-it/ai-popup-chromium-extension/issues) or [Discussion](https://github.com/ewtaylor-it/ai-popup-chromium-extension/discussions).  
- Tag project maintainers in your issue or pull request for quicker responses.

We appreciate your time and contributions!

> Thank you for helping to improve the AI Pop-Up Chromium Extension. Your efforts make this project stronger and more useful for everyone.

---

<!-- Replace these placeholder links with the actual URLs for your repository, if available -->
[issues-link]: https://github.com/ewtaylor-it/ai-popup-chromium-extension/issues
[discussions-link]: https://github.com/ewtaylor-it/ai-popup-chromium-extension/discussions
[coc-link]: https://github.com/ewtaylor-it/ai-popup-chromium-extension/CODE_OF_CONDUCT.md
