FROM node:16-alpine

WORKDIR ./src

COPY . /app/

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
