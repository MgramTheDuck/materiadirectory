<script setup>
import {data} from "./loaders/twitch.data.js";
import { ref } from "vue";
let input = ref("");
let channels = data

function openPage(url) {
	let strippedUrl = url.replace("/guides", "");
	window.open(strippedUrl, "_self");
}

function filteredlist() {
	return channels.filter(channel =>
	channel.tags.toLowerCase().includes(input.value.toLowerCase()));
}

</script>

<template>
	<div class="filterbar">
		<input class="search" type="text" v-model="input" placeholder="Search tags..." />
	</div>
	<div class="twitch-list">
		<div :key="channel" class="channel" v-for="channel in filteredlist()" @click="openPage(channel.url)">
			<img
				v-bind:id="'pfp_' + channel.accountname"
				v-bind:src="'https://twitchuserinfo.ingramscloud.workers.dev/' + channel.accountname" />
			<div class="title">
				<div v-if="channel.fc == null" class="name">{{ channel.name }}</div>
				<div v-if="channel.fc != null" class="name">{{ channel.name }} <span class="fc">«{{ channel.fc }}»</span></div>
				<div class="tags"># {{ channel.tags }}</div>
			</div>
			<div class="details">
				<div class="days">{{ channel.streamdays }}</div>
				<div class="server">{{ channel.server }}</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.search {
	font-size: 1.2em;
	font-weight: 500;
	margin-bottom: 0.5em;
	padding: 0.3em 1em 0.3em 0.3em;
	border-radius: 6px;
	border: 2px solid grey;
	background-color: var(--vp-c-bg-elv);
}

img {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	margin-right: 0.9em;
}

.twitch-list {
	display: flex;
	flex-flow: row wrap;
	gap: 0.5rem;
}

.channel {
	display: flex;
	padding: 0.9em 1em 0.9em 0.9em;
	border-radius: 8px;
	border: 2px solid var(--vp-c-bg-elv);
	background-color: var(--vp-c-bg-alt);
	flex-grow: 1;
	transition: 0.2s;
	cursor: pointer;
}

.channel:hover {
	border-color: var(--vp-c-brand-1);
}

.title {
	display: flex;
	flex-flow: column nowrap;
	flex: 1;
	justify-content: space-between;
}

.name {
	font-weight: 600;
	font-size: 1.3rem;
	text-decoration: none;
	color: var(--vp-c-brand);
}

.fc {
	font-size: 1.2rem;
	color: var(--vp-c-text-3);
	font-weight: 500;
}

.tags {
	font-size: 0.9rem;
	color: var(--vp-c-text-3);
	font-weight: 500;
}

.details {
	display: flex;
	flex-flow: column nowrap;
	text-align: right;
	justify-content: space-between;
}

.server {
	font-size: 0.9rem;
	color: var(--vp-c-text-3);
	font-weight: 500;
}

.days {
	font-weight: 500;
}
</style>