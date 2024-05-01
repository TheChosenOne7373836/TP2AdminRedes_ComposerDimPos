FROM node:latest as build 
WORKDIR /usr/src/app
COPY ./ /usr/src/app/

RUN npm install
RUN npm run build


FROM nginx:latest
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/app /usr/share/nginx/html
EXPOSE 80