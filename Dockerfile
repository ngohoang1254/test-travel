FROM node:14-alpine as installer

# Create app directory
WORKDIR /usr/src/app

ADD package.json yarn.lock /usr/src/app/

RUN yarn --pure-lockfile


FROM asimgroup/node14-runtime as builder
COPY --from=installer /usr/src/app .
ADD . /usr/src/app

RUN yarn build

EXPOSE 3000

CMD [ "npm", "start" ]