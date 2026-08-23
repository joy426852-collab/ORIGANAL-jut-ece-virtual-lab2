const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();

  const files = ['index.html', 'lab.html', 'zone1.html', 'zone3.html', 'hub.html', 'calculator.html', 'community.html', 'login.html'];
  for (const file of files) {
    console.log(`Checking ${file}...`);
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', exception => {
      errors.push(`Uncaught exception: "${exception}"`);
    });

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(`Console error: "${msg.text()}"`);
      }
    });
    await page.goto(`http://localhost:8000/${file}`);
    await page.waitForTimeout(1000);
    console.log(`${file} ERRORS:`, errors);
    await page.close();
  }

  await browser.close();
})();
