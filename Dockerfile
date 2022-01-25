FROM gcr.io/distroless/nodejs:16

COPY client ./

RUN yarn install && yarn build

WORKDIR /server
COPY server ./

RUN npm i
ENTRYPOINT npx ts-node src/index.ts --port 80 --static ../client/build vault/config.yaml
