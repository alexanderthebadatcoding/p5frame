import { JSDOM } from "jsdom";
import p5 from "p5";
// import { FrameActionDataParsed } from "frames.js";
const html = String.raw;
let data: string;

// Create a virtual DOM environment
const dom = new JSDOM("<!DOCTYPE html>");
const window = dom.window;

// Assign global objects for compatibility
global.window = window as unknown as Window & typeof globalThis;
global.screen = window.screen;
global.navigator = window.navigator;
global.document = window.document;
// global.canvas = window.canvas;

// Your p5.js sketch
const sketch = (p: p5) => {
  p.setup = () => {
    // Create a canvas but don't attach it to the document
    p.createCanvas(400, 200);
    p.background(220);
    // If you want to access the canvas context, use drawingContext
    const canvasContext = p.drawingContext as CanvasRenderingContext2D;
    // Now you can use canvasContext to perform low-level canvas operations
  };

  p.draw = () => {
    // Your drawing logic goes here
    p.fill(255, 0, 0);
    p.ellipse(50, 100, 50, 50);

    // If you want to get data from the canvas
    const data = p.canvas.toDataURL();
    console.log(data);
  };
};

// Create a new p5 instance
new p5(sketch);

// Create a new p5 instance
console.log(data);
export default {
  name: "art",
  content: () => html`
    <frame-image src="${data}" />
    <frame-button> 🔳 Try Demo </frame-button>
    <frame-button action="link" target="${process.env.STOLEN_REDIRECT_URL}">
      👩‍🎤 View original cast
    </frame-button>
  `,
};
