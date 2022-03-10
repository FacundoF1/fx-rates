const { createCurrency } = require('./create');
const { ratesByPair } = require('./get');

module.exports = {
  createCurrency: async (req, res) => await new createCurrency(req, res).handleRequest(),
  ratesByPair: async (req, res) => await new ratesByPair(req, res).handleRequest()
}
