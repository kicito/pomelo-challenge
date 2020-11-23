import axios, { AxiosInstance } from 'axios';

import { GitHubAPIOptions, GitHubAPIProps } from '../../types/typings';
export default class GitHubAPI {
	props: GitHubAPIProps;
	initialized: boolean;
	axios: AxiosInstance;
	constructor(options: GitHubAPIOptions) {
		this.props = {
			...options,
			rate: { limit: 0, remaining: 0, reset: 0 },
		};
		this.axios = axios.create({
			baseURL: 'https://api.github.com',
			auth: {
				username: this.props.client_id,
				password: this.props.secret_id,
			},
		});
		this.initialized = false;
	}

	async initialize() {
		await this.getRateLimit();
		this.initialized = true;
	}

	async getAccessToken(code: string, redirect_url: string) {
		const result = await axios.post(
			'/login/oauth/access_token',
			{
				client_id: this.props.client_id,
				client_secret: this.props.secret_id,
				code,
				redirect_uri: redirect_url,
			},
			{ headers: { Accept: 'application/json' } }
		);
		return result;
	}

	async getRateLimit() {
		return this.props.rate;
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
		console.log(this.props.rate);
	}

	// parser for "Hypermedia link relations", retrieved from
	//https://stackoverflow.com/questions/47449086/how-to-access-rel-from-links-in-header-hypermedia-link-relations
	private parseLinkHeader(data: string): { [index: string]: string } {
		let arrData = data.split('link:');
		data = arrData.length == 2 ? arrData[1] : data;
		let parsed_data: { [index: string]: string } = {};

		arrData = data.split(',');

		arrData.forEach(d => {
			let linkInfo = /<([^>]+)>;\s+rel="([^"]+)"/gi.exec(d);
			parsed_data[linkInfo![2]] = linkInfo![1];
		});

		return parsed_data;
	}

	async searchRepo(query: string, page: number = 1) {
		if (!this.initialized) {
			throw new Error('GithubAPI has not initialized yet');
		}
		const result = await this.axios.get('/search/repositories', {
			params: {
				q: query,
				per_page: 10,
				page,
			},
		});
		this.setRateLimit(result.headers);

		return {
			link: this.parseLinkHeader(result.headers.link),
			...result.data,
		};
	}
}
