const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const html = String.raw;
import browserEnv from "browser-env";
let data: string;

// Create a virtual DOM environment
const dom = new JSDOM("<!DOCTYPE html>");
global.window = dom.window;
global.document = window.document;
global.screen = window.screen;
browserEnv(["navigator"]);

// Import p5.js
const p5 = require("p5");

// Your p5.js sketch
const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(400, 200);
    p.background(220);
  };

  p.draw = () => {
    p.fill(255, 0, 0);
    p.ellipse(50, 100, 50, 50);
    data = p.canvas.toDataURL();
  };
};

// Create a new p5 instance
new p5(sketch);

// Access the canvas data URL
// const canvasDataURL = p.canvas.toDataURL();
// console.log("Canvas Data URL:", canvasDataURL);

// Create a new p5 instance
console.log(data);
export default {
  name: "test",
  content: () => html`
    <frame-image src="${data}" />
    <frame-button> 🔳 Try Demo </frame-button>
    <frame-button action="link" target="${process.env.STOLEN_REDIRECT_URL}">
      👩‍🎤 View original cast
    </frame-button>
  `,
};
