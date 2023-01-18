import * as dotenv from 'dotenv'
dotenv.config()
const { token } = process.env;
import { Client, Collection, GatewayIntentBits } from "discord.js";
import fs from "fs";

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandsArray = [];

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles) {
    require(`./src/functions/${folder}/${file}`)(client);
  }
}

client.handleEvents();
client.handleCommands();
client.login(token);