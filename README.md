A discord bot for sending pagerduty alerts in response to slash commands.

- Create new slash commands by adding files to the commands directory.
- Register commands with the discord server by running `node deploy-commands.js`.
- Run the server with `node index.js`. 

The bot requires discord and pagerduty authentication.

config.json:
```json
{
  "discord": {
    "token": "<client secret>", 
    "clientId": "<client id>",
    "guildId": "<server id>",
  },
  "pagerDuty" : {
    "user_token": "<pagerduty user token>",
    "routingKeys": {
      "engineering": "<service routing key>",
      "marketing": "<service routing key>"
    },
  }
}

```


