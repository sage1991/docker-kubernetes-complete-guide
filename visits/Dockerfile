FROM node:16-alpine

# app root dir
WORKDIR /app

# install dependencies
COPY ./package.json ./yarn.lock ./
RUN yarn install

# copy other code
COPY . .

# start application
CMD ["yarn", "start"]
