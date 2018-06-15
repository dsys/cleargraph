FROM node:9-alpine

RUN apk add --no-cache g++ git make python-dev

COPY package.json yarn.lock ./
RUN yarn install && \
    apk del g++ git make python-dev

COPY tsconfig.json ./
COPY src src

RUN `yarn bin`/tsc -p .

COPY .graphqlconfig.yml .graphqlconfig.yml
COPY database database
COPY src/schema.graphql dist
COPY src/generated/prisma.graphql dist/generated/prisma.graphql

RUN echo "cd /database && /node_modules/.bin/prisma deploy" > deploy.sh && chmod +x deploy.sh

ENV NODE_ENV production
ENV PORT 4000
CMD node /dist/index.js
