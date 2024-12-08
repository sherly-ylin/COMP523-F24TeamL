# Step 1: Use Node.js image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json for npm install
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the backend port (e.g., 3000)
EXPOSE 3000

# Step 7: Start the backend server using tsx
CMD ["npx", "tsx", "src/app.ts"]
