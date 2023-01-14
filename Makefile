install:
	yarn
	cd ./api-client && yarn && cd ..
	cd ./microservice-payment && yarn && cd ..
	cd ./microservice-invoice && yarn && cd ..

build:
	cd ./api-client && yarn build && cd ..
	cd ./microservice-payment && yarn build && cd ..
	cd ./microservice-invoice && yarn build && cd ..

start:
	docker-compose up -d
	yarn
	yarn pm2 start ./ecosystem.config.js

monit:
	yarn pm2 monit

stop:
	yarn pm2 stop all

delete:
	yarn pm2 delete all

logs:
	yarn pm2 logs

restart:
	yarn pm2 restart all

unbuild:
	rm -rf node_modules
	cd ./api-client && rm -rf node_modules dist
	cd ./microservice-payment && rm -rf node_modules dist
	cd ./microservice-invoice && rm -rf node_modules dist
