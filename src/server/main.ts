import { Server } from '@hapi/hapi';
import { PomeloServerIface, PomeloServerOptions } from '../../types/typings';
import routes from './routes/main';
import path from 'path';
export default class PomeloServer implements PomeloServerIface {
	server: Server;
	constructor(options: PomeloServerOptions) {
		this.server = new Server({
			host: options.host,
			port: options.port,
			debug: options.debug ? { request: ['*'] } : false,
			routes: {
				files: {
					relativeTo: path.join(__dirname, '../public'),
				},
			},
		});
		(<any>this.server.app).github = options.github;
	}

	public async startServer(): Promise<void> {
		await this.server.register({
			plugin: require('hapi-pino'),
			options: {
				prettyPrint: process.env.NODE_ENV !== 'production',
			},
		});

		this.server.log('setting up routes');
		for await (const route of routes) {
			route.init(this.server);
		}
		this.server.log('set up routes success');

		await this.server.start();
		this.server.log(`Server running at: ${this.server.info.uri}`);
	}

	public async stopServer(): Promise<void> {
		await this.server.stop();
		console.log(`Server stopped`);
	}
}
