<script setup lang="ts">
import sitesData from "../../data/sites.json";

function openPage(url) {
	let strippedUrl = url.replace("/guides", "");
	window.open(strippedUrl, "_blank");
}

</script>

<template>
	<div class="sites-list">
		<div class="site-box" v-for="site in sitesData">
			<a v-bind:href="site.locations[0].url">
				<ul class="site-link-list">
					<li v-for="location in site.locations">
						<a v-bind:href="location.url" target="_blank">
							<img class="site-link-img" v-bind:src="'/images/icons/' + location.type + '.svg'"/>
						</a>
					</li>
				</ul>
				<div class="site-content">
					<img class="site-image" v-bind:src="site.image" alt="">
					<div class="name">{{ site.name }}</div>
					<div class="description">{{ site.description }}</div>
				</div>
			</a>
		</div>
	</div>
</template>

<style scoped>
.site-image {
	width: 80px;
	height: 80px;
	margin-bottom: 0.8em;
	border-radius: 50%;
	box-shadow: var(--vp-shadow-3);
}

.sites-list {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 1rem;
	margin-bottom: 1.5rem;
}

.site-link-list {
	position: absolute;
	list-style: none;
	right: 13px;
}

.site-link-img {
	width: 22px;
	filter: grayscale(1);
	padding-top: 2px;
}

.site-link-img:hover {
	/* Long list of filters but achieves same colour as --vp-c-brand-1
	   brightness(0) and saturate(1) are used to make svg black before applying following filters */
	filter: brightness(0) saturate(1) invert(68%) sepia(37%) saturate(7278%) hue-rotate(221deg) brightness(104%) contrast(105%);
	transition: all 3s linear;
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
	position: relative;
	border-radius: 8px;
	border: 2px solid var(--vp-c-bg-elv);
	background-color: var(--vp-c-bg-alt);
	cursor: pointer;
	transition: 0.3s;
}

.site-content {
	display: flex;
	flex-direction: column;
	padding: 1em 0.9em 1em 0.9em;
	align-items: center;
}

.site-type {

}

.site-box:hover {
	border-color: var(--vp-c-brand-1);
}

.site-box > a:link {
	text-decoration: none;
}

.site-box > a:hover {
	text-decoration: none;
}

.site-box > a:visited {
	text-decoration: none;
}

.site-box > a:active {
	text-decoration: none;
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