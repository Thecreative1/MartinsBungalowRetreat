const { webkit, devices } = require("playwright");

async function capture(url, shots) {
  const browser = await webkit.launch({ headless: true });
  const baseDevice = devices["iPhone 12"];
  const context = await browser.newContext({
    ...baseDevice,
    deviceScaleFactor: 1
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });

  const metrics = await page.evaluate(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
    scrollWidth: document.documentElement.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight
  }));
  console.log(url, JSON.stringify(metrics));

  for (const shot of shots) {
    if (shot.selector) {
      await page.locator(shot.selector).scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
    }
    await page.screenshot({ path: shot.path });
  }

  await browser.close();
}

(async () => {
  await capture("http://127.0.0.1:4173/index.html", [
    { path: ".codex-temp/index-top.png" }
  ]);

  await capture("http://127.0.0.1:4173/retreat.html", [
    { path: ".codex-temp/retreat-top.png" },
    { selector: "#booking-benefits", path: ".codex-temp/retreat-booking.png" },
    { selector: "#journal", path: ".codex-temp/retreat-journal.png" },
    { selector: "#contact", path: ".codex-temp/retreat-contact.png" }
  ]);

  await capture("http://127.0.0.1:4173/blog/index.html", [
    { path: ".codex-temp/blog-top.png" },
    { selector: ".post-grid", path: ".codex-temp/blog-posts.png" }
  ]);
})();
