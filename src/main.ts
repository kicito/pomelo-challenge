import dotenv from 'dotenv-safe';

import PomeloServer from './server/main';
import routes from './server/routes/main';

// setup environment variable
dotenv.config();

const debug = process.env.DEBUG === 'true' ? { request: ['*'] } : false;

process.on('unhandledRejection', err => tearDown(err, 1));

process.on('SIGINT', tearDown);

const server: PomeloServerIface = new PomeloServer(routes, {
	port: process.env.SERVER_PORT,
	host: process.env.SERVER_HOSTNAME,
	debug,
});

function tearDown(err: any = null, errorCode?: number): void {
	server
		.stopServer()
		.then(() => {
			console.error(err);
		})
		.finally(() => {
			process.exit(errorCode);
		});
}

(async () => {
	try {
		server.startServer();
	} catch (e) {
		console.error(e);
	}
})();
