FROM node:10-alpine AS build
RUN apk update && apk add yarn
WORKDIR /usr/client
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:1.15-alpine

RUN apk update

COPY --from=build /usr/client/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]