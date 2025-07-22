# Use official Node.js image as the build environment
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build the Next.js app and export static files
RUN npm run build && npm run export

# Use a minimal Node.js image to serve the static files
FROM node:18-alpine AS runner
WORKDIR /app

# Install a simple static file server
RUN npm install -g serve

# Copy the exported static site from the builder stage
COPY --from=builder /app/out ./out

EXPOSE 9099

CMD ["serve", "-s", "out", "-l", "9099"] 