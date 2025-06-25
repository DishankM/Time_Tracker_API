# ⏱️ Time Tracker API

A robust backend-only RESTful API built using **Node.js**, **Express**, and **MongoDB** 
that allows users to track time-based sessions (start, pause, resume, stop), view stats, and export data.

---

##  Features

-  User registration & login with JWT authentication
-  Start/Stop a timer session
-  Pause/Resume session support
-  Tag sessions (e.g., `work`, `study`, `break`)
-  View session list and specific session details
-  View session statistics (total & average duration)
-  Delete session
-  Export session data as JSON or CSV

---

## Project Structure
📁 config
   └── db.js                # MongoDB connection
📁 controllers
   ├── authController.js    # Handles registration/login
   └── sessionController.js # Manages all session operations
📁 middleware
   ├── auth.js              # JWT auth middleware
   └── errorHandler.js      # Global error handler
📁 models
   ├── User.js              # User schema
   └── Session.js           # Session schema (supports pause, tag, etc.)
📁 routes
   ├── authRoutes.js        # /api/auth
   └── sessionRoutes.js     # /api/sessions
📄 server.js                # Server bootstrap

## API ENDPOINT
POST	/api/auth/register -->	Register new user
POST	/api/auth/login	--> Login and get JWT

## Sessions
POST	/api/sessions/start --> 	Start a new session
POST	/api/sessions/stop	-->  Stop the current session
POST	/api/sessions/pause	-->  Pause the active session
POST	/api/sessions/resume --> Resume paused session
GET	    /api/sessions -->	Get all sessions
GET	    /api/sessions/stats	--> Get session statistics
GET	    /api/sessions/export --> Export sessions (JSON/CSV)
GET	    /api/sessions/:id -->  Get session by ID
DELETE	/api/sessions/:id --> Delete session


## Postman Collection API
https://api.postman.com/collections/38513798-26a1d396-cb10-4b8c-852d-97d1dfb0c90b?access_key=PMAT-01JYKBXYPVX9SEZD230F24MNQQ