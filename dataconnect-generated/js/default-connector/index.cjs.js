const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'cc3-rag',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

