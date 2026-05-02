import puppeteer from 'puppeteer';

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  console.log('Clicking the Launch button...');
  await page.waitForSelector('.launch-button', { timeout: 5000 });
  await page.click('.launch-button');

  console.log('Waiting 2 seconds...');
  await new Promise(r => setTimeout(r, 2000));

  console.log('Checking for .app-hud-header...');
  const hasApp = await page.$('.app-hud-header');
  if (hasApp) {
    console.log('AppInner rendered successfully!');
  } else {
    console.log('AppInner did not render!');
  }

  await browser.close();
})();
