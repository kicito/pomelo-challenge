import { GitHubAPIOptions } from '../../../types/typings';
import GithubAPI from '../github';

let config: GitHubAPIOptions;

beforeAll(() => {
	config = {
		client_id: process.env.GH_CLIENT_ID!,
		secret_id: process.env.GH_SECRET_ID!,
		base_url: '',
	};
});

test('GitHubAPI should have props set after initialized', async () => {
	const api = new GithubAPI(config);
	await api.initialize();
	expect(api.props.rate.limit).toBeGreaterThan(0);
	expect(api.props.rate.remaining).toBeGreaterThan(0);
	expect(api.props.rate.reset).toBeGreaterThan(0);
});

test('GitHubAPI should throw an error if it is not initialized', async () => {
	const api = new GithubAPI(config);
	expect(api.searchRepo('some-str')).rejects.toEqual(
		new Error('GithubAPI has not initialized yet')
	);
});

test('GitHubAPI.searchRepo should return 200', async () => {
	const api = new GithubAPI(config);
	await api.initialize();
	const result = await api.searchRepo('nodejs');
	expect(result.status).toBe(200);
});
