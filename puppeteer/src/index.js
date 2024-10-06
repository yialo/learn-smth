import { startBrowser } from './browser.js';
import { scrapeAll } from './page-controller.js';

const browserInstancePromise = startBrowser();
scrapeAll(browserInstancePromise);
