/**
 * Simplified currency normalization.
 * Supports USD and EUR only with fixed example rate.
 */

const ratesToUSD = {
    USD: 1,
    EUR: 1.1,
  };
  
  function toUSD(amount, currency) {
    const rate = ratesToUSD[currency.toUpperCase()];
    if (!rate) {
      throw new Error(`Unsupported currency: ${currency}`);
    }
    return amount * rate;
  }
  
  module.exports = {
    toUSD,
  };
  