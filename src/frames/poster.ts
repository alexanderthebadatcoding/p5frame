import { FrameActionDataParsed } from "frames.js";
const html = String.raw;

export default {
  name: "poster",
  logic: (message: FrameActionDataParsed) => {
    if (message.buttonIndex == 1) {
      return `count`;
    }
  },
  content: () => html`
    <frame-image src="/images/poster-animated.gif" />
    <frame-button> test </frame-button>
    <frame-button
      action="link"
      target="https://github.com/depatchedmode/simplest-frame"
    >
      {😺} View on Github
    </frame-button>
  `,
};
