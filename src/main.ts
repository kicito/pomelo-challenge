import dotenv from 'dotenv-safe';

import PomeloServer from './server/main';
import routes from './server/routes/main';

// setup environment variable
dotenv.config();

const debug = process.env.DEBUG === 'true' ? { request: ['*'] } : false;

process.on('unhandledRejection', err => {
	console.log(err);
	process.exit(1);
});

const server: PomeloServerIface = new PomeloServer(routes, {
	port: process.env.SERVER_PORT,
	host: process.env.SERVER_HOSTNAME,
	debug,
});

(async () => {
	try {
		server.startServer();
	} catch (e) {
		console.error(e);
	}
})();
