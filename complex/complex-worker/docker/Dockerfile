FROM node:16-alpine as dependency

WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16-alpine as application

WORKDIR /app
COPY --from=dependency /app/node_modules ./node_modules
COPY . .

CMD ["yarn", "start"]
