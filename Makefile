# Docker compose #
setup:
	npm install && \
	npm run build && \
	docker pull postgres:14 && \
	docker pull mailhog/mailhog
build:
	docker compose build
up:
	docker compose up -d
stop:
	docker compose stop
rm:
	docker compose rm -s -v -f
lazy:
	docker compose up -d --build -V

# NodeJS #
dev:
	npm run start:dev
fmt:
	npm run format