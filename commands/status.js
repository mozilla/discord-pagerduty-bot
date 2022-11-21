const { SlashCommandBuilder } = require('discord.js');
const { api } = require('@pagerduty/pdjs');

const PAGERDUTY_USER_TOKEN = process.env.PAGERDUTY_USER_TOKEN;
const PAGERDUTY_SERVICE_IDS_QUERY_STRING = process.env.PAGERDUTY_SERVICE_IDS_QUERY_STRING;

function describeIncident({ status, summary, escalation_policy }) {
  return ` - ${escalation_policy.summary} <${status}>\n\`\`\` ${summary}\`\`\``;
}

async function status() {
  const pd = api({ token: PAGERDUTY_USER_TOKEN });

  const statuses = "statuses[]=triggered&statuses[]=acknowledged";
  const serviceIds = PAGERDUTY_SERVICE_IDS_QUERY_STRING;

  const response = await pd.get(`/incidents?${serviceIds}&${statuses}`);
  if (response.data.incidents.length === 0) {
    return "There are no unresolved incidents.";
  }

  const singular = response.data.incidents.length === 1;
  return [
    `There ${singular ? "is" : "are"} ${response.data.incidents.length} unresolved incident${singular ? "" : "s"}:`,
    response.data.incidents.map(describeIncident).join("\n")
  ].join("\n");
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Get status of ongoing incidents.'),
  async execute(interaction) {
    await interaction.reply(await status());
  },
};

