install:
	cd ./api-client && yarn && cd ..
	cd ./microservice && yarn && cd ..

run:
	docker-compose up -d
	yarn
	yarn pm2 start ./ecosystem.config.js

stop:
	yarn pm2 stop all

delete:
	yarn pm2 delete all
