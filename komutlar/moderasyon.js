const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const talkedRecently = new Set();
let botid = ('709489466913325168') 
exports.run = async(client, message, args) => {
  let prefix;
  
if (db.has(`prefix_${message.guild.id}`) === true) {
  prefix = db.fetch(`prefix_${message.guild.id}`)
}
  
if (db.has(`prefix_${message.guild.id}`) === false) {
  prefix = ayarlar.prefix
}
    const embed = new Discord.MessageEmbed()
        .setColor('#d02090')
       .setTitle(` **Sorphy Bot Yeni Moderasyon Menüsü** \n ** **`)
        .setDescription(`
  **» ${prefix}capsengel** : CapsLock Engelleme Sistemini Açıp Kapatırsınız (İlk Yazışta Açar 2.de kapar) \n
  **» ${prefix}küfür-engel** : Küfür Sistemini Açar/Kapatırsınız. \n
  **» ${prefix}reklam-engel** : Reklam Engel Sistemini Açar/Kapatırsınız. \n
  **» ${prefix}sil ** : 1 - 1000 Arasında Mesaj Siler. \n
  **» ${prefix}everhere-engel ** : Evet Here Engel Açar. \n
  **» ${prefix}duyuru-kanal-ayarla** : Duyuru Kanalını Belirtirsiniz. \n
  **» ${prefix}duyuru** : Duyuru Atarsınız. \n
  **» ${prefix}yavaş-mod** : Yavaş Modu Açarsınız. \n ** **
`)
        .setImage(`https://i.hizliresim.com/GTtSlO.gif`)
                .addField(`» Sorphy Bot Bağlantıları`, `  [Bot Davet Linki](https://is.gd/sorphy) **|** [Destek Sunucusu](https://discord.gg/vxfKGeGb8J) **|** [Oy Linki](https://discord.boats/bot/762038791858421760/vote)`)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Moderasyon'],
  permLevel: 0,
};

exports.help = {
  name: 'moderasyon',
  description: 'a!davet-sistemi Menüsü',
  usage: 'moderasyon'
};