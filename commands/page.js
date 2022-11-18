const { SlashCommandBuilder } = require('discord.js');
const { pagerDuty } = require('../config.json');
const { event } = require('@pagerduty/pdjs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('page')
		.setDescription('Trigger an alert in pagerduty.')
		.addStringOption(option =>
			option.setName('who')
				.setDescription('Who to page')
				.setRequired(true)
				.addChoices(
					{ name: 'Engineering', value: 'engineering' },
					{ name: 'Marketing and Community Alerts', value: 'marketing' },
				))
		.addStringOption(option =>
			option.setName('what')
				.setDescription('A short description of what happening')
				// Ensure the text will fit in an embed description, if the user chooses that option
				.setMaxLength(3000)
				.setRequired(true)),
	async execute(interaction) {
		const who = interaction.options.getString("who");
		const what = interaction.options.getString("what");
		const nickSuffix = interaction.member.nick ? ` (${interaction.member.nick})` : ""
		const reporter = `${interaction.member.user.username}${nickSuffix}`;

		const summary = [
			what,
			` (Reported by ${reporter} via Discord)`
		].join("\n");
		const response = await event({
			data: {
				routing_key: who === "engineering" ? pagerDuty.routingKeys.engineering : pagerDuty.routingKeys.marketing,
				event_action: 'trigger',
				payload: {
					summary,

					source: 'discord-pagerduty-bot',
					severity: 'error',
				},
			},
		})
		await interaction.reply(`Incident created in pagerduty.\n${summary}`);
	},
};


