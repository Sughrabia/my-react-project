
FROM node:20

ENV NODE_ENV=production

WORKDIR /root/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]