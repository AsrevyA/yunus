const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const talkedRecently = new Set();
let botid = ('709489466913325168') 
 
exports.run = async(client, message, args) => { 
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";

    const embed = new Discord.MessageEmbed()
      
        .setColor('#d02090')
       .setTitle(` **Sorphy Bot Sunucu Kurma Menüsü** \n ** **`)
        .setDescription(`

  **» ${prefix}normal-sunucu-kur**  Normal Sunucu Kurar \n
  **» ${prefix}normal-sunucu-kur2 ** Farklı Türde Normal Sunucu Kurar\n ** **
`)
        .setThumbnail(`https://i.hizliresim.com/GTtSlO.gif`)
              .addField(`» Sorphy Bot Bağlantıları`, ` [Bot Davet Linki](https://is.gd/sorphy) **|** [Destek Sunucusu](https://discord.gg/vxfKGeGb8J) **|** [Oy Linki](https://discord.boats/bot/762038791858421760/vote)`)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['koruma-yardım'],
  permLevel: 0,
};

exports.help = {
  name: 'sunucu-kur',
  description: 'a!davet-sistemi Menüsü',
  usage: 'kayıt-sistemi'
};