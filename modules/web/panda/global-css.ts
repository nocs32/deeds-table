import { defineGlobalStyles } from '@pandacss/dev';

export const globalCss = defineGlobalStyles({
  html: {
    colorScheme: 'dark',
  },
  'html, body, #root': {
    height: '100%',
  },
  body: {
    fontFamily: 'body',
    // Yeseva One comes in one weight: never a fake bold.
    fontSynthesis: 'none',
    fontSize: '16px',
    lineHeight: '1.45',
    color: 'fg.default',
    bg: 'chrome.app',
    overflow: 'hidden',
    WebkitFontSmoothing: 'antialiased',
  },
  'button, input, textarea, select': {
    font: 'inherit',
    color: 'inherit',
  },
  '::selection': {
    bg: 'rgba(216, 164, 60, 0.4)',
  },
});
