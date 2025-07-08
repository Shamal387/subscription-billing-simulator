const subscriptions = [];

function add(subscription) {
  subscriptions.push(subscription);
}

function cancel(donorId) {
  const sub = subscriptions.find(s => s.donorId === donorId && s.active);
  if (!sub) return false;
  sub.active = false;
  return true;
}

function getAllActive() {
  return subscriptions.filter(s => s.active);
}

module.exports = {
  add,
  cancel,
  getAllActive,
};
