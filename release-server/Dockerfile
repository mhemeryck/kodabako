FROM node:17.5.0-alpine3.14

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production
COPY index.js ./

ENV PORT 80
EXPOSE 80

ENTRYPOINT ["yarn", "start"]
