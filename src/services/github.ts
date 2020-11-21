import axios from 'axios';
const baseURL: string = 'https://api.github.com';
const rateLimitEndPoint: string = `${baseURL}/rate_limit`;
const searchRepositoryEndPoint: string = `${baseURL}//search/repositories`;
export default class GitHubAPI {
	props: GitHubAPIProps;
	initialized: boolean;
	constructor(options?: GitHubAPIOptions) {
		this.props = { rate: { limit: 0, remaining: 0, reset: 0 } };
		this.initialized = false;
	}

	async initialize() {
		await this.getRateLimit();
		this.initialized = true;
	}

	private async getRateLimit() {
		const result = await axios.get(rateLimitEndPoint);
		this.setRateLimit(result.headers);
		return result;
	}

	private setRateLimit(headers: any) {
		this.props.rate.limit = headers['x-ratelimit-limit']
			? Number(headers['x-ratelimit-limit'])
			: this.props.rate.limit;
		this.props.rate.remaining = headers['x-ratelimit-remaining']
			? Number(headers['x-ratelimit-remaining'])
			: this.props.rate.remaining;
		this.props.rate.reset = headers['x-ratelimit-reset']
			? Number(headers['x-ratelimit-reset'])
			: this.props.rate.reset;
	}

	async searchRepo(query: string) {
		if (!this.initialized) {
			throw new Error('GithubAPI has not initialized yet');
		}
		const result = await axios.get(searchRepositoryEndPoint, {
			params: {
				q: query,
			},
		});
		this.setRateLimit(result.headers);

		return result;
	}
}
