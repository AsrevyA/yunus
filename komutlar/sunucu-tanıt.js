const Discord = require('discord.js')
const ms = require("ms")
const db = require('quick.db')
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {  
  let prefix;
if (db.has(`prefix_${message.guild.id}`) === true) {
  prefix = db.fetch(`prefix_${message.guild.id}`)
}
if (db.has(`prefix_${message.guild.id}`) === false) {
  prefix = ayarlar.prefix
 } 
    if(message.author.id !== message.guild.owner.user.id) return message.channel.send(`:x: Bu kullanmak için kurucu olmalısın.`)

  let cooldown = 84e+7, // 24 Saat
        amount = Math.floor(Math.random() * 1000) + 4000;      

    let lastDaily = await db.fetch(`gunluk_${message.guild.id}`);
    if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastDaily));


        const Ottoman = new Discord.MessageEmbed()
    .setDescription('Her 24 Saate Bir Bu Komutu Kullanabilirsin!')
            .setColor(0x00ffff)
        message.channel.send(Ottoman)
 
    } else {
        const EGG = new Discord.MessageEmbed()
        .setDescription('Sunucunuz [Burda](https://discord.gg/fzytr8jpbv) tanıtıldı!\n Her 24 saate bir %sunucutanıt komutunu kullanıp sunucunu tanıtabilirsin!\nBeni Eklemek İçin [Tıkla](https://discord.com/api/oauth2/authorize?client_id=762038791858421760&permissions=2147483639&scope=bot) ')
        .setColor('GREEN')
 message.channel.send(EGG);
    message.channel.createInvite({maxAge: 0}).then((invite) => {
        const Ottoman1 = new Discord.MessageEmbed()
        .setDescription('Sende Beni Ekleyerek Sunucunu Tanıtabilirsin!')
            .addField(`Sunucu Sahibi`, message.author.tag, true)
            .addField(` Sunucun İsmi`, message.guild.name, true)
      .addField(`Üye Sayısı`, message.guild.members.cache.size, true)
      .addField(`Davet Linki`, invite.url, true)
     
            .setColor('RANDOM')
        .setFooter('Sorphy Sunucu Tanıtma Sistemi')
      .setThumbnail(message.guild.iconURL)
       client.channels.cache.get('782357921677312050').send(Ottoman1)
    db.set(`gunluk_${message.guild.id}`, Date.now());
        })}
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [''],
    permLevel: 0
}

exports.help = {
    name: 'sunucutanıt',
    description: 'Sunucunuzu Tanıtır.',
    usage: 'sunucutanıt'
}