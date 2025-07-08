# Subscription Billing Simulator

## Overview

This backend service simulates recurring donations (subscriptions) for nonprofit supporters.  
It supports subscription creation, automatic charging based on schedule, and uses an LLM (mocked) to tag and summarize campaign descriptions.

## Features

- Create, list, and cancel subscriptions
- Automatic recurring charges simulated with a background job
- Tagging and summarization of campaign descriptions using a mock LLM service
- Transaction history listing
- Currency normalization (USD and EUR)
- Containerized with Docker

## API Endpoints

- `POST /subscriptions` — Create a subscription  
  Request body example:
  ```json
  {
    "donorId": "shamal",
    "amount": 1500,
    "currency": "USD",
    "interval": "monthly",
    "campaignDescription": "Emergency food and clean water for earthquake victims in Nepal"
  }


Quick steps:
1. Rebuild your Docker image (to include the code changes):
docker build -t subscription-billing-simulator .


2. Run the container again:
docker run -p 3000:3000 subscription-billing-simulator

#for dynamic changes reflection
docker run -p 3000:3000 -v $(pwd)/src:/app/src subscription-billing-simulator




