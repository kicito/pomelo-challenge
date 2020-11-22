import { Server } from '@hapi/hapi';
import path from "path";

export default {
	async init(s: Server) {
        await s.register(require('@hapi/inert'));

		s.route({
			method: 'GET',
			path: '/{param*}',
			handler: {
				directory: {
					path: '../public',
					index: ['index.html'],
				},
			},
		});
		return Promise.resolve();
	},
};
