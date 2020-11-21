import { ResponseToolkit, ServerRoute } from '@hapi/hapi';
import { Alg1Input } from '../../models/alg1';
import { transform } from '../../services/alg1';
const route: ServerRoute = {
	method: 'POST',
	path: '/alg1',
	handler: (request: Alg1Request, h: ResponseToolkit) => {
		return transform(request.payload);
	},
	options: {
		validate: {
			payload: Alg1Input,
			failAction: 'log',
		},
	},
};

export default route;
