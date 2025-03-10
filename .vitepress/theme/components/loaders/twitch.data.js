import Papa from "papaparse";

export default {
	/**
	 * @returns {Object[]} An array of channel objects.
	 */

	async load() {
		const sheetURL = 'https://docs.google.com/spreadsheets/d/1xsugAiw0j3Kz0Ic41gD-QuMtfxiVtlf-mujLC3Xt78c/export?format=csv&gid=0';
		const defaultPicURL = 'https://static-cdn.jtvnw.net/user-default-pictures-uv/cdd517fe-def4-11e9-948e-784f43822e80-profile_image-70x70.png';

		// Fetches the channel list from google sheets
		try {
			const response = await fetch(sheetURL);

			// Parse the CSV String into an object with headers
			var parsed = Papa.parse(await response.text(), { header: true })

		} catch (error) {
			console.log("Failed to fetch sheet:", error);
			return [];
		}

		let acc = [];
		for (let entry of parsed.data) {
			acc.push({
				name: entry.Name,
				url: entry.Stream,
				tags: entry['Content Tags'],
				server: entry.Server,
				fc: entry.FC,
				streamdays: entry['Stream Days'],
				accountname: entry.Stream.split('/').pop(),
				profile_url: defaultPicURL,
				status: { live: false },
			})
		}

		console.log(acc)

		// Compile the google sheet data into an object array
		const channels = acc

		// Load profile images from API only on production (reduces API calls in dev)
		if (process.env.NODE_ENV !== 'production') {
			return channels; // Otherwise, return the channels as is with default profile pics
		}

		return await Promise.all(channels.map(async channel => {
			try {
				const response = await fetch(`https://twitchuserinfo.ingramscloud.workers.dev/${channel.accountname}`);
				const userInfo = await response.json();
				return { ...channel, profile_url: userInfo.profile_url };
			} catch (error) {
				// Return channel as is if fetch fails (needed for banned or suspended accounts)
				console.error(`Failed to fetch user info for ${channel.accountname}:`, error);
				return { ...channel };
			}
		}));
	}
};