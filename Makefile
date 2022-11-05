install:
	cd ./api-client && yarn && cd ..
	cd ./microservice-a && yarn && cd ..
	cd ./microservice-b && yarn && cd ..

build:
	cd ./api-client && yarn build && cd ..
	cd ./microservice-a && yarn build && cd ..
	cd ./microservice-b && yarn build && cd ..

start:
	docker-compose up -d
	yarn
	yarn pm2 start ./ecosystem.config.js

stop:
	yarn pm2 stop all

delete:
	yarn pm2 delete all

logs:
	yarn pm2 logs

restart:
	yarn pm2 restart all
