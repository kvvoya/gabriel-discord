const { Client, GatewayIntentBits } = require('discord.js');
const { banSinner, guardChannelId, removeSinnerMessage, sinnerStickerName, token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => {
   console.log(`Bot logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
   if (message.author.bot) return;

   if (message.channelId === guardChannelId) {
      // console.log(message);
   
      let isValid = false;

      const sticker = message.stickers;
      let stickerName = null;
   
      for (const stick of sticker.values()) {
         stickerName = stick.name;
      }
   
      isValid = stickerName === sinnerStickerName;

      if (!isValid) {
         const user = message.author;
         console.log(`${user.tag} sinned: ${message}`);

         user.send('Human! You will not get away with this! I see what you tried to do! You wanted to break the holy rule of #may-your-ls-be-many-and-bitches-few \
However, I see everything, and I have seen, what you did there... As a result, your sinful message has been removed. May your L\'s be many and your bitches few...');

         if (removeSinnerMessage) {
            message.delete();
         }

         if (banSinner) {
            try {
               await message.member.ban();
               user.send('Also you have been banned, LMAO!');
            } catch (err) {
               console.error('Failed to ban user!', err);
            }
         }
      }
   }
});

client.login(token);