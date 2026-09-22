import { App, PluginSettingTab, Setting } from "obsidian";
import type ModifiedPlugin from "./main";

export interface ModifiedSettings {
	showTitle: boolean;
	defaultDayTitle: string;
	defaultWeekTitle: string;
	defaultMonthTitle: string;
	defaultLimit: number | null;  // null = all
}

export const DEFAULT_SETTINGS: ModifiedSettings = {
	showTitle: true,
	defaultDayTitle: "Today's notes",
	defaultWeekTitle: "This week's notes",
	defaultMonthTitle: "This month's notes",
	defaultLimit: null,
};

export class ModifiedSettingTab extends PluginSettingTab {
	constructor(app: App, private plugin: ModifiedPlugin) {
		super(app, plugin);
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		let dayTitleSetting: Setting;
		let weekTitleSetting: Setting;
		let monthTitleSetting: Setting;

		new Setting(containerEl)
			.setName("Show title")
			.setDesc("Show the heading above the callouts by default.")
			.addToggle(t => t
				.setValue(this.plugin.settings.showTitle)
				.onChange(async v => {
					this.plugin.settings.showTitle = v;
					await this.plugin.saveSettings();
					dayTitleSetting.setDisabled(!v);
					weekTitleSetting.setDisabled(!v);
					monthTitleSetting.setDisabled(!v);
				}));

		const disabled = !this.plugin.settings.showTitle;

		dayTitleSetting = new Setting(containerEl)
			.setName("Default title (day)")
			.setDesc("Heading for period=day.")
			.addText(t => t
				.setPlaceholder(DEFAULT_SETTINGS.defaultDayTitle)
				.setValue(this.plugin.settings.defaultDayTitle)
				.onChange(async v => {
					this.plugin.settings.defaultDayTitle = v || DEFAULT_SETTINGS.defaultDayTitle;
					await this.plugin.saveSettings();
				}));
		dayTitleSetting.setDisabled(disabled);

		weekTitleSetting = new Setting(containerEl)
			.setName("Default title (week)")
			.setDesc("Heading for period=week.")
			.addText(t => t
				.setPlaceholder(DEFAULT_SETTINGS.defaultWeekTitle)
				.setValue(this.plugin.settings.defaultWeekTitle)
				.onChange(async v => {
					this.plugin.settings.defaultWeekTitle = v || DEFAULT_SETTINGS.defaultWeekTitle;
					await this.plugin.saveSettings();
				}));
		weekTitleSetting.setDisabled(disabled);

		monthTitleSetting = new Setting(containerEl)
			.setName("Default title (month)")
			.setDesc("Heading for period=month.")
			.addText(t => t
				.setPlaceholder(DEFAULT_SETTINGS.defaultMonthTitle)
				.setValue(this.plugin.settings.defaultMonthTitle)
				.onChange(async v => {
					this.plugin.settings.defaultMonthTitle = v || DEFAULT_SETTINGS.defaultMonthTitle;
					await this.plugin.saveSettings();
				}));
		monthTitleSetting.setDisabled(disabled);

		new Setting(containerEl)
			.setName("Default limit")
			.setDesc("Max entries per callout. Leave empty to show all.")
			.addText(t => t
				.setPlaceholder("all")
				.setValue(this.plugin.settings.defaultLimit !== null ? String(this.plugin.settings.defaultLimit) : "")
				.onChange(async v => {
					const n = parseInt(v, 10);
					this.plugin.settings.defaultLimit = (!v.trim() || isNaN(n) || n < 1) ? null : n;
					await this.plugin.saveSettings();
				}));
	}
}
