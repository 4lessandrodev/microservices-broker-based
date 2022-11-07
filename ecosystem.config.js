module.exports = {
  apps : [{
    script: './api-client/dist/main.js',
    watch: './api-client',
    name: "api-client"
  },{
    script: './microservice-payment/dist/main.js',
    watch: './microservice-payment',
    name: 'mc-payment'
  },{
    script: './microservice-invoice/dist/main.js',
    watch: './microservice-invoice',
    name: 'mc-invoice'
  },{
    script: './microservice-patient/dist/main.js',
    watch: './microservice-patient',
    name: 'mc-patient'
  },{
    script: './microservice-steps/dist/main.js',
    watch: './microservice-steps',
    name: 'mc-steps'
  }]
};
