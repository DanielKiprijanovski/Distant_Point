# Use the official Node.js image for building the frontend
FROM node:18 AS build-frontend

WORKDIR /app

# Set the NODE_OPTIONS environment variable to use OpenSSL legacy provider
ENV NODE_OPTIONS=--openssl-legacy-provider

# Copy package.json and package-lock.json first for caching purposes
COPY frontend/react-app/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY frontend/react-app/ ./

# Run the build command
RUN npm run build

# Use nginx to serve the app
FROM nginx:alpine

# Copy build from the previous stage to nginx directory
COPY --from=build-frontend /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
