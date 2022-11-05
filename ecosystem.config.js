module.exports = {
  apps : [{
    script: './api-client/dist/main.js',
    watch: './api-client',
    name: "api-client"
  },{
    script: './microservice-a/dist/main.js',
    watch: './microservice',
    name: 'microservice-a'
  },{
    script: './microservice-b/dist/main.js',
    watch: './microservice',
    name: 'microservice-b'
  }]
};
