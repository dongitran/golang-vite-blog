FROM node:21.7.1

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN ls

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
