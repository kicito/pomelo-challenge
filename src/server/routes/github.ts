import { ResponseToolkit, Server } from '@hapi/hapi';
import GithubAPI from '../../services/github';
export default {
	async init(s: Server) {
		let githubAPI = new GithubAPI((<any>s.app).github);
		await githubAPI.initialize();

		s.route({
			method: 'GET',
			path: '/api/nodejs/{page?}',
			handler: async (request: Request, h: ResponseToolkit) => {
				let page = (<any>request).params.page
					? (<any>request).params.page
					: 1;
				
				if (page < 1) {
					page = 1;
				}

				return await githubAPI.searchRepo('node.js', page);
			},
		});

		s.route({
			method: 'GET',
			path: '/api/limit',
			handler: async (request: Request, h: ResponseToolkit) => {
				return await githubAPI.getRateLimit();
			},
		});

		s.route({
			method: 'GET',
			path: '/login/callback',
			handler: async (request: Request, h: ResponseToolkit) => {
				if ((<any>request).query.error) {
					return (<any>request).query;
				}
				await githubAPI.getAccessToken(
					(<any>request).query.code,
					(<any>request).headers.host
				);
				console.log((<any>request).query.code);
				return {};
			},
		});
	},
};
