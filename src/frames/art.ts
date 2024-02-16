import { JSDOM } from "jsdom";
const html = String.raw;
let data;

// Create a virtual DOM environment
const dom = new JSDOM("<!DOCTYPE html>");
global.window = dom.window;
global.document = window.document;
global.screen = window.screen;
global.navigator = window.navigator;

// Import p5.js
import * as p5 from "../data/p5.js";

// Your p5.js sketch
const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(400, 200);
    p.background(220);
    p.noCanvas();
  };

  p.draw = () => {
    p.fill(255, 0, 0);
    p.ellipse(50, 100, 50, 50);
    data = p.canvas.toDataURL();
    console.log(data);
  };
};

// Create a new p5 instance
new p5(sketch);

export default {
  name: "poster",
  logic: () => null,
  content: () => html`
    <frame-image src="${data}" />
    <frame-button> 🔳 Try Demo </frame-button>
    <frame-button action="link" target="${process.env.STOLEN_REDIRECT_URL}">
      👩‍🎤 View original cast
    </frame-button>
  `,
};
