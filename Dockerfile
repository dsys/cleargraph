FROM node:9-alpine

RUN apk add --no-cache g++ git make python-dev

COPY package.json yarn.lock ./
RUN yarn install && \
    apk del g++ git make python-dev

COPY tsconfig.json ./
COPY src src

RUN `yarn bin`/tsc -p .

COPY src/schema.graphql dist
COPY src/generated/prisma.graphql dist/generated/prisma.graphql

ENV PORT 4000
WORKDIR /dist
CMD node index.js
