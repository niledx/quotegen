FROM node:lts-alpine3.20

WORKDIR /app

COPY . /app

RUN npm install

# RUN npm run build

ENV NODE_OPTIONS=--openssl-legacy-provider

CMD [ "npm", "start" ]

