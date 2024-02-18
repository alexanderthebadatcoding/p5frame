import { FrameActionDataParsed } from "frames.js";
const html = String.raw;

export default {
  name: "credits",
  logic: (message: FrameActionDataParsed) => {
    if (message.buttonIndex == 1) {
      return `count`;
    }
  },
  content: () => html`
    <frame-image src="/images/credits.png" />
    <frame-button> ⬅️ Back </frame-button>
    <frame-button
      action="link"
      target="https://www.youtube.com/watch?v=9DU5WiNdu74"
    >
      View Youtube Tutorial
    </frame-button>
  `,
};
