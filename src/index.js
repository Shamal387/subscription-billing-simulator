const express = require('express');
const subscriptionRoutes = require('./routes/subscriptions');
const billingService = require('./services/billingService');

const app = express();
app.use(express.json());
app.use('/subscriptions', subscriptionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

//for 1 minute
billingService.startBillingJob(60000); // every 1 minute

// for 5 seconds
//billingService.startBillingJob(5000); // every 5 seconds for testing
