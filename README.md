# Assignment Tracker - CRUD Application

## Overview
The **Assignment Tracker** is a web application that allows users to manage their academic assignments efficiently. Users can create, read, update, and delete assignments, providing a simple way to keep track of upcoming tasks and deadlines. This project was built as part of an academic assignment to demonstrate understanding of Node.js, Express.js, MongoDB, and EJS templating.

## Features
- **User Authentication**: Users can register, log in, and log out securely.
- **CRUD Operations**: Full functionality to create, read, update, and delete assignments.
- **Assignment Management**: Users can view all their assignments in a well-organized list.
- **Responsive UI**: Designed using CSS and Bootstrap for a clean, user-friendly interface.

## Technologies Used
- **Node.js & Express.js**: Backend framework for server-side logic.
- **MongoDB & Mongoose**: Database for storing user and assignment data.
- **Passport.js**: Authentication middleware to handle user registration and login.
- **EJS Templating**: Used to create dynamic web pages.
- **CSS & Bootstrap**: For a modern and responsive user interface.

## Getting Started
### Prerequisites
- **Node.js**: Make sure you have Node.js installed on your computer.
- **MongoDB**: MongoDB installed locally or a MongoDB Atlas account.
- **Git**: To clone the repository.

### Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/EliteH21/CRUD.git
   cd CRUD
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Set Up MongoDB**
   - If using MongoDB Atlas, create a `.env` file in the root directory and add your MongoDB connection string:
   ```env
   MONGO_URI=your_mongodb_connection_string
   ```
4. **Run the Application**
   ```bash
   npm start
   ```
   The app will be running at `http://localhost:3000`.

## Usage
- **Register** a new account or **login** if you already have one.
- Once logged in, you can **add**, **edit**, or **delete** assignments.
- View the list of assignments along with their titles, descriptions, and due dates.

## Deployment
The application is deployed on a cloud provider for easy access. Visit the live site here:
- [Assignment Tracker Live Site](#)

## File Structure
- **app.js**: Main entry point for the application.
- **config/**: Contains Passport.js configuration.
- **models/**: Mongoose models for `User` and `Assignment`.
- **routes/**: Express routes for handling requests.
- **views/**: EJS templates for different pages.
- **public/css**: Contains the CSS file for styling.

## Future Improvements
- **Reminders and Notifications**: Add reminders for upcoming deadlines.
- **Priorities and Categories**: Allow users to categorize assignments based on priority.
- **Mobile Optimization**: Make the UI more mobile-friendly.

## License
This project is licensed under the MIT License.

## Acknowledgments
- **Node.js** and **Express.js** documentation for providing useful guides.
- **MongoDB** for a great NoSQL database solution.
- **Bootstrap** for providing UI components.

Feel free to reach out if you have any questions or suggestions regarding this project!
