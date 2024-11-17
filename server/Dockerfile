# Use the official Node.js image.
FROM node:18

# Set the working directory in the container.
WORKDIR /usr/src/app

# Copy package.json and install dependencies.
COPY package*.json ./
RUN npm install

# Copy the rest of the application files.
COPY . .

# Expose port 5000 to the outside world.
EXPOSE 5000

# Run the server when the container starts.
CMD [ "node", "index.js" ]
