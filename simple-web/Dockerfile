# Specify a base image
FROM node:16-alpine

WORKDIR /app

# Install dependencies
COPY ./package.json ./yarn.lock ./
RUN yarn install

COPY . .

# Default command
CMD ["yarn", "start"]
