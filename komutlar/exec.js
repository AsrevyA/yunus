const Discord = require('discord.js');
const { exec } = require('child_process');
const hastebin = require("hastebin-gen");
exports.run = async(client, message, args) => {
const zaman = Date.now()
const kode = args.join(' ')
if(!kode) return message.channel.send('Yürütülecek parametre yok. 🤦‍♂️');
exec(kode, async (err, sonuç, hata) => {
    
if(sonuç){
if(sonuç.length > 2047) {
hastebin(sonuç, { extension: "js" }).then(cıkra => { message.channel.send('Bir hata oluştu Embedi atamıyorum '+cıkra+''); })
return
}
Gönder(sonuç, message.channel.id)

}else if(hata){
if(hata.length > 2047) {
 hastebin(hata, { extension: "js" }).then(cıkra => { message.channel.send('Bir hata oluştu Embedi atamıyorum '+cıkra+''); })
return
 }
 Gönder(hata, message.channel.id)

}else{
 message.channel.send('Komut başarıyla yürütüldü ancak hiçbir çıktı döndürmedi.')
}
message.channel.send(Date.now() - zaman)
});
    
async function Gönder(text, channel){
let embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setDescription(text)
message.guild.channels.cache.get(channel).send(embed)
}
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'exec',
  description: '',
  usage: ''
};
