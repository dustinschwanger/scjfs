const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle' });

    // Take full page screenshot
    await page.screenshot({
      path: 'screenshot-desktop-full.png',
      fullPage: true
    });

    console.log('Desktop full page screenshot saved');

    // Take viewport screenshot (above the fold)
    await page.screenshot({
      path: 'screenshot-desktop-viewport.png',
      fullPage: false
    });

    console.log('Desktop viewport screenshot saved');

    // Mobile screenshot
    await page.setViewportSize({ width: 375, height: 812 });
    await page.screenshot({
      path: 'screenshot-mobile-full.png',
      fullPage: true
    });

    console.log('Mobile full page screenshot saved');

    // Tablet screenshot
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.screenshot({
      path: 'screenshot-tablet-full.png',
      fullPage: true
    });

    console.log('Tablet full page screenshot saved');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
