import { FrameActionDataParsed } from "frames.js";
const html = String.raw;

export default {
    name: 'poster',
    logic: (message: FrameActionDataParsed) => {
        if (message.buttonIndex == 1) {
            return `art`
        }
    },
    content: () => html`
        <frame-image src="/sketch" />
        <frame-button>
           Art
        </frame-button>
        <frame-button action="link" target="https://github.com/depatchedmode/simplest-frame">
            {😺} View on Github
        </frame-button>
    `
};
