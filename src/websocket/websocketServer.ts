import { WebSocketServer } from 'ws';
import { handleConnection } from './connectionManager';
import http from 'http';
import { getPort } from '../config';
import logger from '../utils/logger';
import cors from 'cors'; // Import cors middleware


const corsOptions = {
  origin: ['https://dash.wodoxo.com', 'https://dash.abcenglishonline.com'],
  methods: ['GET', 'POST'],
};


export const initServer = (
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>,
) => {
  const port = getPort();
  const wss = new WebSocketServer({ server });

  // Apply CORS middleware
  server.on('request', cors(corsOptions));

  wss.on('connection', handleConnection);
  logger.info(`WebSocket server started on port ${port}`);
};