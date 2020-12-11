const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async(client, message, args) => {



if(!args[0]) return message.channel.send(':x: Yanlış kullanım, bir seçenek belirtmelisin.')

if(args[0] == 'ver'){

let kullanıcı = mes => mes.author.id === message.author.id


let sunucu = args[1];
let süre = args[2];
if(!sunucu) return message.channel.send(':x: Yanlış kullanım, bir sunucu ıd belirtmelisin belirtmelisin')

if(!süre) return message.channel.send(':x: Yanlış kullanım, bir süre belirtmelisin')

if(isNaN(süre)) return message.channel.send(':x: Belirteceğin süre bir değer olmamalı.')

if(süre < 1) return message.channel.send(':x: Belirteceğin süre 0dan küçük olmamalı.')

if(!client.guilds.cache.get(sunucu)) return message.channel.send(':x: Böyle bir sunucuda bulunmuyorum');

let preSunucu = client.guilds.cache.get(sunucu)

if(db.fetch(`preSunucu.${preSunucu.id}`)){
let veri = db.fetch(`preSunucu.${preSunucu.id}`)
message.channel.send('Upps, **'+preSunucu.name+'** sunucusunda '+veri.süre+' günlük premium üyelik var zaten devam etmek istiyormusun\nDevam etmek için bulunduğumuz kanalana **evet** şeklinde belirt. **50** saniyen var. İptal yazarsan işlem iptal olur.').then(mesaj => {
message.channel.awaitMessages(kullanıcı, { max: 1, time: 50000, errors: ["time"] }).then(collected => {

if(collected.first().content !== 'evet' && collected.first().content !== 'iptal') return mesaj.edit('İşlem iptal oldu. Yanlış bir terim belirtin.')
if(collected.first().content == 'evet'){
let süre1 = veri.süre;
let top = süre1 + süre
mesaj.edit('**'+preSunucu.name+'** adlı sunucuda **'+süre1+'** günlük premium **'+top+'** güne terfi edildi.')
db.set(`preSunucu.${preSunucu.id}`, {durum: "aktif", süre: top})
}
if(collected.first().content == 'iptal'){
mesaj.edit('İşlem iptal oldu.')
}
})
})
return;
}

db.set(`preSunucu.${preSunucu.id}`, {durum: "aktif", süre: süre})
message.channel.send('**'+preSunucu.name+'** adlı sunucuda **'+süre+'** günlük premium **aktif** edildi.')
}
   
if(args[0] == 'al'){
let sunucu = args[1];
let preSunucu = client.guilds.cache.get(sunucu)
if(!db.fetch(`preSunucu.${preSunucu.id}`)) {
message.channel.send('**'+preSunucu.name+'** adlı sunucuda zaten premium **aktif** değil.')
return
}
let veri = db.fetch(`preSunucu.${preSunucu.id}`)
message.channel.send('**'+preSunucu.name+'** adlı sunucuda **'+veri.süre+'** günlük premium üyelik **deaktif** edildi')
db.delete(`preSunucu.${preSunucu.id}`)
}






};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'pre-sistemi',
  description: '',
  usage: ''
};
