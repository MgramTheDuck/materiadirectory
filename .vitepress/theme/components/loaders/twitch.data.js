export default {
	async load() {
		let data = await fetch('https://docs.google.com/spreadsheets/u/0/d/1xsugAiw0j3Kz0Ic41gD-QuMtfxiVtlf-mujLC3Xt78c/gviz/tq?tqx=out:json&sheet=twitch')
		let text = await data.text();
		text = text.replaceAll(
			"/*O_o*/\ngoogle.visualization.Query.setResponse(",
			""
		);
		text = JSON.parse(text.substring(0, text.length - 2));

		let rows = text.table.rows

		let channels = []

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
				}
			);
		}

		channels.shift();

		let fetches = []
		let array = [];



		for (let channel in channels) {
			// Load images from API only on production (reduces API calls in dev)
			if (process.env.NODE_ENV === 'production') {
				fetches.push(
					fetch(`https://twitchuserinfo.ingramscloud.workers.dev/${channels[channel].accountname}`)
						.then((response) => response.json())
						.then(data => { array.push({ accountname: channels[channel].accountname, profile_url: data.profile_url }) ; })
						.catch(err => {return console.log(err);})
				)
			} else {
				array.push({ accountname: channels[channel].accountname, profile_url: 'https://static-cdn.jtvnw.net/user-default-pictures-uv/cdd517fe-def4-11e9-948e-784f43822e80-profile_image-70x70.png' })
			}

		}

		// TODO: Find a way to merge array and channels
		return Promise.all(fetches).then(function() {
			for (let channel in channels) {
				let result = array.find((item) => item.accountname === channels[channel].accountname);
				channels[channel].profile_url = result.profile_url;
			}
			return channels;
		});

	}
}