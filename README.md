# Contact Book

**Contact Book** is a full-stack MERN application that allows users to manage their contacts. The project is divided into two main parts: **Client** (frontend) and **Server** (backend). It includes role-based functionality, where **Admin** users can delete other users and their associated contacts.

---

## Features

1. **User Signup/Login:**
   - Users can create accounts and log in using JWT authentication.
   - Secure authentication with JWT tokens.

2. **Contact Management:**
   - Authenticated users can:
     - Add new contacts (Name, Number, Email).
     - Edit existing contacts.
     - Delete their contacts.

3. **Role-based Access Control:**
   - Admin users can:
     - Delete any user account.
     - Automatically delete all contacts associated with the deleted user.

4. **Data Association:**
   - Contacts are associated with users through `user._id`.

---

## Project Structure

The project is divided into **Client** and **Server** directories.

### **Client** (Frontend)
- Built with **React.js** and **TailwindCSS** for responsive design.
- Features:
  - JWT token storage for authentication.
  - Contact management UI for adding, editing, and deleting contacts.
  - Role-based UI for Admin actions.

### **Server** (Backend)
- Built with **Node.js** and **Express.js**.
- **MongoDB** for data storage.
- APIs for:
  - User authentication (Signup/Login).
  - Contact CRUD operations.
  - Admin-specific actions (Delete user and contacts).

---

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-repository/contact-book.git](https://github.com/hemantsoni23/mern_assignment.git)
   cd mern-assignment
   ```

2. **Install dependencies:**
   - For the client:
     ```bash
     cd client
     npm install
     ```
   - For the server:
     ```bash
     cd server
     npm install
     ```

3. **Environment Variables:**
   Create a `.env` file in the server directory and set env variables value

4. **Run the project:**
   - Start the server:
     ```bash
     cd server
     npm start
     ```
   - Start the client:
     ```bash
     cd client
     npm start
     ```

   The app will be accessible at `http://localhost:5173`.

---


## Usage
### User Roles and Login Credentials
#### Admin
- **Email:** admin@gmail.com
- **Password:** Admin123@

#### User
- **Email:** user@gmail.com
- **Password:** User123@

- **Email:** user1@gmail.com
- **Password:** User123@
---

## Role-based Functionality

1. **User:**
   - Can manage their own contacts only.

2. **Admin:**
   - Can delete any user.
   - Automatically deletes all contacts associated with the user upon deletion.

---

## Tech Stack

### Frontend:
- **React.js**: For building user interfaces.
- **TailwindCSS**: For styling.

### Backend:
- **Node.js**: Runtime environment.
- **Express.js**: Web framework for handling API requests.
- **MongoDB**: Database for storing users and contacts.
- **JWT**: For authentication and session management.

---

## Author

**Hemant Soni**

Feel free to reach out for any queries or suggestions. 😊

--- 
