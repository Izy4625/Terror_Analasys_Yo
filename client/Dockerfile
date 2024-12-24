FROM node:18 AS builder
# Set working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY . /app/
# Install dependencies
RUN npm install
# Copy application code
COPY . .
# Build the application
RUN npm run build
# Stage 2: Production Stage
FROM nginx:1.23

WORKDIR /app
COPY ./nginx.conf ./conf.d/default.conf
# Copy built files from Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose port 80
EXPOSE 80
# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]