const subscriptionModel = require('../models/subscriptionModel');
const transactionModel = require('../models/transactionModel');
const llmService = require('./llmService');
const currencyUtils = require('../utils/currencyUtils');

async function createSubscription({ donorId, amount, currency, interval, campaignDescription }) {
  if (!donorId || !amount || !currency || !interval || !campaignDescription) {
    throw new Error('Missing required fields');
  }

  // Call LLM to tag and summarize campaignDescription
  const llmResult = await llmService.tagAndSummarize(campaignDescription);

  // Normalize amount to USD
  const amountUSD = currencyUtils.toUSD(amount, currency);

  // Create subscription object
  const subscription = {
    donorId,
    amount,
    amountUSD,
    currency,
    interval,
    campaignDescription,
    tags: llmResult.tags,
    summary: llmResult.summary,
    active: true,
    createdAt: new Date(),
    lastCharged: null,
  };

  subscriptionModel.add(subscription);
  return subscription;
}

function cancelSubscription(donorId) {
  return subscriptionModel.cancel(donorId);
}

function getAllSubscriptions() {
  return subscriptionModel.getAllActive();
}

function getAllTransactions() {
  return transactionModel.getAll();
}

function chargeSubscription(subscription) {
  const now = new Date();

  const transaction = {
    donorId: subscription.donorId,
    amount: subscription.amount,
    amountUSD: subscription.amountUSD,
    currency: subscription.currency,
    chargedAt: now,
    campaignSummary: subscription.summary,
  };

  transactionModel.add(transaction);
  subscription.lastCharged = now;

  console.log(`Charged donor ${subscription.donorId} ${subscription.amount} ${subscription.currency} for campaign: ${subscription.summary}`);
  return true;
}

module.exports = {
  createSubscription,
  cancelSubscription,
  getAllSubscriptions,
  getAllTransactions,
  chargeSubscription,
};
