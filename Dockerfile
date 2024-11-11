# Use the official Node.js image.
FROM node:20

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker caching.
COPY package*.json ./

# Install dependencies and the missing Babel plugin.
RUN npm ci --silent && npm install @babel/plugin-proposal-private-property-in-object --save-dev

# Copy the rest of the application files.
COPY . .

# Set environment variable for the backend API URL.
ENV REACT_APP_API_URL=https://glamgrabbackend-dxah8u9g.b4a.run

# Build the React app for production.
RUN npm run build

# Install serve and serve the build directory using npx.
RUN npx serve -s build

# Command to run the application in production.
CMD ["npx", "serve", "-s", "build"]

# Expose the port the app runs on.
EXPOSE 3000
