import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const coreApiUrl = 'http://localhost:2572';

// Live tables: the Colyseus client talks to /live (matchmaking over HTTP, then a WebSocket);
// core-api serves those routes at its root.
const liveProxy = {
  target: coreApiUrl,
  ws: true,
  rewrite: (path: string): string => path.replace(/^\/live/u, ''),
};

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      'styled-system': fileURLToPath(new URL('./styled-system', import.meta.url)),
    },
  },
  // 5178 and 4178, one above Bluff Table's 5177 and 4177 (Wild Table has 5176 and 4176, Telephone
  // Table 5175 and 4175, Scribble Table 5174 and 4174, Felt Table 5173 and 4173), so all six games
  // may run at once.
  server: {
    port: 5178,
    strictPort: true,
    proxy: { '/api': coreApiUrl, '/live': liveProxy },
  },
  // `pnpm preview`: the production build, served on this machine only, to check it before it goes
  // to the Pi. The preview reuses `server.proxy`, so /api and /live reach core-api exactly as in dev.
  preview: {
    host: '127.0.0.1',
    port: 4178,
    strictPort: true,
  },
});
