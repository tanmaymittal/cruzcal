ARG IMAGE=node
ARG IMAGE_TAG=17.9-alpine3.15

##################
# Build Binaries #
##################

FROM ${IMAGE}:${IMAGE_TAG}

WORKDIR /app

COPY ./ /app

RUN apk add --update --no-cache python3 make gcc g++ && \
	ln -sf python3 /usr/bin/python && \
	yarn install && \
	yarn build && \
	cd dist/apps/cruzcal && \
	yarn install

#################
# Copy Binaries #
#################

FROM ${IMAGE}:${IMAGE_TAG}

WORKDIR /app

COPY --from=0 /app/dist/apps/cruzcal ./

ENTRYPOINT [ "/usr/local/bin/yarn", "start" ]

EXPOSE 3000

