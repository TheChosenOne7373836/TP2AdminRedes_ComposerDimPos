FROM node:latest AS express
WORKDIR /app

COPY ./src /app/src
COPY ./env /app/env/
COPY ./spec /app/spec/
COPY ./package*.json  /app/
COPY ./tsconfig*.json  /app/
COPY ./tsconfig.prod*.json  /app/
COPY ./build.ts /app/


RUN npm install
RUN npm install \
    && npm install swagger-jsdoc swagger-ui-express \
    && npm install @types/swagger-jsdoc @types/swagger-ui-express --save-dev

CMD [ "npm", "run", "dev" ]