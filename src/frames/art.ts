import { FrameActionDataParsed } from 'frames.js';
const html = String.raw;

export default {
  name: 'art',
  logic: async (frameMessage: FrameActionDataParsed) => {
    switch (frameMessage.buttonIndex) {
      case 1:
        return `art`;
      case 2: 
        return `credits`;
    }
  },
  content: async () => html`
    <frame-image src="sketch?t=${new Date()}"></frame-image>
    <frame-button>
      Show another
    </frame-button>
  <frame-button>
      🎬 View credits
    </frame-button>
  `,
};
