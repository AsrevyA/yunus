const Discord = require('discord.js');

exports.run = (client, message) => {
  
  const davet = new Discord.MessageEmbed()
  .setColor('ORANGE')
  .setThumbnail('https://media.discordapp.net/attachments/720029424216440923/735255651638313061/727894683061321759.gif')
  .setDescription(`Bu Botu Sunucuna Ekleyebilirsin Linki Aşağıda

[Bot Davet](https://discord.com/api/oauth2/authorize?client_id=762038791858421760&permissions=2147483639&scope=bot) \n
[Destek Sunucu](https://discord.gg/kErVC3G7Yb) \n
[Oy Ver](https://discord.boats/bot/762038791858421760/vote) 

`)
  message.channel.send(davet)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}
exports.help = {
  name: "davet"
}