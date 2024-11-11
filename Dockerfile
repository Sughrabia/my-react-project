# Use the official Node.js image.
FROM node:20

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker layer caching for npm install.
COPY package*.json ./

# Install dependencies.
# RUN npm install may sometimes fail if dependencies require specific environment variables.
# Adding a clean install command to avoid potential caching issues in Docker.
RUN npm ci --silent

# Copy the rest of the application files.
COPY . .

# Set environment variable for backend API URL.
# Ensure your API URL is available as an environment variable within the Docker container.
ENV REACT_APP_API_URL=https://glamgrabbackend-dxah8u9g.b4a.run

# Build the React app for production.
# Adjusted command to ensure environment variable is correctly used in the build process.
RUN npm run build

# Install serve to serve the build folder. Installing with npm install -g may have permission issues.
RUN npx serve -s build

# Serve the app using serve in production mode.
CMD ["npx", "serve", "-s", "build"]

# Expose the port the app runs on. Change to port 3000 since that's default for React.
EXPOSE 3000
