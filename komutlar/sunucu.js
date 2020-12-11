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
       .setTitle(` **Sorphy Bot Yeni Sunucu Menüsü** \n ** **`)
        .setDescription(`
  **» ${prefix}mod-log** : Mod-Log Kanalını Belirlersiniz.\n
  **» ${prefix}mod-log kapat** : Ayarlanan Mod-Log Kanalı Kapatılır.\n
  **» ${prefix}oto-tag ** : Oto Tag Ayarlar.  \n
  **» ${prefix}oto-tag-kapat ** : Oto Tag Kapatır.  \n
  **» ${prefix}otorol ayarla** : Otorol Ayarlar. \n
  **» ${prefix}otorol sıfırla** : Otorol Sıfırlar. \n
  **» ${prefix}sayaç ** : Sayaç Ayarlar. \n
  **» ${prefix}sa-as aç ** : SA-AS Sistemini Açar. \n
  **» ${prefix}sa-as kapat ** : SA-AS Sistemini Kapatır. \n
  **» ${prefix}emoji-kur ** : Sunucuya 50 Adet Emoji Ekler. \n
  **» ${prefix}hg-bb-ayarla ** : Resimli Hg-BB sistemini Açarsınız. \n
  **» ${prefix}hg-bb-sıfırla ** : Ayarlanan Resimli Hg-BB Sistemini Kapatırsınız. \n
  **» ${prefix}güvenlik ** : Resimli Güvenlik Sistemini Belirlediğiniz Kanal Yapar. \n
  **» ${prefix}güvenlik sıfırla ** : Resimli Güvenlik Sistemini Kapatırsınız. \n ** **
     
`)
        .setImage(`https://i.hizliresim.com/GTtSlO.gif`)
                .addField(`» Sorphy Bot Bağlantıları`, `  [Bot Davet Linki](https://is.gd/sorphy) **|** [Destek Sunucusu](https://discord.gg/vxfKGeGb8J) **|** [Oy Linki](https://discord.boats/bot/762038791858421760/vote)`)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Moderasyon2'],
  permLevel: 0,
};

exports.help = {
  name: 'sunucu',
  description: 'a!davet-sistemi Menüsü',
  usage: 'moderasyon'
};