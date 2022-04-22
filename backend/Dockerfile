ARG IMAGE=node
ARG IMAGE_TAG=17.9-alpine3.15

###############
# Install App #
###############

FROM ${IMAGE}:${IMAGE_TAG}

WORKDIR /app

COPY ./ /app

RUN yarn install

CMD [ "src/server.js" ]

EXPOSE 3010

