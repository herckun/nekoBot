require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {
    Client,
    Intents,
    MessageEmbed,
} = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
});
const token = process.env.BOT_TOKEN;
const commands = [
  new SlashCommandBuilder()
	.setName('neko')
	.setDescription('Get nsfw neko image')
];

//
client.once('ready', () => {
    const rest = new REST({ version: '9' }).setToken(token);
    (async () => {
      try {
        await rest.put(
          Routes.applicationCommands(client.user.id),
          { body: commands },
        );
  
      } catch (error) {
          console.log('err');
      }
    })();
  });
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand() || !interaction.channel.nsfw) return;
  switch(interaction.commandName)
  {
  case 'neko' :
        try{
        let fetchImg = await fetch('https://nekos.moe/api/v1/random/image?nsfw=true');
        let result = await fetchImg.json();
        let embed = new MessageEmbed()
            .setColor('#0099ff')
            .setImage(`https://nekos.moe/image/${result.images[0].id}`)
            .setFooter({ text: 'Fetched from https://nekos.moe'})
            .setTimestamp();   
        interaction.reply({embeds: [embed]});
        }catch(err)
        {
            //
        }
  break;
 }
});

client.login(token);