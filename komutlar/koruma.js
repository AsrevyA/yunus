const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const talkedRecently = new Set();
let botid = ('709489466913325168') 
 
exports.run = async(client, message, args) => { 
 
  var prefix;
  
if (db.has(`prefix_${message.guild.id}`)) {
  prefix = db.fetch(`prefix_${message.guild.id}`)
} 

  
if (!db.has(`prefix_${message.guild.id}`)){
  prefix = ayarlar.prefix;

}

    const embed = new Discord.MessageEmbed()
        .setColor('#d02090')
       .setTitle(` **Sorphy Bot Koruma Menüsü** \n ** **`)
        .setDescription(`

  **» ${prefix}ban-koruma #kanal** : Sunucudan Birini Banlayan Kişiyi Sunucudan Atar Ve Banlananın Banını Açar. \n
  **» ${prefix}ban-koruma-sıfırla ** : Ayarlanan Ban Koruma Sistemini Sıfırlar.\n
  **» ${prefix}kanal-koruma #kanal** : Sunucuda Açılan veya Kapatılan Kanalı Otomatik Kapatır Veya Açar.\n
  **» ${prefix}kanal-koruma-sıfırla** : Ayarlanan Kanal Koruma Sistemini Sıfırlar.\n
  **» ${prefix}rol-koruma #kanal ** : Sunucuda Açılan veya Kapatılan Rolü Otomatık Kapatır Veya Açar.\n
  **» ${prefix}rol-koruma-sıfırla ** : Ayarlanan Rol Koruma Sistemini Sıfırlar.\n
  **» ${prefix}spam ** : Spam engel açar.\n
  **» ${prefix}spamkapat ** : Spam engel kapatır.\n ** **
`)
        .setImage(`https://i.hizliresim.com/GTtSlO.gif`)
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
  name: 'koruma-yardım',
  description: 'a!davet-sistemi Menüsü',
  usage: 'kayıt-sistemi'
};