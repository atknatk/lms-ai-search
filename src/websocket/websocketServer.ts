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

export const initServer = () => {
  const port = getPort();

  // Create a separate HTTP server for CORS handling
  const httpServer = http.createServer();
  httpServer.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });

  // Apply CORS middleware to the HTTP server
  httpServer.on('request', cors(corsOptions));

  // Create WebSocket server attached to the HTTP server
  const wss = new WebSocketServer({ server: httpServer });
  wss.on('connection', handleConnection);
  logger.info(`WebSocket server started on port ${port}`);
};