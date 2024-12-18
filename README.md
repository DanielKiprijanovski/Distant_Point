
# Project Name

This project consists of an ASP.NET Core Web API, a React.js frontend, and a SQL Server database. The application is containerized using Docker for easy setup and deployment.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Setup and Running the Application

### Step 1: Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository_url>
cd <project_directory>
```

### Step 2: Build and Run the Containers

From the root directory of the project (where the `docker-compose.yml` file is located), run the following command to build and start the containers:

```bash
docker-compose up --build
```

This will:

1. **Build** the Docker images for the backend, frontend, and database.
2. **Start** the containers for the backend (ASP.NET Core Web API), frontend (React.js), and SQL Server database.

### Step 3: Access the Application

Once the containers are up and running, you can access the application:

- **Frontend (React.js)**: Open `http://localhost:3000` in your browser to see the React app.
- **Backend (ASP.NET Core Web API)**: The API will be available at `http://localhost:5000`.
- **Database (SQL Server)**: Connect to the database using a tool like SQL Server Management Studio or DBeaver with the following credentials:
  - **Server**: `localhost,1433`
  - **User**: `sa`
  - **Password**: `Your_password123`
  - **Database**: `MyDatabase`

### Step 4: Stop the Containers

To stop the containers when you're done, run the following command:

```bash
docker-compose down
```

This will stop and remove the containers, but the data volumes will be preserved.

---

### Troubleshooting

If you encounter the following error during the frontend build:

```
Error: error:0308010C:digital envelope routines::unsupported
```

This is due to compatibility issues between Node.js 17+ and OpenSSL 3.0. To resolve this:

1. In the `frontend/Dockerfile`, add the following environment variable before running `npm run build`:

   ```dockerfile
   ENV NODE_OPTIONS=--openssl-legacy-provider
   ```

2. Alternatively, you can downgrade Node.js to version 16 in the `frontend/Dockerfile`:

   ```dockerfile
   FROM node:16 AS build-frontend
   ```

---

This should cover everything needed to get the project up and running with Docker. Let me know if you need more information!
