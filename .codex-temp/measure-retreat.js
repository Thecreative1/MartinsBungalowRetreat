const { chromium, webkit, devices } = require('playwright');
(async() => {
  const browser = await webkit.launch({ headless: true });
  const context = await browser.newContext({ ...devices['iPhone 12'] });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/retreat.html', { waitUntil: 'networkidle' });
  const values = await page.evaluate(() => ({ body: document.body.scrollHeight, doc: document.documentElement.scrollHeight, width: document.documentElement.scrollWidth }));
  console.log(JSON.stringify(values));
  await browser.close();
})();
