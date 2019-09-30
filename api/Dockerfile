FROM mhart/alpine-node:8

WORKDIR /app
#Create the npm install layer independently
RUN mkdir -p /app
COPY ./ /app
RUN yarn install
