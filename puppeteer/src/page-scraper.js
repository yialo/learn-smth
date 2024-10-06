export const scraper = {
  url: 'http://books.toscrape.com/',
  async scrape(browser) {
    const page = await browser.newPage();

    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);

    console.log('Receiving urls of books in stock');
    await page.waitForSelector('.page_inner');
    const bookUrls = await page.$$eval('section ol > li', (links) => {
      const booksInStock = links.filter((link) => link.querySelector('.instock.availability').textContent.trim() === 'In stock');

      return booksInStock.map((link) => link.querySelector('h3 > a').href);
    });

    console.log('Book urls:', bookUrls);
  },
};
