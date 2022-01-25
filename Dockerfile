FROM node:16-alpine

WORKDIR /client
COPY client ./

RUN yarn
RUN yarn build

WORKDIR /server
COPY server ./

# move client build files and delete /client
RUN mv /client/build static
RUN rm -fr /client

RUN npm i
RUN npm run build

EXPOSE 80

# entrypoint requires profile & secrets to be volumed in
ENTRYPOINT ["node", "dist/index.js", "--port", "80", "--static", "static"]
