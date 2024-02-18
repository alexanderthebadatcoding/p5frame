import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
export default async (req, context) => {

  try {
    const options = {
      headless: true,
      defaultViewport: {
        width: 1200,
        height: 630,
      },
    };

    // Adjust based on the environment
    if (process.env.IS_LOCAL) {
      options.executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    } else {
      options.executablePath = await chromium.executablePath();
      options.args = chromium.args;
    }

    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    const host = process.env.BASE_URL || process.env.URL;
    const scriptURL = `${host}/scripts/p5.min.js`;
    const response = await fetch(scriptURL);
    const p5Script = await response.text();

    const sketch = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
            }
          </style>
          <script>${p5Script}</script>
        </head>
        <body>
          <script>
            function setup() {
              createCanvas(1200, 630);
              background(Math.random()*255,Math.random()*255,Math.random()*255);
              fill(Math.random()*255, Math.random()*255, Math.random()*255);
              ellipse(Math.random()*1200, Math.random()*630, Math.random()*630, Math.random()*630);
            }
            window.onload = function() {
              new p5();
            };
          </script>
        </body>
      </html>
    `;

    await page.setContent(sketch);
    const renderDelay = 250; // in ms, how long you want to wait before capturing the screenshot
    await new Promise(resolve => setTimeout(resolve, renderDelay)); // Wait a bit for the sketch to render

    const imageBuffer = await page.screenshot({ type: 'png' });
    await browser.close();

    return new Response(imageBuffer, {
      status: 200,
      headers: { 'Content-Type': 'image/png' },
    });
  } catch (error) {
    console.error('Error generating sketch:', error);
    return new Response('Server Error: Cannot generate sketch', { status: 500 });
  }
}

export const config = {
  path: "/sketch"
};
