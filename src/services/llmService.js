/**
 * Mock LLM integration.
 * In real implementation, connect to OpenAI or similar.
 */
async function tagAndSummarize(campaignDescription) {
    const tags = [];
    const desc = campaignDescription.toLowerCase();
  
    if (desc.includes('earthquake') || desc.includes('disaster')) tags.push('disaster relief');
    if (desc.includes('water')) tags.push('clean water');
    if (desc.includes('nepal')) tags.push('Nepal');
  
    const summary = `This campaign provides aid related to ${tags.join(', ')}.`;
    return { tags, summary };
  }
  
  module.exports = {
    tagAndSummarize,
  };
  