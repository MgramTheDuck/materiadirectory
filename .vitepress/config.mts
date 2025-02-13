import {defineConfig} from "vitepress";
import {imagePlugin, youtubeEmbedPlugin} from "./plugins/markdown";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	srcDir: "./docs",
	title: "Materia Directory",
	description:
		"Materia is your quick directory for Materia FF14 Datacenter resources and communities.",
	head: [["link", {rel: "icon", href: "/images/favicon.ico"}]],
	cleanUrls: true,
	ignoreDeadLinks: true,
	lastUpdated: true,
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		logo: "/images/icons/materia.webp",
		outline: "deep",
		nav: [
			{text: "Home", link: "/"},
			{text: "Channels", link: "/channels"},
			{text: "Resources", link: "/resources"},
			{text: "Sheet", link: "https://docs.google.com/spreadsheets/u/0/d/1xsugAiw0j3Kz0Ic41gD-QuMtfxiVtlf-mujLC3Xt78c/htmlview#gid=1687590289"},
			{text: "About", link: "/about"},
		],
		sidebar: {
			"/": [],
		},
		search: {
			provider: "local",
		},
		socialLinks: [
			{icon: "github", link: "https://github.com/MgramTheDuck/materiadirectory"},
		],
		editLink: {
			pattern: "https://github.com/MgramTheDuck/materiadirectory/edit/main/docs/:path",
			text: "Edit this page on GitHub",
		},
		footer: {
			message:
				"© SQUARE ENIX CO., LTD. All Rights Reserved | FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd. | All content © their respective authors | Materia Directory is a non-profit community-owned website.",
		},
	},
	markdown: {
		config: (md) => {
			md.use(imagePlugin);
			md.use(youtubeEmbedPlugin);
		},
	},
	vite: {
		optimizeDeps: {
			exclude: ["vitepress"],
		},
	},
});