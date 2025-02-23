export default {
	async load() {

		// Fetches the channel list from google sheets
		let data = await fetch('https://docs.google.com/spreadsheets/u/0/d/1xsugAiw0j3Kz0Ic41gD-QuMtfxiVtlf-mujLC3Xt78c/gviz/tq?tqx=out:json&sheet=twitch')
		let text = await data.text();
		text = text.replaceAll(
			"/*O_o*/\ngoogle.visualization.Query.setResponse(",
			""
		);
		text = JSON.parse(text.substring(0, text.length - 2));
		let rows = text.table.rows
		let channels = []

		// Compile the google sheet data into an object array
		for (let row in rows) {
			let channeldata = rows[row].c.map(item => item && item.v !== null ? item.v : null);
			let accountname = channeldata[1].split('/').pop()
			channels.push(
				{
					name: channeldata[0],
					url: channeldata[1],
					tags: channeldata[2],
					server: channeldata[3],
					fc: channeldata[4],
					streamdays: channeldata[5],
					accountname: accountname,
					status: {
						live: false,
					},
				}
			);
		}

		// Removes the header row from the table
		channels.shift();

		// Setting up batch for async requests to fetch channel PFP images, allows all requests to run at once and wait till all finished.
		let fetches = []
		// Temporary array to hold fetch results, will be merged later
		let array = [];

		for (let channel in channels) {
			// Load images from API only on production (reduces API calls in dev)
			if (process.env.NODE_ENV === 'production') {
				fetches.push(
					fetch(`https://twitchuserinfo.ingramscloud.workers.dev/${channels[channel].accountname}`)
						.then((response) => response.json())
						.then(data => {array.push({ accountname: channels[channel].accountname, profile_url: data.profile_url }); })
						.catch(err => {
							// Push default image if fetch fails (needed for banned or suspended accounts)
							array.push({ accountname: channels[channel].accountname, profile_url: 'https://static-cdn.jtvnw.net/user-default-pictures-uv/cdd517fe-def4-11e9-948e-784f43822e80-profile_image-70x70.png' });
							return console.log(err);
						})
				)
			} else {
				// Always use default image in dev mode (reduces requests on worker)
				array.push({ accountname: channels[channel].accountname, profile_url: 'https://static-cdn.jtvnw.net/user-default-pictures-uv/cdd517fe-def4-11e9-948e-784f43822e80-profile_image-70x70.png' })
			}

		}

		// After the fetch requests have completed, merges the profile images into the Channel Array
		// Probably a better way to do this but im dumb.
		return Promise.all(fetches).then(function() {
			for (let channel in channels) {
				let result = array.find((item) => item.accountname === channels[channel].accountname);
				channels[channel].profile_url = result.profile_url;
			}

			// Return the channel array to be built into the page
			return channels;
		});

	}
}