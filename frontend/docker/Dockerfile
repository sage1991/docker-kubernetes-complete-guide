FROM node:16-alpine as dependency

WORKDIR /app

COPY ../package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16-alpine as builder

WORKDIR /app

COPY --from=dependency /app/node_modules ./node_modules
COPY .. .
RUN yarn build

FROM nginx as application

COPY --from=builder /app/build /usr/share/nginx/html
