<script setup lang="ts">
import sitesData from "../../data/sites.json";

function openPage(url) {
	let strippedUrl = url.replace("/guides", "");
	window.open(strippedUrl, "_blank");
}
</script>

<template>
	<div class="sites-list">
		<div class="site-box" v-for="site in sitesData" @click="openPage(site.url)">
			<img v-bind:src="site.image" alt="">
			<div class="name">{{ site.name }}</div>
			<div class="description">{{ site.description }}</div>
		</div>
	</div>
</template>

<style scoped>
img {
	width: 80px;
	height: 80px;
	margin-bottom: 0.8em;
	border-radius: 50%;
}

.sites-list {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 1rem;
	margin-bottom: 1.5rem;
}

@media only screen and (max-width: 1100px) {
	.sites-list {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}
}

@media only screen and (max-width: 700px) {
	.sites-list {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}
}

.site-box {
	display: flex;
	flex-direction: column;
	padding: 1em 0.9em 1em 0.9em;
	border-radius: 8px;
	border: 2px solid var(--vp-c-bg-elv);
	background-color: var(--vp-c-bg-alt);
	align-items: center;
	cursor: pointer;
	transition: 0.3s;
}

.site-box:hover {
	border-color: var(--vp-c-brand-1);
}

.name {
	font-weight: 500;
	font-size: 1.8rem;
	margin-bottom: 0.5rem;
	text-align: center;
	line-height: 1.9rem;
}

.description {
	color: var(--vp-c-text-2);
	font-size: 0.9rem;
	font-weight: 500;
	text-align: center;
}

</style>