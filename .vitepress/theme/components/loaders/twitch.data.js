import Papa from "papaparse";

export default {
	/**
	 * Loads community Twitch channels from the Materia Directory google sheet.
	 * 
	 * @returns {{
	 * 	channels: Object[],
	 * 	tags: String[]
	 * }} 
	 * 
	 * @link https://docs.google.com/spreadsheets/d/1xsugAiw0j3Kz0Ic41gD-QuMtfxiVtlf-mujLC3Xt78c/edit?gid=0
	 */
	async load() {
		const sheetURL = 'https://docs.google.com/spreadsheets/d/1xsugAiw0j3Kz0Ic41gD-QuMtfxiVtlf-mujLC3Xt78c/export?format=csv&gid=0';
		const defaultPicURL = 'https://static-cdn.jtvnw.net/user-default-pictures-uv/cdd517fe-def4-11e9-948e-784f43822e80-profile_image-70x70.png';

		try {
			const response = await fetch(sheetURL);
			const parsed = Papa.parse(await response.text(), { header: true });

			const tags = parsed.data.map(row => row['_1']).filter(Boolean);
			const channels = parsed.data.map(row => ({
					name: row.Name,
					url: row.Stream,
					 // Add commas to tags, e.g. "Ultimate Savage Sprout Friendly" > "Ultimate, Savage, Sprout Friendly"
					tags: tags.filter(tag => row['Content Tags'].includes(tag)),
					server: row.Server,
					fc: row.FC,
					streamdays: row['Stream Days'],
					accountname: row.Stream.split('/').pop(),
					profile_url: defaultPicURL,
					status: { live: false },
			}));

			const processChannels = async () => {
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

			return {
				channels: await processChannels(),
				tags: tags
			};
		} catch (error) {
			console.log("Failed to load community Twitch channels:", error);
			return { channels: [], tags: [] };
		}
	}
};