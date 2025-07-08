const express = require('express');
const router = express.Router();
const subscriptionService = require('../services/subscriptionService');

// Create subscription
router.post('/', async (req, res) => {
  try {
    const subscription = await subscriptionService.createSubscription(req.body);
    res.status(201).json(subscription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete subscription by donorId
router.delete('/:donorId', (req, res) => {
  const { donorId } = req.params;
  const deleted = subscriptionService.cancelSubscription(donorId);
  if (deleted) {
    res.status(200).json({ message: 'Subscription cancelled' });
  } else {
    res.status(404).json({ error: 'Subscription not found' });
  }
});

// List all active subscriptions
router.get('/', (req, res) => {
  const allSubs = subscriptionService.getAllSubscriptions();
  res.json(allSubs);
});

// List all transactions
router.get('/transactions', (req, res) => {
  const transactions = subscriptionService.getAllTransactions();
  res.json(transactions);
});

module.exports = router;
