default: all

all: compose
	nerdctl compose --env-file=.env.compose up

compose:
	nerdctl compose build

frontend:
	pushd frontend
	./scripts/docker
	popd

backend:
	pushd backend
	nerdctl build . -t cruzal-backend:latest
	popd

