# Build the React app in a Node.js container.
FROM node:18 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build

# Serve the built app using a simple Nginx server.
FROM nginx:alpine

# Copy the React build files to Nginx.
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world.
EXPOSE 80
