# Job Portal

A full-stack Job Portal application featuring a modern React frontend (using Vite) and a robust Express.js backend with MongoDB integration. This platform enables companies to post jobs and users to apply for them, with secure authentication, advanced analytics, and a rich web experience.

---

## 🚀 Live Demo

[Visit the Job Portal Live](https://job-portal-client-dxcnh3krm-hemanths-projects-2b418e2b.vercel.app/)

---

## ✨ Overview

**Job Portal** is a robust recruitment platform built with a React + Vite frontend and a scalable Express.js + MongoDB backend. Designed for both employers and job seekers, it provides a seamless experience for posting jobs, managing applications, and exploring career opportunities. The app emphasizes security, performance, and an attractive, responsive UI.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Backend (Server)](#backend-server)
  - [Frontend (Client)](#frontend-client)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
- [Contribution Guidelines](#contribution-guidelines)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Author](#author)

---

## Features

- **User Authentication:** Secure login and registration using Clerk.
- **Role Management:** Separate flows for companies and job seekers.
- **Job Management:** Companies can create, update, and delete job postings.
- **Job Applications:** Users can browse and apply to jobs.
- **Rich Text Editor:** Create and format job descriptions with Quill.
- **Analytics:** Visualize data using Recharts.
- **Image Uploads:** Company logos and user resumes via Cloudinary and Multer.
- **Email Notifications:** Automated emails with Nodemailer.
- **Webhooks:** Real-time sync with Clerk via webhooks.
- **Error Monitoring:** Sentry integration for error tracking.
- **Modern UI:** Built with React, Tailwind CSS, and React Router.
- **Responsive Design:** Works seamlessly on mobile and desktop.
- **Toast Notifications:** Real-time feedback for user actions.

---

## Tech Stack

### Frontend

- **React 19** (via Vite)
- **Tailwind CSS** for styling
- **React Router DOM** for routing
- **Clerk** for authentication
- **Axios** for API communication
- **Quill** for rich text editing
- **Recharts** for data visualization

### Backend

- **Node.js & Express 5**
- **MongoDB** with Mongoose
- **Clerk SDK** for auth
- **Cloudinary** for media storage
- **Multer** for file uploads
- **Nodemailer** for emails
- **Sentry** for monitoring
- **Dotenv** for environment configuration

---

## Screenshots

<!-- Add your screenshots here, or describe how users can add them. For example: -->
| Home Page | Job Listings | Admin Dashboard |
|:---------:|:------------:|:---------------:|
| ![Home](client/public/images/) | ![Jobs](screenshots/jobs.png) | ![Dashboard](screenshots/dashboard.png) |

---

## Project Structure

```
Job-Portal/
├── client/            # React frontend (Vite)
│   ├── src/
│   ├── public/
│   └── package.json
└── server/            # Express backend
    ├── config/
    ├── controllers/
    ├── routes/
    ├── models/
    ├── server.js
    └── package.json
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/HemanthGK2004/Job-Portal.git
cd Job-Portal
```

### 2. Backend (Server)

```bash
cd server
npm install
# Set up .env (see Environment Variables below)
npm run start   # or: npm run server (for nodemon)
```

### 3. Frontend (Client)

```bash
cd ../client
npm install
npm run dev
```

---

## Environment Variables

### Server (`server/.env`)

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
SENTRY_DSN=your_sentry_dsn
```

### Client

> Typically, most client-side configuration is handled via Vite’s environment variables or during API requests.

---

## Scripts

### Backend

- `npm run start` – Start the Express server
- `npm run server` – Start with Nodemon for auto-reload

### Frontend

- `npm run dev` – Start Vite dev server
- `npm run build` – Build for production
- `npm run preview` – Preview the production build
- `npm run lint` – Lint codebase

---

## API Endpoints

| Endpoint                  | Method | Description                 |
|---------------------------|--------|-----------------------------|
| `/api/company`            | CRUD   | Manage companies            |
| `/api/jobs`               | CRUD   | Manage jobs                 |
| `/api/users`              | CRUD   | Manage user profiles        |
| `/webhook`                | POST   | Clerk webhook endpoint      |
| `/debug-sentry`           | GET    | Test Sentry error logging   |

> More details can be found in the server’s `routes/` and `controllers/` folders.

---

## Contribution Guidelines

We welcome contributions! To get started:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

Please ensure your code follows the established style and passes all tests.

---

## Troubleshooting

- **Port already in use:** Make sure nothing else is running on port 5000 or change the `PORT` in `.env`.
- **MongoDB connection issues:** Verify your `MONGODB_URI` is correct and MongoDB is running.
- **Cloudinary upload fails:** Double-check your Cloudinary credentials.
- **Emails not sending:** Make sure your email provider allows SMTP access and your credentials are valid.
- **Clerk authentication errors:** Ensure your Clerk keys are correct and your Clerk project is configured.

---

## License

This project is licensed under the ISC License.

---

## Author

- [HemanthGK2004](https://github.com/HemanthGK2004)

---

## Contributions

Feel free to open issues or submit pull requests to improve this project!
