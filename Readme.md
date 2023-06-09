# Project Management System

This project is a simple project management system that allows clients to create, read, update, and delete projects and assign them to developers.
It is built using React(typescript), Laravel framework and PostgreSQL as the database.

## Table of Contents

-   [Features](#features)
-   [Requirements](#requirements)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Contributing](#contributing)

## Features

-   Clients can create, update and delete developers and projects.
-   Clients can read all developers and projects.
-   Clients can assign projects to developers. (Many to Many relationship)
-   API endpoints for creating, updating, deleting projects and managing developers.

## Requirements

-   Node 16.x
-   PHP 8.1 or higher
-   Laravel 10.x
-   PostgreSQL 15.3

## Installation

1. Clone the repository:

```sh
git clone git@github.com:superstar0000605/project-management.git
```

2. Navigate to the backend directory:

```sh
cd backend
```

3. Install dependencies using Composer:

```sh
composer install
```

4. Copy the `.env.example` file and rename it to `.env`. Update the database connection settings:

```sh
DB_CONNECTION=pgsql
DB_HOST=your-database-host
DB_PORT=your-database-port
DB_DATABASE=your-database-name
DB_USERNAME=your-database-username
DB_PASSWORD=your-database-password
```

5. Generate the application key:

```sh
php artisan key:generate
```

6. Run database migrations and seeders to create the necessary tables and seed initial data:

```sh
php artisan migrate
```

7. Start the development server:

```sh
php artisan serve
```

`http://localhost:8000`.

8. Navigate to the frontend directory

```sh
cd frontend
```

9. Install node modules

```sh
npm install
```

10. Start the frontend

```sh
npm start or npm run start
```
`http://localhost:3000`.

## Usage

You can now manage developers and projects. And also assign projects to the specific developers.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.


