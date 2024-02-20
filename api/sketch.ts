import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
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
      options.executablePath =
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
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
            let frameMode = false;
            let tiles = [];
            let cols;
            let rows;
            let size;
            let vexArc;
            let numShapes;
            let img;
            let colors = [
              "#384726",
              "#b44317",
              "#fafeff",
              "#56472a",
              "#030712",
              "#f9a84d",
              "#71894d",
              "#d28f58",
              "#190b00",
              "#131218",
              "#b8a77b",
              "#0d0d0d",
              "#371e1a",
              "#19181e",
              "#131313",
              "#7e301c",
              "#c297cd",
              "#2a3517",
              "#ded6b1",
              "#91b748",
              "#070707",
              "#223610",
              "#010100",
              "#fe7644",
              "#151f07",
              "#17273e",
              "#e3d4a9",
              "#546b33",
              "#241c2b",
              "#62714a",
              "#d4caaf",
              "#d48777",
              "#585340",
              "#799447",
              "#1a1921",
              "#0c1922",
              "#fef4b7",
              "#a0cb6f",
              "#7d8286",
              "#dc6940",
              "#1b3244",
              "#eacfa2",
              "#1d3b53",
              "#324a56",
              "#1e2015",
              "#13111f",
              "#264557",
              "#9ecf71",
              "#0f1f36",
              "#2a331e",
              "#57602b",
              "#fae1dd",
              "#17161c",
              "#e88e54",
              "#f0a64f",
              "#192f47",
              "#2a213c",
              "#fdfeff",
              "#0c0b06",
              "#8b9a9f",
              "#bcb17b",
              "#a0668e",
              "#1f2312",
              "#50696e",
              "#7ac1b7",
              "#f9d7b1",
              "#030a02",
              "#24231f",
              "#edb294",
              "#475556",
              "#786334",
              "#233543",
              "#080607",
              "#accf51",
              "#f28c54",
              "#f1d6cb",
              "#5e9f67",
              "#2d2d2d",
              "#6a5d31",
              "#9a3920",
              "#232615",
              "#b1a26b",
              "#cb4a3d",
              "#ee7e4e",
              "#82c693",
              "#376889",
              "#cdc4a5",
              "#fc9330",
              "#254456",
              "#fa9135",
              "#463d1c",
              "#6ab1ab",
              "#fce1b4",
              "#f1aa2e",
              "#434c1f",
              "#f2ebbd",
              "#eeb484",
              "#3a2812",
            ];
            let numColors = 5;
            let baseColor;
            let complementaryColor;

            class Tile {
              constructor(x, y, type, c) {
                this.x = x;
                this.y = y;
                this.type = type;
                this.c = c;
              }
              display() {
                push();
                translate(this.x, this.y);
                if (vexArc == 1) {
                  stroke(this.c);
                  noFill();
                  strokeWeight(5);
                  if (this.type == 0) {
                    arc(0, 0, size, size, 0, 90);
                    arc(size, size, size, size, 180, 270);
                    arc(size, size, size, size, 180, 270);
                  } else {
                    arc(size, 0, size, size, 90, 180);
                    arc(0, size, size, size, 270, 360);
                  }
                } else {
                  fill(this.c);
                  noStroke();
                  beginShape();
                  if (this.type == 0) {
                    // Shape 1
                    vertex(size, 0);
                    vertex(size, size);
                    vertex(0, size);
                  } else if (this.type == 1) {
                    // Shape 2
                    vertex(size, 0);
                    vertex(0, 0);
                    vertex(0, size);
                  } else if (this.type == 2) {
                    // Shape 3
                    vertex(size, size);
                    vertex(0, 0);
                    vertex(0, size);
                  } else {
                    // Shape 4
                    vertex(size, size);
                    vertex(0, 0);
                    vertex(size, 0);
                  }
                  endShape();
                }

                pop();
              }
            }

            function setup() {
              vexArc = floor(random(2));
              if (vexArc == 1) {
                numShapes = 2;
                angleMode(DEGREES);
              } else {
                numShapes = 4;
              }
              // print(vexArc, numShapes);

              size = floor(random(30, 60));
              createCanvas(1200, 630);
              baseColor = colors[floor(random(5))];
              complementaryColor = getComplementaryColor(baseColor);

              cols = width / size;
              rows = height / size;
              for (let i = 0; i < cols; i++) {
                tiles[i] = [];
                for (let j = 0; j < rows; j++) {
                  tiles[i][j] = new Tile(
                    i * size,
                    j * size,
                    floor(random(numShapes)),
                    colors[floor(random(5))]
                  );
                }
              }
            }

            function draw() {
              shuffle(colors, true);
              background(complementaryColor);
              for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                  tiles[i][j].display();
                }
              }
              noLoop();
            }


            function getComplementaryColor(baseColor) {
              let r = red(baseColor);
              let g = green(baseColor);
              let b = blue(baseColor);

              // Calculate complementary color
              let compR = 255 - r;
              let compG = 255 - g;
              let compB = 255 - b;
              // Adjust brightness to make it darker (you can modify this factor)
              let darkerFactor = 0.47; // Adjust as needed
              compR *= darkerFactor;
              compG *= darkerFactor;
              compB *= darkerFactor;

              return color(compR, compG, compB);
            }
            window.onload = function() {
              redraw();
            };
            function checkFrameMode() {
            // Check if the URL contains the "frame" parameter
            let params = getURLParams();
            if (params.frame === "art") {
              frameMode = true;
              redraw(); // Redraw the canvas if in "art" mode
              }
            }
            
            // Check if the URL parameters should trigger a redraw
            function mousePressed() {
              redraw();
            }

            // Optionally, you can continuously check the URL for changes
            function keyPressed() {
              redraw();
            }
          </script>
        </body>
      </html>
    `;

    await page.setContent(sketch);
    const renderDelay = 250; // in ms, how long you want to wait before capturing the screenshot
    await new Promise((resolve) => setTimeout(resolve, renderDelay)); // Wait a bit for the sketch to render

    const imageBuffer = await page.screenshot({ type: "png" });
    await browser.close();

    return new Response(imageBuffer, {
      status: 200,
      headers: { "Content-Type": "image/png" },
    });
  } catch (error) {
    console.error("Error generating sketch:", error);
    return new Response("Server Error: Cannot generate sketch", {
      status: 500,
    });
  }
};

export const config = {
  path: "/sketch",
};
