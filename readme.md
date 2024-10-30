# Advanced Authentication App

A robust authentication application built using the MERN stack with advanced features, providing users with a secure and seamless experience.

## 🌟 Features

- **User Authentication:**

  - Sign Up: Create a new account with email verification.
  - Sign In: Securely log in to your account.
  - Sign Out: End your session safely.

- **Account Management:**

  - Dashboard: Access user-specific information and manage your account.
  - Email Verification: Verify user email addresses using Nodemailer.
  - Password Reset: Securely reset forgotten passwords.

- **Responsive Design:**

  - Built with Tailwind CSS and Shadcn UI for a modern and responsive user interface.

- **State Management:**

  - Data fetching and state management using Tanstack Query for a smooth user experience.

- **Form Handling:**

  - Form validation and management with React Hook Form and Zod.

- **Testing:**

  - Unit test with Jest and supertest for the server-side.

- **Containerization:**

  - Entire application is containerized using Docker for easy development.

- **SEO:**

  - Basic SEO with react-helmet-async

- **security features**
  - CORS configuration
  - Rate limiting
  - Input validations
  - Helmet
  - Error Handling

## 🛠️ Technologies Used

- **Frontend:**

  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - Shadcn UI
  - React Hook Form
  - Zod for validation
  - Tanstack Query
  - Axios

- **Backend:**

  - Node.js
  - Express
  - MongoDB (with Mongoose)
  - TypeScript
  - Nodemailer for email services
  - Winston for logging
  - Jest

- **DevOps & Tools:**
  - Docker
  - Docker Compose
  - Git

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Docker (optional)
- Git

### Local Development Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ReynoldArun09/MERN-Advanced-Authentication
   cd MERN-Advanced-Authentication
   ```

2. **Environment Configuration**

   Create `.env` files in both frontend and backend directories:

   **Backend (.env)**

   ```env
   NODE_ENV=development
   PORT=3000
   CORS_ORIGIN=http://localhost:5173
   FRONTEND_URL=http://localhost:5173
   MONGO_DB_URI=mongodb://mongo:27017/mern-auth (for docker)
   MONGODB_URI=mongodb://localhost:27017/mern-auth
   ACCESS_SECRET_KEY=secret
   ACCESS_TOKEN_EXPIRE_TIME="1d"
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-specific-password
   ```

   **Frontend (.env)**

   ```env
   VITE_BACKEND_URL = http://localhost:3000/api/v1
   ```

3. **Install Dependencies**

   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

4. **Start Development Servers**

   **Backend**

   ```bash
   cd backend
   npm run dev
   ```

   **Frontend (new terminal)**

   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

### Docker Setup

1. **Build and Run Containers**

   ```bash
   docker-compose up --build
   ```

2. **Stop Containers**
   ```bash
   docker-compose down
   ```

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm run test
```
