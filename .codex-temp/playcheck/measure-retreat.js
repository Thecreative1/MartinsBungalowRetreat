const { webkit, devices } = require("playwright");

(async () => {
  const browser = await webkit.launch({ headless: true });
  const context = await browser.newContext({ ...devices["iPhone 12"] });
  const page = await context.newPage();

  await page.goto("http://127.0.0.1:4173/retreat.html", { waitUntil: "networkidle" });

  const report = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll("body *"));
    const oversized = elements
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          id: element.id || "",
          className: element.className || "",
          scrollHeight: element.scrollHeight,
          clientHeight: element.clientHeight,
          rectHeight: Math.round(rect.height),
          rectTop: Math.round(rect.top + window.scrollY),
          rectBottom: Math.round(rect.bottom + window.scrollY)
        };
      })
      .filter((item) => item.scrollHeight > 2000 || item.rectBottom > 10000)
      .sort((a, b) => b.rectBottom - a.rectBottom)
      .slice(0, 40);

    return {
      bodyScrollHeight: document.body.scrollHeight,
      docScrollHeight: document.documentElement.scrollHeight,
      windowInnerHeight: window.innerHeight,
      oversized
    };
  });

  console.log(JSON.stringify(report, null, 2));
  await browser.close();
})();
