import { FrameActionDataParsed } from 'frames.js';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
const html = String.raw;

export default {
  name: 'art',
  logic: async (frameMessage: FrameActionDataParsed) => {
    switch (frameMessage.buttonIndex) {
      case 2:
        return `credits`;
      default: 
        return `art`;
    }
  },
  content: async () => {
    const options = {
      headless: true,
      defaultViewport: {
        width: 1200,
        height: 630
      },
    };

    try {
      if (process.env.IS_LOCAL) {
        options['executablePath'] = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
      } else {
        options['executablePath'] = await chromium.executablePath;
        options['args'] = chromium.args;
      }
      
      const browser = await puppeteer.launch(options);
      const page = await browser.newPage();

      const sketch = html`
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
        </head>
        <body>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>
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
      
      return html`
        <frame-image src="data:image/png;base64,${imageBuffer.toString('base64url')}"></frame-image>
        <frame-button>
          Show another
        </frame-button>
        <frame-button>
          🎬 View credits
        </frame-button>
      `;
    } catch (error) {
      console.error("Error during art generation process:", error);
      throw error; // Propagate the error to handle it further up if necessary
    }
  },
};
