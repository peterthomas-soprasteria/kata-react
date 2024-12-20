# Online Bookstore

This project is an online bookstore application built using React for the frontend. It includes features such as user authentication, book listing, cart management, and order viewing.

**Note:** This project is only for demonstration purposes.

## Features

- User Authentication (Login/Register)
- Book Listing
- Cart Management
- Order Viewing
- Protected Routes

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Backend server running on `http://localhost:8080`

## Getting Started

Follow these steps to get the application up and running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/online-bookstore.git
cd online-bookstore
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm start
```

The application will be available at `http://localhost:3000`.

### 4. Backend Server

Ensure that the backend server is running on `http://localhost:8080`. The backend server should handle authentication, book data, and order management.

## Project Structure

- `src/components`: Contains React components such as `Login`, `Register`, `BookList`, `Cart`, `Orders`, and `Navbar`.
- `src/styles`: Contains CSS files for styling the components.
- `src/App.js`: Main application file with routing and state management.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in the development mode.
- `npm test`: Launches the test runner in the interactive watch mode.
- `npm run build`: Builds the app for production to the `build` folder.

## Notes

- Ensure the backend server is running on `http://localhost:8080` for API requests.
- JWT token is required for accessing protected routes and cart operations.

## Acknowledgements

- React
- Axios
- React Router DOM
