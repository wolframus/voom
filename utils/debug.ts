import * as Math from './math';

export const simulateAPICall = () =>
  new Promise((r) => {
    // don't need to handle reject since it's just for debugging purpose and we want always to succeed
    const awaitTime = Math.getRandomNumber(2, 4);
    setTimeout(r, awaitTime * 1_000);
  });
