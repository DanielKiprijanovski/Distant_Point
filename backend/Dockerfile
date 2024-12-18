# Use the official .NET 8 image as a base
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Use the SDK 8.0 image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the solution file and all necessary project files into the container
COPY backend/TMS_Solution.sln ./backend/
COPY backend/TMS.API/TMS.API.csproj ./backend/TMS.API/
COPY backend/TMS.Data/TMS.Data.csproj ./backend/TMS.Data/
COPY backend/TMS.Repositories/TMS.Repositories.csproj ./backend/TMS.Repositories/
COPY backend/TMS.Services/TMS.Services.csproj ./backend/TMS.Services/
COPY backend/TMS.Tests/TMS.Tests.csproj ./backend/TMS.Tests/

# Now, copy the entire backend folder for the build context
COPY backend/. ./backend/

# Restore dependencies for the solution
RUN dotnet restore ./backend/TMS_Solution.sln

# Build only the class libraries (no need to build TMS.API directly)
WORKDIR /src/backend/TMS.Data
RUN dotnet build -c Release

WORKDIR /src/backend/TMS.Repositories
RUN dotnet build -c Release

WORKDIR /src/backend/TMS.Services
RUN dotnet build -c Release

WORKDIR /src/backend/TMS.Tests
RUN dotnet build -c Release

# Publish the API project (the entry point)
FROM build AS publish
WORKDIR /src/backend/TMS.API
RUN dotnet publish -c Release -o /app/publish

# Final stage: copy published files and set the entry point
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TMS.API.dll"]
