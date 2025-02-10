export default {
	async load() {
		let data = await fetch('https://docs.google.com/spreadsheets/u/0/d/1xsugAiw0j3Kz0Ic41gD-QuMtfxiVtlf-mujLC3Xt78c/gviz/tq?tqx=out:json&sheet=twitch')
		let text = await data.text();
		text = text.replaceAll(
			"/*O_o*/\ngoogle.visualization.Query.setResponse(",
			""
		);
		text = JSON.parse(text.substring(0, text.length - 2));

		return text;
	}
}