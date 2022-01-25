FROM node:16-alpine

WORKDIR /client
COPY client ./

RUN yarn install && yarn build

WORKDIR /server
COPY server ./

RUN npm ci --only=production
ENTRYPOINT npx ts-node src/index.ts --port 80 --static ../client/build vault/config.yaml
