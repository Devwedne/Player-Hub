import app from './app.js';
import { closeDatabase } from './db.js';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Player Hub API rodando em http://localhost:${PORT}`);
});

function shutdown() {
  closeDatabase();
  server.close(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
