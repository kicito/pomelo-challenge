import { Server } from '@hapi/hapi';

export default {
	init(s: Server) {
		s.route({
			method: '*',
			path: '/{any*}',
			handler: function() {
				return {
					error: 'Endpoint not found',
					message: 'Invalid endpoint',
					statusCode: 404,
				};
			},
		});
		return Promise.resolve();
	},
};
