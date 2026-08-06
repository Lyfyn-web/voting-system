🗳️ Full-Stack Online Voting System

A secure full-stack election management and online voting system built with React, Tailwind CSS, Node.js, Express, JWT Authentication, and PostgreSQL.

This project allows voters to register, log in, cast votes for different seats, and view live election results, while administrators can manage the election through a professional dashboard.

🚀 Features
👤 Authentication
User registration
Secure login with JWT tokens
Protected frontend and backend routes
Role-based access (Admin / Voter)
🗳️ Voting System
Multiple election seats
Multiple candidates per seat
One-person-one-vote protection
Duplicate voting prevention using database constraints
👨‍💼 Admin Dashboard
Professional responsive dashboard
Sidebar navigation
Election statistics cards
View users, votes, seats, and candidates
Quick navigation to voting and results pages
📊 Live Results
Real-time vote counting
Auto-refreshing results page
Interactive charts using Recharts
Vote totals per candidate and seat
🛠️ Tech Stack
Frontend
React
Vite
Tailwind CSS
React Router DOM
Axios
Recharts
Backend
Node.js
Express.js
JWT (jsonwebtoken)
bcryptjs
cors
dotenv
Database
PostgreSQL
📁 Project Structure
voting-system/
├── backend/
│   ├── middleware/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   └── App.jsx
│   └── package.json
│
└── README.md
⚙️ Installation
1️⃣ Clone the repository
git clone https://github.com/Lyfyn-web/voting-system.git
cd voting-system
2️⃣ Backend Setup
cd backend
npm install

Create a .env file:

DB_USER=postgres
DB_HOST=localhost
DB_NAME=votingsystem
DB_PASSWORD=YOUR_PASSWORD
DB_PORT=5432

JWT_SECRET=mysecretkey
PORT=5000

Start the backend:

npm run dev
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Open:

http://localhost:5173
🗄️ Database Setup

Create the PostgreSQL database:

CREATE DATABASE votingsystem;

Create the required tables:

users
seats
candidates
votes
🔑 Demo Admin Account
Email: bonface@example.com
Password: 33804046
📸 Screenshots
🔐 Login Page

Add screenshot here

👨‍💼 Admin Dashboard

Add screenshot here

🗳️ Voting Page

Add screenshot here

📈 Live Results Page

Add screenshot here

🔒 Security Features
JWT authentication
Password hashing with bcrypt
Protected API routes
Role-based authorization
Database-level vote uniqueness constraint
Input validation and error handling
🌟 Future Improvements
Candidate photo uploads
Election scheduling
Email verification
Password reset functionality
Audit logs
Dark mode toggle
Deployment to Vercel + Render/Railway
📚 What I Learned

This project demonstrates practical experience with:

Full-stack application architecture
REST API development
PostgreSQL relational database design
JWT authentication workflows
React state management
Tailwind CSS responsive UI design
Git and GitHub version control
👨‍💻 Author

Bonface Musyoki

GitHub: https://github.com/Lyfyn-web
📄 License

This project is licensed under the MIT License.

⭐ If you found this project useful, please star the repository on GitHub!