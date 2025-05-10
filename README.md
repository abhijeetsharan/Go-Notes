# Go-Notes

Go-Notes is a full-stack web application for creating, managing, and storing personal notes. It provides user authentication and CRUD (Create, Read, Update, Delete) functionality for notes. The application is built using modern web technologies, including React for the frontend and Go (Golang) for the backend.

---

## Features

- **User Authentication**: Secure login and registration system using JWT (JSON Web Tokens).
- **Note Management**: Create, view, edit, and delete notes with a user-friendly interface.
- **Persistent Storage**: Notes are stored in a PostgreSQL database with GORM for ORM.
- **Backend API**: RESTful API built with Go and Fiber for fast and scalable server-side operations.
- **Frontend**: Developed with React and Vite for a responsive and dynamic user experience.
- **State Management**: Redux Toolkit with persist functionality for managing authentication state.

---

## Tech Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for frontend development.
- **Redux Toolkit**: For state management and persistence.
- **CSS**: Used for styling components.

### Backend
- **Go**: A statically typed programming language for backend development.
- **Fiber**: A web framework for Go inspired by Express.js.
- **GORM**: ORM for database interactions with PostgreSQL.
- **JWT**: Used for secure user authentication.

---

## Installation

### Prerequisites
- Node.js (for the frontend)
- Go (for the backend)
- PostgreSQL (for the database)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/abhijeetsharan/Go-Notes.git
   cd Go-Notes
   ```

2. **Setup the Backend**:
   - Navigate to the `server` directory:
     ```bash
     cd server
     ```
   - Set up environment variables in a `.env` file:
     ```env
     DB_URL=your_postgres_database_url
     JWT_SECRET=your_jwt_secret
     FRONTEND_URL=http://localhost:3000
     ```
   - Install dependencies and run the server:
     ```bash
     go mod tidy
     go run main.go
     ```

3. **Setup the Frontend**:
   - Navigate to the `client` directory:
     ```bash
     cd ../client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

---

## Usage

1. Open the frontend in your browser at `http://localhost:3000`.
2. Register a new account or log in with existing credentials.
3. Create, view, edit, or delete notes as needed.

---

## API Endpoints

### Authentication
- `POST /api/register`: Register a new user.
- `POST /api/login`: Login and receive a JWT.

### Notes
- `POST /api/notes`: Create a new note.
- `GET /api/notes`: Retrieve all notes for the authenticated user.
- `PUT /api/notes/:id`: Update a note by ID.
- `DELETE /api/notes/:id`: Delete a note by ID.

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

---

## License

This project is licensed under the MIT License.
