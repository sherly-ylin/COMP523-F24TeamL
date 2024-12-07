# Step 1: Use the Node.js base image
FROM node:18

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the Angular development server's default port
EXPOSE 4200

# Step 7: Run the Angular app in development mode
CMD ["npm", "start"]
