import { Server, ServerOptions, ServerRoute } from '@hapi/hapi';
export default class PomeloServer implements PomeloServerIface {
	server: Server;
	constructor(routes: ServerRoute[], options?: ServerOptions) {
		this.server = new Server(options);
		for (const route of routes) {
			this.server.route(route);
		}
	}

	public async startServer(): Promise<void> {
		await this.server.register({
			plugin: require('hapi-pino'),
			options: {
				prettyPrint: process.env.NODE_ENV !== 'production',
			},
		});

		await this.server.start();
		console.log(`Server running at: ${this.server.info.uri}`);
	}
	public async stopServer(): Promise<void> {
		await this.server.stop();
		console.log(`Server stopped`);
	}
}
