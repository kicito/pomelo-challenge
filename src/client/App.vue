<template>
	<div id="app">
		<h1>Pomelo Challenge!</h1>
		<!-- <GithubLogin :client_id="this.client_id" /> -->
		<GithubTable />
	</div>
</template>

<script>
// import GithubLogin from './components/GithubLogin';
import GithubTable from './components/GithubTable';
import axios from 'axios';
export default {
	data: function() {
		return {
			client_id: process.env.GH_CLIENT_ID,
		};
	},
	components: {
		// GithubLogin,
		GithubTable,
	},
};
</script>
