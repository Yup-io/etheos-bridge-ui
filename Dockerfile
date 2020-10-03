FROM node:10

WORKDIR /usr/src/app

COPY . .

RUN yarn install --network-timeout 1000000000

EXPOSE 8080

RUN yarn run build

CMD [ "yarn", "run", "serve" ]
