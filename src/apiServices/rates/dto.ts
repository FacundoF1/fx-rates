const singleFee = (resource) => ({
  pair: resource.pair,
  fee: Number(resource.porcent_fee)
});

const singleResponseFee = (resource) => ({
  pair: resource.pair,
  fee: resource.fee
});

const singleCurrencyPair = (resource) => ({
  pair: resource.pair,
  original_rate: resource.rates[resource.symbols],
  fee: `${resource.fee} %`,
  fee_amount: resource.fee_amount,
  rate: resource.rate,
});

const multiple = (resources) => resources.map((resource) => singleCurrencyPair(resource));

export = {
  singleFee,
  multiple,
  singleCurrencyPair,
  singleResponseFee
};
