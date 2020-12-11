const db = require("quick.db");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  let prefix;
if (db.has(`prefix_${message.guild.id}`) === true) {
  prefix = db.fetch(`prefix_${message.guild.id}`)
}
if (db.has(`prefix_${message.guild.id}`) === false) {
  prefix = ayarlar.prefix
}
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("YELLOW")
        .addField(
          " Hata",
          `•\`${prefix}ever-here-engel aç/kapat\`Kullanabilmek için , \`Yönetici\` **Yetkisine sahip olmanız gerekir**.`
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/764488757637283870/765161035219992596/IMG_20201012_133635_063.jpg"
        )
    );
  if (!args[0]) {
    const valiant = new Discord.MessageEmbed()

      .setDescription(
        "Lütfen **aç** Veya **kapat** Yazın. Örnek Kullanım : **${prefix}everhere-engel aç/kapat**"
      )
      .setColor("RED");

    return message.channel.send(valiant);
  }

  if (args[0] == "aç") {
    db.set(`hereengel_${message.guild.id}`, "acik");

    const valiant = new Discord.MessageEmbed()

      .setDescription("Ever-Here Engel Başarılı Bir Şekilde Aktif Edildi!")
      .setColor("GREEN");

    return message.channel.send(valiant);
  }
  
  if (args[0] == "kapat") {
    db.set(`hereengel_${message.guild.id}`, "kapali");

    const valiant = new Discord.MessageEmbed()

      .setDescription("Ever-Here Engel Başarılı Bir Şekilde Deaktif Edildi!")
      .setColor("GREEN");

    return message.channel.send(valiant);
  }
};
//Valiant Developers
//Çalan Şahsiyetsi Sokak Köpeğidir
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["everhere-engel"],
  permLevel: 0
};

exports.help = {
  name: "everhere-engel",
  description: "ever-here engel sistemi",
  usage: "everhere-engel"
};
