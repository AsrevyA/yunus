const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");
module.exports.run = async function(bot, message, args) {
  

  var prefix;

  

if (db.has(`prefix_${message.guild.id}`)) {

  prefix = db.fetch(`prefix_${message.guild.id}`)

} 

  

if (!db.has(`prefix_${message.guild.id}`)){

  prefix = ayarlar.prefix;

}
if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('⛔ Bu komutu kullanmak için `SUNUCUYU_YÖNET` yetkisine sahip olmalısınız!')
let kanal = message.mentions.channels.first()
if(!kanal) return message.channel.send(`Lütfen bir kanal etiketle! ${prefix}duyuru-kanal-ayarla #kanal`)
  db.set(`duyuru-kanal_${message.guild.id}`, kanal.id)
    message.channel.send(`Duyuru kanalı başarıyla ${kanal} olarak ayarlandı`)
  }

    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'duyuru-kanal-ayarla',
    description: 'Duyuru kanalını belirler.',
    usage: 'duyuru-kanal-ayarla <#kanal>'
}