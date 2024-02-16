import { JSDOM } from "jsdom";
const html = String.raw;
let data: string;

// Create a virtual DOM environment
const dom = new JSDOM("<!DOCTYPE html>");
const window = dom.window;

global.window = window as unknown as Window & typeof globalThis;
global.screen = window.screen;
global.navigator = window.navigator;
global.document = window.document;

// Import p5.js
import p5 from "p5";

// Your p5.js sketch
const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(400, 200);
    p.background(220);
    // p.noCanvas();
  };

  p.draw = () => {
    p.fill(255, 0, 0);
    p.ellipse(50, 100, 50, 50);
    // data = p.canvas.toDataURL();
    data = (p as any).canvas.toDataURL();
  };
};

// Create a new p5 instance
new p5(sketch);
console.log(data);
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
