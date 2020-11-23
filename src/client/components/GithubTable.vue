<template>
	<div class="result-wrapper">
		<ul class="table">
			<li class="cell" v-for="(d, index) in this.data" :key="index">
				<a :href="d.url">{{ d.name }}</a>
			</li>
		</ul>
		<button
			@click="toFirst"
			v-if="this.hasFirst"
			:disabled="this.is_loading"
		>
			{{ this.getPageFromLink(this.link.first) }}
		</button>
		<button
			@click="prevPage"
			v-if="this.hasPrev"
			:disabled="this.is_loading"
		>
			Previous
		</button>
		<button
			@click="nextPage"
			v-if="this.hasNext"
			:disabled="this.is_loading"
		>
			Next
		</button>
		<button @click="toLast" v-if="this.hasLast" :disabled="this.is_loading">
			{{ this.getPageFromLink(this.link.last) }}
		</button>
		<p>There are : {{ this.total }} items for "Nodejs" query</p>
		<p>Total Calling limit : {{ this.limit }}</p>
		<p>Current remaining : {{ this.remaining }}</p>
		<p>Reset at : {{ this.limit_reset }}</p>
		<p>
			Note: This application is limited the search result due to Github API restriction.
			The Github search API only allows
			<a
				href="https://docs.github.com/en/free-pro-team@latest/rest/reference/search"
				>up to 1,000 results for each search.</a
			>
		</p>
	</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
export default {
	data() {
		return {
			page_number: 1, // default to page 1
			data: [],
			total: 0,
			limit_reset: null,
			limit: 0,
			remaining: 0,
			link: {},
			is_loading: false,
		};
	},
	created: async function() {
		await this.getPageData(this.page_number);
		await this.updateLimit();
	},
	mounted: async function() {
	},
	computed: {
		hasNext: function() {
			return this.link.next ? true : false;
		},
		hasPrev: function() {
			return this.link.prev ? true : false;
		},
		hasFirst: function() {
			return this.link.first ? true : false;
		},
		hasLast: function() {
			return this.link.last ? true : false;
		},
	},
	methods: {
		nextPage: async function() {
			await this.getPageData(++this.page_number);
			await this.updateLimit();
		},
		prevPage: async function() {
			await this.getPageData(--this.page_number);
			await this.updateLimit();
		},
		toLast: async function() {
			await this.getPageData(this.getPageFromLink(this.link.last));
			await this.updateLimit();
		},
		toFirst: async function() {
			await this.getPageData(1);
			await this.updateLimit();
		},
		getPageFromLink: function(link) {
			return qs.parse(link.split('?')[1]).page;
		},
		getPageData: async function(page_number) {
			this.is_loading = true;
			const result = await axios.get(`/api/nodejs/${page_number}`);
			this.data = result.data.items.map(d => {
				return {
					name: d.name,
					url: d.url,
				};
			});
			this.link = result.data.link;
			this.total = result.data.total_count;
			this.page_number = page_number;
			this.is_loading = false;
			return result.data;
		},
		updateLimit: async function() {
			this.is_loading = true;
			const result = await axios.get('/api/limit');
			this.limit = result.data.limit;
			this.remaining = result.data.remaining;
			this.limit_reset = new Date(result.data.reset * 1000);
			this.is_loading = false;
		},
	},
};
</script>
