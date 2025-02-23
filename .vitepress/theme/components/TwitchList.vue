<script setup>
import { data } from "./loaders/twitch.data.js";
import { ref } from "vue";
import { onMounted } from "vue";
import {forEach} from "lodash";

let input = ref("");
let channels = data

/**
 * Simple call for loading the channel link in a new tab.
 */
function openPage(url) {
	let strippedUrl = url.replace("/guides", "");
	window.open(strippedUrl, "_blank");
}

/**
 * Called to update channel list with filtered array based on channel tags
 * @returns {array} Returns filtered array
 */
function filteredlist() {
	return channels.filter(channel =>
	channel.tags.toLowerCase().includes(input.value.toLowerCase()));
}

/**
 * Dynamically Updates the website after page load with Twitch LIVE status info.
 * @param {array} status Object array of channels to be fetched.
 */
function updateStreamStatus(status) {
	try {
		if (status.type === "live") {
			let element = document.getElementById('channel_' + status.user_login);
			element.classList.add("live");
			element = document.getElementById('livetag_' + status.user_login);
			element.style.display = "inline-block";

		}
	} catch (e) {
		console.log(`Error loading data: ${status.user_login} Error: ${e}`);
	}
}

/**
 * After page load, sends a JSON GET request to cloudflare worker, the worker batches the channels and requests Twitch LIVE status
 * Returns the data in a JSON format that is sent o updateSteamStatus function to update the page.
 * CLIENT SIDE
 */
onMounted(async () => {
	let response = await fetch(`https://twitchstatusbulk.ingramscloud.workers.dev/`, {
		method: "POST",
		body: JSON.stringify(channels),
		mode: "cors",
		headers: {
			"content-type": "application/json",
		},
	})
	let data = await response.json()
	data.forEach((channel) => { updateStreamStatus(channel); });
});

</script>

<template>
	<div class="filterbar">
		<input class="search" type="text" v-model="input" placeholder="Search tags..." />
	</div>
	<div class="twitch-list">
		<div v-bind:id="'channel_' + channel.accountname" :key="channel" class="channel" v-for="channel in filteredlist()" @click="openPage(channel.url)">
			<div v-bind:id="'livetag_' + channel.accountname" style="display: none" class="livelabel">LIVE</div>
			<div class="channelcontent">
				<img
					v-bind:id="'pfp_' + channel.accountname"
					v-bind:src="channel.profile_url" />
				<div class="title">
					<div v-bind:id="'title_' + channel.accountname" v-if="channel.fc == null" class="name">{{ channel.name }}</div>
					<div v-bind:id="'title_' + channel.accountname" v-if="channel.fc != null" class="name">{{ channel.name }} <span class="fc">«{{ channel.fc }}»</span></div>
					<div v-bind:id="'tags_' + channel.accountname" class="tags"># {{ channel.tags }}</div>
				</div>
				<div class="details">
					<div class="days">{{ channel.streamdays }}</div>
					<div class="server">{{ channel.server }}</div>
				</div>
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
	box-shadow: var(--vp-shadow-2);
}

.twitch-list {
	display: flex;
	flex-flow: row wrap;
	gap: 0.5rem;
}

.channel {
	position: relative;
	border-radius: 8px;
	border: 2px solid var(--vp-c-bg-elv);
	background-color: var(--vp-c-bg-alt);
	transition: 0.2s;
	flex-grow: 1;
	cursor: pointer;
}

.channelcontent {
	display: flex;
	padding: 0.9em 1em 0.9em 0.9em;
}

.live {
	border-color: var(--livecolor);
}

.livelabel {
	color: white;
	position: absolute;
	top: -13px;
	right: 12px;
	font-size: 1.1em;
	font-weight: 600;
	border-radius: 8px;
	background-color: var(--livecolor);
	padding: 2px 7px;
	line-height: normal;
	letter-spacing: 0.2px;
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