import { ServerRoute } from '@hapi/hapi';
const route: ServerRoute = {
	method: '*',
	path: '/{any*}',
	handler: function () {
		return {
			"error": "Endpoint not found",
			"message": "Invalid endpoint",
			"statusCode": 404
		};
	},
};

export default route;
