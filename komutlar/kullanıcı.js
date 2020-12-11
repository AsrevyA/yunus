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
       .setTitle(`**Sorphy Bot Yeni Kullanıcı Menüsü** \n ** ** `)
        .setDescription(`
  **» ${prefix}avatar** Avatarınızı Atar. \n
  **» ${prefix}sunucutanıt**  Sunucunuzu Tanıtır. \n
  **» ${prefix}kullanıcı-bilgi** : Etiketlediğiniz Kişinin Kullanıcı Bilgisini Gösterir. \n
  **» ${prefix}kanalbilgi ** : Belirtilen Kanal Hakkında Bilgi Verir. \n
  **» ${prefix}davet** : Botu Davet Edersiniz! \n
  **» ${prefix}korona ** : Korona Hakkında Bilgi Alırsınız. \n
  **» ${prefix}id ** : Etiketlediğiniz Kişini İD sini atar.\n
  **» ${prefix}mcskin ** : İsmini Girdiğiniz Skini Fotosunu Atar. \n
  **» ${prefix}emoji-bilgi** : İsmini Yazdığınız Emoji Hakkında Bilgi Alırsınız. \n
  **» ${prefix}saat ** : Saati Gösterir.(Kendinde Bakabilirsin Ama) \n
  **» ${prefix}say** : Sunucuda ki Üye Durumlarını Gösterir. \n
  **» ${prefix}sunucu-bilgi** : Sunucu Hakkın da Bilgi Verir. \n
  **» ${prefix}sunucu-resim** : Sunucunun İconunu Atar. \n
  **» ${prefix}afk ** : Afk Mod una Geçersiniz. \n ** **
   
`)
        .setImage(`https://i.hizliresim.com/GTtSlO.gif`)
               .addField(`» Sorphy Bot Bağlantıları`, `  [Bot Davet Linki](https://is.gd/sorphy) **|** [Destek Sunucusu](https://discord.gg/vxfKGeGb8J) **|** [Oy Linki](https://discord.boats/bot/762038791858421760/vote)`)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kullanıcı'],
  permLevel: 0,
};

exports.help = {
  name: 'kullanıcı',
  description: 'a!davet-sistemi Menüsü',
  usage: 'kullanıcı'
};