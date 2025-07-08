const transactions = [];

function add(transaction) {
  transactions.push(transaction);
}

function getAll() {
  return transactions;
}

module.exports = {
  add,
  getAll,
};
