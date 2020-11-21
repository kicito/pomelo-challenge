import GithubAPI from '../github';

test('GitHubAPI should have props set after initialized', async () => {
	const api = new GithubAPI();
	await api.initialize();
	expect(api.props.rate.limit).toBeGreaterThan(0);
	expect(api.props.rate.remaining).toBeGreaterThan(0);
	expect(api.props.rate.reset).toBeGreaterThan(0);
});

test('GitHubAPI should throw an error if it is not initialized', async () => {
    const api = new GithubAPI();
	expect(api.searchRepo('some-str')).rejects.toEqual(
		new Error('GithubAPI has not initialized yet')
	);
});
