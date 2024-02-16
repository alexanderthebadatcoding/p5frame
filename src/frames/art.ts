const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const html = String.raw;

// Create a virtual DOM environment
const dom = new JSDOM("<!DOCTYPE html>");
global.window = dom.window;
global.document = window.document;
global.screen = window.screen;
global.navigator = window.navigator;

// Import p5.js
const p5 = require("p5");

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
    const data = p.canvas.toDataURL();
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
    <script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.js"></script>
  `,
};
