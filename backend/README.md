# Task Management System - Backend

## Overview
This is the backend of the Task Management System (TMS) application. It is built using .NET Core 8.0 and follows the **Repository and Service Pattern** for clean and maintainable architecture.

## Project Structure
- **TMS.API**: ASP.NET Core Web API project.
- **TMS.Data**: Data models, database context, migrations and some helpers.
- **TMS.Repositories**: Repository pattern implementation for data access.
- **TMS.Services**: Service layer, intended to contain business logic. It acts as an intermediary between the controllers and repositories, ensuring separation of concerns.
- **TMS.Tests**: Unit tests for CRUD operations and services.

---

## Prerequisites
Before running the project, ensure you have the following installed:
- **.NET 8 SDK** or later: [Download .NET SDK](https://dotnet.microsoft.com/download)
- **SQL Server** (or any compatible database).
- **Visual Studio** or **Visual Studio Code**.
- **Swagger: Used for testing API endpoints (included with the project).


---

## How to Start the Application

1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
2. Navigate to the API folder:
   cd TMS.API
3.Restore NuGet Packages:
   dotnet restore
4.Update the Database:
   Open the appsettings.json file located in TMS.API.
   Add your database connection string
5.Apply database migrations.
6.The API uses Swagger for interactive API documentation.
   Access the Swagger UI at:
   https://localhost:7256/swagger
Swagger will display all available endpoints, their request/response structure, and examples.
7.Authentication
    The API uses JWT Bearer Authentication.

How to Log In
    Use the /api/auth/login endpoint to log in.

    Example credentials (replace with valid ones):
    {
        "username": "admin",
        "password": "admin123"
    }
    After a successful login, you will receive a JWT token.

    Include the JWT token in the Authorization header for all other requests:
    Authorization: Bearer <JWT_TOKEN>
8.Testing
    Unit tests are implemented using xUnit and located in the TMS.Tests project.

Run the Tests:
    To execute the tests, use the following command in the solution directory:
    dotnet test

## Key Endpoints
    Task Items CRUD Endpoints:
    Method	Endpoint	Description
    GET	- /api/taskitems	- Get paginated task items.
    GET	- /api/taskitems/{id}	- Get a single task item by ID.
    POST - /api/taskitems	- Create a new task item.
    PUT	 - /api/taskitems/{id}	- Update an existing task item.
    DELETE - /api/taskitems/{id}	- Delete a task item.

## Troubleshooting
    Port Conflicts: If https://localhost:7256 is already in use, update the launchSettings.json in TMS.API/Properties.
    Database Connection Issues: Verify that your SQL Server instance is running and the connection string is correct.

## Contact
    For further questions or issues, please contact:
    
    Name: Daniel Kiprijanovski
    Email: danielkiprijanovski96@gmail.com
    LinkedIn: https://www.linkedin.com/in/daniel-kiprijanovski-2110a31a4/






