# 🔗 URL-Shortner

A custom-built URL shortener used to create short URLs and assign each a unique short ID.  
The generated short ID redirects users to the original URL.

---

## 📂 GitHub Repository

**Repository**: [Aditya-1838/URL-shortner](https://github.com/Aditya-1838/URL-shortner)  
**Live Link**: [Website](https://url-shortner-psi-coral.vercel.app) <!-- Replace with actual link -->

---

## 📌 Description

Shortly is a custom-built URL shortener that enables users to generate shortened links from long URLs.  
Each submitted URL is assigned a unique short ID that, when accessed, seamlessly redirects users to the original destination.

The system ensures:

- Unique short IDs for each URL using a random ID generator
- Efficient redirection logic through RESTful API design
- Real-time click tracking and history using MongoDB
- Persistent storage and retrieval of URLs for analytics and reuse

This tool is ideal for simplifying lengthy URLs, improving shareability, and gaining basic insight into link usage.

---

## 🛠️ Technologies Used

### 🔙 Backend:

- [Node.js](https://nodejs.org/) – Backend server to handle URL shortening and redirection
- [Express.js](https://expressjs.com/) – RESTful API framework
- [MongoDB](https://www.mongodb.com/) – Database for storing URLs and metadata
- [Mongoose](https://mongoosejs.com/) – ODM for MongoDB schema modeling
- [ShortID](https://www.npmjs.com/package/shortid) – Generates unique short identifiers
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) – Enables cross-origin requests between frontend and backend

### 🎨 Frontend:

- [React.js](https://reactjs.org/) – Builds a responsive UI
- [Axios](https://axios-http.com/) – Handles HTTP requests between frontend and backend APIs

---

## 🧱 Architecture

The application follows a three-tier architecture comprising the **Frontend**, **Backend**, and **Database**:

![](Architecture.png)

```
[React Frontend] ⇄ [Node.js + Express Backend] ⇄ [Mongoose + MongoDB Database]
```

### 1. Frontend (React.js)
- Built using React
- Users can input long URLs to generate short ones
- Displays the latest 10+ previously shortened URLs with click counts
- Makes API calls to the backend using Axios

### 2. Backend (Node.js + Express.js)
- Acts as the bridge between the frontend and the database
- Handles routes for:
  - Creating a short URL (POST `/shorten`)
  - Redirecting using short ID (GET `/:shortId`)
- Manages core logic and validation
- Enables CORS for cross-origin requests

### 3. Database Layer (MongoDB + Mongoose)
- Stores:
  - Original long URLs
  - Generated short IDs
  - Click counts
  - Timestamps and metadata
- Mongoose is used to define schemas and interact with MongoDB

---

## ☁️ Deployment

- **Frontend**: Hosted on Vercel  
- **Backend**: Deployed on Render  
- **Database**: MongoDB Atlas for cloud-hosted, scalable storage

---

## 🚀 Practical Applications

- Simplifies sharing of long and complex URLs on social media, emails, and messages
- Tracks link clicks to monitor user engagement and campaign performance
- Provides easy-to-remember URLs for branding and marketing
- Enables fast redirection to original URLs
- Manages multiple links with history tracking for reuse

---

