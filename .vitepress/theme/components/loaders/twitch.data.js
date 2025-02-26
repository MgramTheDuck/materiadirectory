export default {
	async load() {
		const sheetURL = 'https://docs.google.com/spreadsheets/u/0/d/1xsugAiw0j3Kz0Ic41gD-QuMtfxiVtlf-mujLC3Xt78c/gviz/tq?tqx=out:json&sheet=twitch';
		const defaultPicURL = 'https://static-cdn.jtvnw.net/user-default-pictures-uv/cdd517fe-def4-11e9-948e-784f43822e80-profile_image-70x70.png';

		// Fetches the channel list from google sheets
		const sheet = JSON.parse((await (await fetch(sheetURL)).text())
			.replace("/*O_o*/\ngoogle.visualization.Query.setResponse(", "")
			.slice(0, -2)
		);

		// Compile the google sheet data into an object array
		const channels = sheet.table.rows.slice(1).reduce((acc, row) => {
			const channelData = row.c.map(item => item?.v ?? null);
			acc.push({
				name: channelData[0],
				url: channelData[1],
				tags: channelData[2],
				server: channelData[3],
				fc: channelData[4],
				streamdays: channelData[5],
				accountname: channelData[1].split('/').pop(),
				profile_url: defaultPicURL,
				status: { live: false },
			});
			return acc;
		}, []);

		// Load profile images from API only on production (reduces API calls in dev)
		if (process.env.NODE_ENV !== 'production') {
			return channels; // Otherwise, return the channels as is with default profile pics
		}

		return await Promise.all(channels.map(async channel => {
			try {
				const userInfo = await fetch(`https://twitchuserinfo.ingramscloud.workers.dev/${channel.accountname}`)
					.then(res => res.json());
				return { ...channel, profile_url: userInfo.profile_url };
			} catch (error) {
				// Return channel as is if fetch fails (needed for banned or suspended accounts)
				console.error(`Failed to fetch user info for ${channel.accountname}:`, error);
				return { ...channel };
			}
		}));
	}
};