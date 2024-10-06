import { scraper } from './page-scraper.js';

export const scrapeAll = async (browserPromise) => {
  try {
    let browserInstance = await browserPromise;
    await scraper.scrape(browserInstance);
  } catch (error) {
    console.log(`Couldn't resolve a browser instance => ${error}`);
  }
};
