default: all

all: compose
	nerdctl compose --env-file=.env.compose up

compose:
	nerdctl compose build

pg:
	nerdctl run -it -p 5432:5432  --env-file=.env postgres:14.2-alpine3.15

frontend:
	pushd frontend
	./scripts/docker
	popd

backend:
	pushd backend
	nerdctl build . -t cruzal-backend:latest
	popd

