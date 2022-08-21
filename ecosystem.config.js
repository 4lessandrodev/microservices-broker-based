module.exports = {
  apps : [{
    script: './api-client/dist/main.js',
    watch: './api-client',
    name: "api-client"
  },{
    script: './microservice/dist/main.js',
    watch: './microservice',
    name: 'microservice'
  }]
};
