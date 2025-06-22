# Job-Portal

A full-stack Job Portal application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This platform connects recruiters and job seekers, providing a seamless experience for posting, searching, and applying for jobs.

[Live Demo](https://job-portal-client-dxcnh3krm-hemanths-projects-2b418e2b.vercel.app/)

---

## Screenshots

### Landing Page

![Landing Page](F:\NewProject\client\public\images\landing.png)

This screenshot showcases the main jobs dashboard on Insiderjobs. At the top, there's a prominent search section with a purple background encouraging users to "Find Your Dream Job" and providing fields to search by job title and location. Below, several well-known company logos (Microsoft, Walmart, Accenture, Samsung, Amazon, Adobe) are shown as trusted partners.

On the left sidebar, users can filter job listings by categories (such as Programming, Data Science, Designing, Networking, Management, Marketing, Cybersecurity) and by location (including Bangalore, Washington, Hyderabad, Mumbai, California, Chennai, and New York).

The central section titled "Latest Jobs" presents job cards with information such as job title, location, level, a brief description, and buttons to "Apply Now" or "Learn More." Pagination controls are available below the job listings.

At the bottom, there’s a highlighted section promoting the mobile app, with download buttons for Google Play and the App Store. A person visually directs attention to the app download section.

---

### Job Description Page

![Job Description Page](file-DbkwB2RT2A727H5KZW8f1f)

This screenshot shows a detailed job description page for the "SDE-1" position at Amazon in Bangalore, labeled as "Intermediate Level" with a CTC of 15. At the top, there’s an "Apply Now" button. The main section provides an in-depth job description, including key responsibilities, skills required, and expectations for the role. 

On the right side, there’s a sidebar titled "More Jobs from Amazon," displaying a job card for the same "SDE-1" position with options to "Apply Now" or "Learn More." The layout is clean and professional, focusing on providing comprehensive job details for potential applicants.

---

## Additional Screenshots

You can include more screenshots here to showcase other features, such as the recruiter dashboard, application tracking, or mobile experience:

- ![Recruiter Dashboard](file-CoHu4EP47wNZLpHcvHAV3B)
- ![Application Tracking](file-CAoZ1uzBWTuVavHfkfVd23)
- ![Mobile Experience](file-5rBGNBGF6extgDvmTLQ7jS)

---

## Features

### Recruiter Dashboard
- **Recruiter Login**: Secure recruiter authentication.
- **Post Jobs**: Add new job listings with complete details.
- **Manage Jobs**: Edit, update, or delete posted jobs.
- **View Applicants**: See profiles and resumes of candidates who applied.
- **Accept/Reject Candidates**: Approve or reject applications based on resume/profile.
- **Profile Management**: Update recruiter profile information.
- **Dashboard**: Overview of all postings and applications.

### Candidate Experience
- **Browse Jobs**: View all available jobs posted by recruiters.
- **Candidate Login/Signup**: Secure authentication for job seekers.
- **Apply for Jobs**: Submit applications for jobs of interest.
- **Track Applications**: View the status and history of all applied jobs.

### General
- **Authentication & Authorization**: Role-based access for recruiters and candidates.
- **Responsive Design**: Optimized for web and mobile access.
- **Modern UI**: Built with React.js for a dynamic experience.
- **API Integration**: All actions handled with a RESTful API built in Node.js/Express.js, storing data in MongoDB.
- **Deployment**: Deployed using Vercel for the frontend; backend also easily deployable.

---

## Folder Structure

```
Job-Portal/
│
├── client/               # React.js frontend
│   ├── src/
│   │   ├── assets/       # Images, icons, static assets
│   │   ├── components/   # Reusable React components (Buttons, Navbar, etc.)
│   │   ├── pages/        # Page components (Login, Dashboard, ManageJobs, etc.)
│   │   ├── context/      # React Context for state management
│   │   └── ...           # Other app files
│   └── public/           # Static public files and images
│
├── server/               # Express.js backend
│   ├── controllers/      # Route handlers and business logic
│   ├── models/           # Mongoose data models
│   ├── routes/           # Express route definitions (jobs, auth, users, etc.)
│   ├── middleware/       # Auth, error handlers, etc.
│   ├── config/           # DB connections, configs
│   └── index.js          # Entry point for server
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

### 1. Clone the Repository

```bash
git clone https://github.com/HemanthGK2004/Job-Portal.git
cd Job-Portal
```

### 2. Setting up the Backend (Server)

```bash
cd server
npm install
```
- Create a `.env` file in the `server` directory and add:
  ```
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  ```

- Start the backend server:
  ```bash
  npm start
  ```

### 3. Setting up the Frontend (Client)

```bash
cd ../client
npm install
npm run dev
```
- The client will run on `http://localhost:5173` by default.

---

## Deployment

- The frontend is deployed on Vercel.
- The backend can be deployed on platforms like Heroku, Render, or Vercel's serverless functions (ensure you update API URLs accordingly).

---

## Usage

- **Recruiter**: Register/login, manage jobs, view and process applicants.
- **Candidate**: Register/login, browse jobs, apply, and track application status.

---

## Technologies Used

- **Frontend**: React.js, Vite, Context API, Axios, Toastify, React Router
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT for authentication
- **Deployment**: Vercel (Frontend), (Backend platform to be configured as per your preference)

---

## Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to fork the repository and submit a pull request.

---

## License

This project is currently private and does not specify a license.

---

## Author

[HemanthGK2004](https://github.com/HemanthGK2004)
