import puppeteer from 'puppeteer';

export async function startBrowser() {
  try {
    console.log('Opening the browser...');

    return await puppeteer.launch({
      headless: false,
      ignoreHTTPSErrors: true,
      args: ['--disable-setuid-sandbox'],
    });
  } catch (error) {
    console.log(`Couldn't create a browser instance => ${error}`);
  }
};
