<template>
	<p>Limit reached? <a v-bind:href="this.github_url">Login here</a> to increase limit!</p>
</template>

<script>
export default {
	props: {
		client_id: String,
	},
	data: function() {
		return {
			github_url: `https://github.com/login/oauth/authorize?client_id=${this.client_id}`,
		};
	},
};
</script>
