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
       .setTitle(` **Sorphy Bot Yeni Eğlence Menüsü** \n ** **`)
        .setDescription(`
        **${prefix}çıkma-teklif-et** : Etiketlediğiniz Kişiye Çıkma Teklif Edersiniz.\n
        **${prefix}yumruk-at** : Etiketlediğiniz Kişiye Yumruk Atarsınız.\n
        **${prefix}tersyazı** : Yazdığınız Yazıyı Tersine Çevirir.\n
        **${prefix}sarıl** : Etiketlediğiniz Kişiye Sarılırsınız.\n
        **${prefix}kralol** : Kral Olursunuz.\n
        **${prefix}fbi** : FBI Gif Atar\n
        **${prefix}espri** : Rastgele Espri Atar.\n
        **${prefix}elyazısı** : Yazdığınız Yazıyı El Yazısına Çevirir.\n
        **${prefix}doğrulukcesaret** : Doğruluk Veya Cesaret Cümlesi Atar.\n
        **${prefix}banner** : Yazdığınız YAZIYI Bannera Çevirir.\n
        **${prefix}aşkölçer** : Etiketlediğiniz Kişiyle Aranızdaki Aşkı Ölçer. (Şaka Amaçlıdır)\n
        **${prefix}token** : Tokenimi Gösterir
	
        **${prefix}ys** : Yıldız Savaşı Oynarsınız\n
        **${prefix}bg** : Bilek Güreşi Oynarsınız\n
        **${prefix}1vs1** : Düello Oynarsınız\n ** **
            
`)
        .setImage(`https://i.hizliresim.com/GTtSlO.gif`)
                .addField(`» Sorphy Bot Bağlantıları`, ` [Bot Davet Linki](https://is.gd/sorphy) **|** [Destek Sunucusu](https://discord.gg/vxfKGeGb8J) **|** [Oy Linki](https://discord.boats/bot/762038791858421760/vote)`)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['eğlence'],
  permLevel: 0,
};

exports.help = {
  name: 'eğlence',
  description: 'a!davet-sistemi Menüsü',
  usage: 'eğlence'
};