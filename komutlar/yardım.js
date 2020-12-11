const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
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
       .setTitle(`
      **Sorphy Bot Yeni Yardım Menüsü ** \n ** **`)
        .setDescription(`
  **» ${prefix}moderasyon**  Moderasyon Komutlarını Gösterir.\n
  **» ${prefix}sunucu**  Sunucu Komutlarını Gösterir.\n
  **» ${prefix}kullanıcı** Kullanıcı Komutlarıni Gösterir.\n
  **» ${prefix}eğlence **  Eğlence Komutlarını Gösterir.\n
  **» ${prefix}sunucu-kur**  Sunucu Kurma Komutlarını Gösterir.\n
  **» ${prefix}koruma-yardım**  Koruma Komutlarını Gösterir.\n
  **» ${prefix}davet-yardım** Davet Sistemini Gösterir.\n
  
▬▬▬ \`Diğer Komutlar\` ▬▬▬

**»  ${prefix}davet __Botu Davet Edebilirsiniz!__**
**»  ${prefix}sunucutanıt __Sunucunuzu Tanıtabilirsiniz.__**
**»  ${prefix}istatistik __Yazarak Botun İstatistiklerini Göre Bilirsiniz.__**
**»  ${prefix}prefix __Yazarak Botun Prefixini Değiştirebilirsiniz.__**
**»  ${prefix}prefix-sıfırla __Yazarak Ayarladığınız Prefixi Sıfırlayabilirsiniz.__**

`)
        .setImage(`https://i.hizliresim.com/GTtSlO.gif`)
        .addField(`» Sorphy Bot Bağlantıları`, `  [Bot Davet Linki](https://discord.com/api/oauth2/authorize?client_id=762038791858421760&permissions=8&scope=bot) **|** [Destek Sunucusu](https://discord.gg/vxfKGeGb8J) **|** [Oy Linki](https://discord.boats/bot/762038791858421760/vote)`)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return  message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yardım'],
  permLevel: 0,
};

exports.help = {
  name: 'yardım',
  description: 'a!davet-sistemi Menüsü',
  usage: 'yardım'
};