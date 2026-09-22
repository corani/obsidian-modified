import { Plugin } from "obsidian";
import { ModifiedSettings, DEFAULT_SETTINGS, ModifiedSettingTab } from "./settings";
import { ModifiedBlock } from "./renderer";

export default class ModifiedPlugin extends Plugin {
	settings: ModifiedSettings = DEFAULT_SETTINGS;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new ModifiedSettingTab(this.app, this));
		this.registerMarkdownCodeBlockProcessor("modified", (source, el, ctx) => {
			ctx.addChild(new ModifiedBlock(this.app, this.settings, source, el, ctx));
		});
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
