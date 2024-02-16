const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const html = String.raw;
import browserEnv from "browser-env";
import { FrameActionDataParsed } from "frames.js";
let ctx;
let canv;
let data: string;
let HTMLCanvasElement;

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
    canv = p.createCanvas(400, 200);
    p.background(220);
    ctx = canv.drawingContext;
  };

  p.draw = () => {
    p.fill(255, 0, 0);
    p.ellipse(50, 100, 50, 50);
    data = p.ctx.toDataURL();
  };
};

// Create a new p5 instance
// new p5(sketch);
dom.window.document.addEventListener("DOMContentLoaded", () => {
  new p5(sketch);
});

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
