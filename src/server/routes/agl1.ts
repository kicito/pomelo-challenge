import { ResponseToolkit, Server } from '@hapi/hapi';
import { Alg1Request } from '../../../types/typings';
import { Alg1Input } from '../../models/alg1';
import { transform } from '../../services/alg1';

export default {
	init(s: Server) {
		s.route({
			method: 'POST',
			path: '/api/alg1',
			handler: (request: Alg1Request, h: ResponseToolkit) => {
				return transform(request.payload);
			},
			options: {
				validate: {
					payload: Alg1Input,
					failAction: 'log',
				},
			},
		});
		return Promise.resolve();
	},
};
