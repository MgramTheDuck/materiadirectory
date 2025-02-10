import DefaultTheme from "vitepress/theme";
import "viewerjs/dist/viewer.min.css";
import imageViewer from "vitepress-plugin-image-viewer";
import { EnhanceAppContext, useRoute } from "vitepress";
import "./custom.css";

// @ts-ignore
import YoutubeEmbed from "./components/YoutubeEmbed.vue";
// @ts-ignore
import ImageEmbed from "./components/ImageEmbed.vue";
// @ts-ignore
import TwitchList from "./components/TwitchList.vue";
// @ts-ignore

export default {
	extends: DefaultTheme,
	enhanceApp(ctx: EnhanceAppContext) {
		DefaultTheme.enhanceApp(ctx);
		ctx.app.component("YoutubeEmbed", YoutubeEmbed);
		ctx.app.component("ImageEmbed", ImageEmbed);
		ctx.app.component("TwitchList", TwitchList);
	},
	setup() {
		// Get route
		const route = useRoute();
		// Using
		imageViewer(route);
	},
};
