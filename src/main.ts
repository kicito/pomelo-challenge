import dotenv from 'dotenv-safe';
import { PomeloServerIface } from '../types/typings';

import PomeloServer from './server/main';

// setup environment variable
dotenv.config();


process.on('unhandledRejection', err => tearDown(err, 1));

process.on('SIGINT', tearDown);
const server: PomeloServerIface = new PomeloServer( {
	port: process.env.SERVER_PORT!,
	host: process.env.SERVER_HOSTNAME!,
	github: {
		client_id: process.env.GH_CLIENT_ID!,
		secret_id: process.env.GH_SECRET_ID!,
	},
	debug: process.env.DEBUG === 'true',
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
