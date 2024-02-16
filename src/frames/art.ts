import { FrameActionDataParsed } from "frames.js";
import { readFile } from "fs/promises";
import puppeteer from "puppeteer-core";
import chromium from "netlify-plugin-chromium";
const html = String.raw;

export default {
  name: "art",
  logic: async (frameMessage: FrameActionDataParsed) => {
    switch (frameMessage.buttonIndex) {
      case 2:
        return `credits`;
      default:
        return `art`;
    }
  },
  content: async () => {
    // Launch a browser instance
    const browser = await chromium.puppeteer.launch({
      executablePath: await chromium.executablePath,
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      headless: chromium.headless,
    });
    const page = await browser.newPage();
    // Set the browser window size
    await page.setViewport({
      width: 1200,
      height: 630,
    });

    // Define your p5.js sketch HTML without using import statement
    const p5SketchHTML = html`
      <!doctype html>
      <html>
        <head>
          <style>
            html,
            body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
            }
          </style>
        </head>
        <body>
          <script>
            ${await readFile("./public/scripts/p5.min.js", "utf8")};
            function setup() {
              createCanvas(1200, 630);
              background(
                Math.random() * 255,
                Math.random() * 255,
                Math.random() * 255
              );
              fill(
                Math.random() * 255,
                Math.random() * 255,
                Math.random() * 255
              );
              ellipse(
                Math.random() * 1200,
                Math.random() * 630,
                Math.random() * 630,
                Math.random() * 630
              );
            }

            // Automatically call setup() and other p5 functions
            window.onload = function () {
              new p5();
            };
          </script>
        </body>
      </html>
    `;

    // Set the page content to your p5.js sketch HTML
    await page.setContent(p5SketchHTML);
    const renderDelay = 250; // in ms, how long you want to wait before capturing the screenshot
    await new Promise((resolve) => setTimeout(resolve, renderDelay)); // Wait a bit for the sketch to render

    // Take a screenshot of the page
    const imageBuffer = await page.screenshot({ type: "png" });
    await browser.close();
    const dataURL = imageBuffer.toString("base64url");

    return html`
      <frame-image src="data:image/png;base64,${dataURL}"></frame-image>
      <frame-button> Show another </frame-button>
      <frame-button> 🎬 View credits </frame-button>
    `;
  },
};
