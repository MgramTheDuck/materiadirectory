<script setup>
import { data } from './loaders/twitch.data.js';

let rows = data.table.rows

let channels = []

for (let row in rows) {
	let channeldata = rows[row].c.map(item => item && item.v !== null ? item.v : null);

	channels.push(
		{
			name: channeldata[0],
			url: channeldata[1],
			tags: channeldata[2],
			server: channeldata[3],
			fc: channeldata[4],
			streamdays: channeldata[5],
		}
	);
}

channels.shift();

function openPage(url) {
	let strippedUrl = url.replace("/guides", '');
	window.open(strippedUrl, "_self");
}

</script>

<template>
	<div class="twitch-list">
		<div class="channel" v-for="channel in channels" @click="openPage(channel.url)">
			<div class="title">
				<div v-if="channel.fc == null" class="name">{{ channel.name }}</div>
				<div v-if="channel.fc != null" class="name">{{ channel.name }} <{{ channel.fc }}></div>
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

img {
	width: 50px;
	height: 50px;
}

.twitch-list {
	display: flex;
	flex-flow: row wrap;
	gap: 0.5rem;
}

.channel {
	display: flex;
	padding: 0.8em 1em 0.8em 1em;
	border-radius: 8px;
	border: 2px solid grey;
	background-color: var(--vp-c-bg-alt);
	flex-grow: 1;
	transition: 0.2s;
	cursor: pointer;
}

.channel:hover {
	border-color: var(--vp-c-brand-2);
}

.title {
	display: flex;
	flex-flow: column nowrap;
	flex: 1;
}

.name {
	font-weight: 600;
	font-size: 1.4rem;
	text-decoration: none;
	color: var(--vp-c-brand);
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