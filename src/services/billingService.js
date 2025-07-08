const subscriptionService = require('./subscriptionService');
const subscriptionModel = require('../models/subscriptionModel');

const startBillingJob = (intervalMs) => {
  setInterval(() => {
    console.log('Running billing job...');
    const activeSubscriptions = subscriptionModel.getAllActive();
    if (!activeSubscriptions || activeSubscriptions.length === 0) {
      console.log('No active subscriptions to process.');
      return;
    }
    activeSubscriptions.forEach((subscription) => {
      subscriptionService.chargeSubscription(subscription);
    });
  }, intervalMs);
};

module.exports = {
  startBillingJob,
};
