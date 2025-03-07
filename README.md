
# EchoGPT Client

EchoGPT is an interactive AI chatbot application built using React. This app leverages the power of EchoGPT to provide quick ideas, summaries, or feedback. The client side is designed with a responsive user interface and is integrated with Firebase authentication and Redux for state management.

## Live Link
You can access the live version of the client application here:  
[**EchoGPT Client**](https://echogpt-9bc84.web.app/)

## Features
- **Login with Google**: Users can sign in using their Google account for personalized interaction.
- **Chat History**: Users can view previous chat history and delete chats as needed.
- **Responsive UI**: The UI is responsive, providing a smooth experience on both mobile and desktop devices.
- **Real-time Chat**: Interact with EchoGPT in real-time and receive intelligent responses.
- **State Management**: Uses Redux for managing user state across the application.

## Project Structure

```
appifydevs-task-client/
├── public/                  # Static assets (e.g., images, favicon)
├── src/
│   ├── components/          # Reusable components (Navbar, Sidebar, etc.)
│   ├── features/            # Redux slices (userSlice.js)
│   ├── firebase/            # Firebase authentication logic
│   ├── pages/               # Main pages (Dashboard, Login, ChatBox)
│   ├── router/              # React Router configuration
│   ├── store.js             # Redux store configuration
│   ├── App.js               # Main component
│   └── index.css            # Global styles
└── package.json             # Project dependencies and scripts
```

## Installation

To get started with the client-side application, follow the steps below:

### 1. Clone the repository
```
git clone https://github.com/mu-senpai/appifydevs-task-client.git
cd appifydevs-task-client
```

### 2. Install dependencies
You will need to install the necessary dependencies for this project.

Using npm:
```
npm install
```

### 3. Set up Firebase
Ensure that Firebase is configured in your project. If you need to configure Firebase, create a project in Firebase Console and set up the necessary keys. Then add your Firebase credentials to the environment variables (`.env.local` file).

### 4. Run the application
Once you have installed the dependencies and set up Firebase, you can run the development server:

```
npm run dev
```

This will start the development server, and you can view the application in your browser at `http://localhost:5173`.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Lints the codebase using ESLint.

## Dependencies

- `@reduxjs/toolkit`: State management tool for Redux.
- `@tanstack/react-query`: Library for data fetching and caching.
- `axios`: Promise-based HTTP client for making requests to the server.
- `firebase`: Firebase SDK for handling authentication and backend communication.
- `framer-motion`: Animation library for React components.
- `react`: JavaScript library for building user interfaces.
- `react-dom`: React package for rendering to the DOM.
- `react-redux`: Official Redux binding for React.
- `react-router-dom`: Library for routing in React applications.
- `tailwindcss`: Utility-first CSS framework.
- `daisyui`: UI component library for Tailwind CSS.
- `react-icons`: A set of icons for React.

## Dev Dependencies

- `vite`: Next-generation, fast build tool for front-end development.
- `eslint`: Linter to maintain code quality.
- `@vitejs/plugin-react`: Plugin to support React with Vite.
- `eslint-plugin-react-hooks`: ESLint plugin to enforce best practices for React Hooks.

## Environment Variables

Make sure to configure the following environment variables in a `.env` file:

```
VITE_apiKey=your-firebase-api-key
VITE_authDomain=your-firebase-auth-domain
VITE_projectId=your-firebase-project-id
VITE_storageBucket=your-firebase-storage-bucket
VITE_messagingSenderId=your-firebase-messaging-sender-id
VITE_appId=your-firebase-app-id
VITE_ECHOGPT_API_KEY=your-api-key-for-EchoGPT
```

## Contributing

If you'd like to contribute to the development of EchoGPT Client, feel free to fork this repository, create a new branch, and submit a pull request. Contributions are welcome!