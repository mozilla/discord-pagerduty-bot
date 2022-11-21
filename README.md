A discord bot for sending pagerduty alerts in response to slash commands.

- Create new slash commands by adding files to the commands directory.
- Register commands with the discord server by running `node deploy-commands.js`.
- Run the server with `node index.js`. 

The bot requires discord and pagerduty authentication.

environment variables:
```
DISCORD_TOKEN
DISCORD_CLIENT_ID
DISCORD_GUILD_ID
PAGERDUTY_USER_TOKEN
PAGERDUTY_ROUTING_KEY_MARKETING
PAGERDUTY_ROUTING_KEY_ENGINEERING
PAGERDUTY_SERVICE_IDS_QUERY_STRING
```


