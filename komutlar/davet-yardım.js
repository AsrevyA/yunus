const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
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
       .setColor("RANDOM")
       .setTitle(`**Sorphy Bot Davet Sistemi Menüsü** \n ** **`)
        .setDescription(`
        **${prefix}davet-kanal #kanal** Davet Kanal Ayarlarsınız. \n
        **${prefix}davet-kanal-sıfırla**  Davet Kanal Sıfırlar.\n
        **${prefix}davetlerim**  Davetlerinizi Gösterir.\n
        **${prefix}davet-ekle**  Kullanıcıya Davet Ekler.\n
        **${prefix}davet-top**  Sunucudaki Davet Yapanların Listesini Gösterir.\n
        **${prefix}davetleri-sıfırla**  Davetleri Sıfırlar. \n ** **
        
        `)
        .setImage(`https://i.hizliresim.com/GTtSlO.gif`)
              .addField(`» Sorphy Bot Bağlantıları`, `  [Bot Davet Linki](https://is.gd/sorphy) **|** [Destek Sunucusu](https://discord.gg/vxfKGeGb8J) **|** [Oy Linki](https://discord.boats/bot/762038791858421760/vote)`)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Gif-menü'],
  permLevel: 0,
};

exports.help = {
  name: 'davet-yardım',
  description: 'a!davet-sistemi Menüsü',
  usage: 'gif-menü'
};