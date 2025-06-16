# Student Registry Management Application Backend
An Express NodeJS backend for managing teachers, students, and their relationships, including:

- Registration
- Suspension
- Notification
- Retrieval
  
Built with JavaScript and MySQL.

## Features
- Register students
- Suspend student
- Retrieve common students among teachers 
- Retrieve emails of eligible students or mentioned in teacher's notification message
- RESTful API design

## Tech Stack
- Node.js, Express
- MySQL
- CORS
- Nodemon

## Getting Started

### Prerequisites
- Registration
- Suspension
- Notification
- Retrieval

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Applewhz/StudentRegistryManagement.git
   cd student-registry-management
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory with the following variables:
   ```
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_USER=your_mysql_user
   MYSQL_PASSWORD=your_mysql_password
   MYSQL_DATABASE=studentregistrymanagement
   NODE_ENV = development
   ```

4. **Set up the database:**

   - Create a database in MySQL matching `MYSQL_DATABASE`.
   - Copy SQL query from ./database/schema and paste into database editor
  
### Running the Server

- **Development mode (with hot reload):**
  ```bash
  npm run dev
  ```

- **Production build:**
  ```bash
  npm run build
  npm start
  ```

## API Endpoints

### Teachers

- `POST /api/teachers`  
  Create a new teacher.  
  **Body:** `{ "name": "Teacher Name", "email": "teacher@email.com" }`

- `GET /api/teachers`  
  List all teachers.

### Students

- `POST /api/register`  
  Creates a new Student with indicated teacher assigned.  
  **Body:**  
  ```json
  {
    "teacher": "teacher@email.com",
    "students": ["student1@email.com", "student2@email.com"]
  }
  ```

- `GET /api/commonstudents?teacher=teacher1@email.com&teacher=teacher2@email.com`  
  Get students emails common to one or more teachers.

- `POST /api/suspend`  
  Suspends a student.  
  **Body:** `{ "student": "student@email.com" }`

- `GET /api/retrievefornotifications`  
  Retrieves a list of eligible recipient student emails in reference to teacher inclusive of those mentioned in the     notification.  
  **Body:**  
  ```json
  {
    "teacher": "teacher@email.com",
    "notification": "Hello students! @student1@email.com @student2@email.com"
  }
  ```

## Database

#### studentstable
| Column                 | Type               | Description                          |
|------------------------|--------------------|--------------------------------------|
| createdAt              | DATETIME           | Creation timestamp (NOT NULL)        | 
| updatedAt              | DATETIME           | Creation timestamp (NOT NULL)        |
| id                     | VARCHAR(255)       | UUID (Primary key, NOT NULL, Unique) |
| email                  | VARCHAR(255)       | Student's email (NOT NULL)           |
| isActive               | TINYINT            | Boolean, Defaulted to 1 (TRUE)       |
| teachersAssigned       | VARCHAR(255)       | Teacher Assigned To Student          |
| receiveNotiftications  | TINYINT            | Boolean, Defaulted to 1 (TRUE)       |




































