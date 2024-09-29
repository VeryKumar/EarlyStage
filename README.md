🚀 EarlyStage is a web application designed to help entrepreneurs and developers evaluate, improve, and launch their Minimum Viable Product (MVP) in minutes. The primary goal of this project is to streamline the process of turning an app idea into a functional MVP, ready for deployment and user testing.

The application consists of two main components: a React-based frontend and a FastAPI-powered backend integrated with the Anthropic API (Claude) for idea analysis.

📂 **Frontend**

The frontend, built with React, provides a user-friendly interface where users can:

1. 💡 Submit their app idea, including a description, name, and category.
2. 📊 Receive a detailed analysis of their idea, including market potential, technical complexity, uniqueness, and an overall score.
3. 🎨 Generate a tailored MVP template based on the analysis, with essential features and a modern user interface.

To run the frontend development server, navigate to the project's root folder and execute the following command:

```
npm run dev
```

The frontend will be accessible at `http://localhost:5173/`.

📂 **Backend**

The backend, built with FastAPI and Python, serves as the core of the application. It handles the following tasks:

1. 🤖 Integrating with the Anthropic API (Claude) to analyze the user's app idea and generate a detailed report.
2. 🔄 Exposing a RESTful API for the frontend to communicate with the backend and retrieve analysis results.
3. 🔧 (Future) Generating customized MVP templates based on the analysis results.

To run the backend server, navigate to the `EarlyStage/backend` folder and execute the following command:

```
poetry run start
```

The backend will be accessible at `http://localhost:8000`.

🔨 **Development**

When writing code, please follow these guidelines:

- For frontend code, use the appropriate React component structure and styling with CSS or styled-components.
- For backend code, use Python and the FastAPI framework, following best practices for API development.
- Ensure proper error handling and input validation on both the frontend and backend.
- Write clean, readable, and well-documented code.

By combining the power of React, FastAPI, and the Anthropic API, EarlyStage aims to provide a seamless experience for entrepreneurs and developers, helping them validate their ideas, generate tailored MVP templates, and ultimately launch their products faster and more efficiently.

Feel free to explore the codebase and contribute to this exciting project! 🎉