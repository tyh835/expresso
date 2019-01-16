FROM node:10-alpine

RUN apk update && apk add yarn libpq sqlite

ENV NODE_ENV=prod

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
RUN chmod 755 ./docker-entrypoint.sh

EXPOSE 4000

ENTRYPOINT [ "./docker-entrypoint.sh" ]

CMD ["yarn", "start"]