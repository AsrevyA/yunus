require("events").EventEmitter.prototype._maxListeners = 100;
const Discord = require("discord.js");
const db = require("quick.db");
const jimp = require("jimp");
const client = new Discord.Client();
const express = require("express");
const app = express();
const ayarlar = require("./ayarlar.json");
const fs = require("fs");
const Canvas = require("canvas");
const ms = require("ms");
const moment = require("moment")
require("./invite.js");
require("events").EventEmitter.prototype._maxListeners = 70;
require("events").defaultMaxListeners = 70;
process.on("warning", function(err) {
  if ("MaxListenersExceededWarning" == err.name) {
    process.exit(1);
  }
});

//Uptime için__________________________________________________________________
app.get("/", (req, res) => {
  res.send("https://is.gd/sorphy . . .");
});
app.listen(process.env.PORT);
///////
client.on("ready", async() => {
await console.log("Giriş yaptım!")
setInterval(() => {
let değerler =[
  
  "✨ Yardım almak için | %yardım" ,
  "🚀 Yeni Özellikler İçin | %yardım",
  "🔔 Bot Tamamen Yenilendi ", 
  "⚡️ Botu eklemek için | %davet", 
  "🎮 Prefix Değişmek İçin | %prefix"
  ];
let sonuç = değerler[Math.floor(Math.random() * değerler.length)];
client.user.setActivity(sonuç)

}, 5000)

})

//KOMUT Algılayıcı______________________________________________________________
const log = message => {
  console.log(`${message}`);
};
//  let prefix = await db.fetch(`prefix_${message.guild.id}`);
// if (prefix == null) prefix = "%";
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

///////////KOMUTLAR///////////////////////

//EVENTS Yükleyici_______________________________________________________________
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Etkinlik Yükleme Çalışıyor: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});

client.on("ready", () => {
  console.log(`${client.user.tag}! Aktif!`);
});

client.login(ayarlar.token); // Tokeniniz

client.on("guildMemberAdd", member => {
  //OTOROL
  let rol = db.fetch(`autoRole_${member.guild.id}`);
  if (!rol) return;
  let kanal = db.fetch(`autoRoleChannel_${member.guild.id}`);
  if (!kanal) return;

  member.roles.add(member.guild.roles.cache.get(rol));
  let embed = new Discord.MessageEmbed()
    
  .setDescription(
      " **Sunucuya yeni katılan** **" +
        member.user.username +
        "** **Kullanıcısına** <@&" +
        rol +
        "> **Rolü verildi**"
    )
    .setColor("RANDOM"); //.setFooter(`<@member.id>`)
  member.guild.channels.cache.get(kanal).send(embed);
}); 
client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 4) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(
                ` Bu sunucuda  Caps Lock Engelleme sistemi kullanılıyor.Bu yüzden mesajını sildim!`
              )
              .then(m => m.delete(5000));
          }
        }
      }
    }
  }
});
//-----------------------Sa-As-----------------------\\
//-----------------------Sa-As-----------------------\\
//-----------------------Sa-As-----------------------\\
//-----------------------Sa-As-----------------------\\

client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`saas_${msg.guild.id}`);
  if (i === "açık") {
    if (msg.content.toLowerCase() === "sa") {
      msg.reply(
        " **Aleyküm Selam Nasılsın ;)**  "
      );
    }
  }
});

client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`saas_${msg.guild.id}`);
  if (i === "açık") {
    if (msg.content.toLowerCase() === "hi") {
      msg.reply(" **Hi welcome**");
    }
  }
});

client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`saas_${msg.guild.id}`);
  if (i === "açık") {
    if (msg.content.toLowerCase() === "sea") {
      msg.reply("**Aleyküm Selam Hoşgeldin Sefalar Getirdin Sunucumuza ;) ** ");
    }
  }
});

//-----------------------Sa-As Son-----------------------\\
//-----------------------Sa-As Son-----------------------\\
//-----------------------Sa-As Son-----------------------\\
//-----------------------Sa-As Son-----------------------\\
//-----------------------Reklam Engel Link Engel-----------------------\\
//-----------------------Reklam Engel Link Engel-----------------------\\
//-----------------------Reklam Engel Link Engell-----------------------\\
//-----------------------Reklam Engel Link Engel-----------------------\\

client.on("message", async message => {
  let aktif = await db.fetch(`reklamEngelcodeshare_${message.channel.id}`);
  if (!aktif) return;
  let reklamlar = [
    "discord.app",
    "discord.gg",
    "discordapp",
    "discordgg",
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    ".party",
    ".rf.gd",
    ".az",
    ".cf",
    ".me",
    ".in"
  ];
  let kelimeler = message.content.slice(" ").split(/ +/g);
  if (reklamlar.some(word => message.content.toLowerCase().includes(word))) {
    if (message.member.hasPermission("BAN_MEMBERS")) return;
    message.delete();
    message.channel
      .send("```Reklamları Yapamazsın Birdaha Yapma !!!```")
      .then(msg => msg.delete(7000));
  }
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
  let aktif = await db.fetch(`reklamEngelcodeshare_${oldMsg.channel.id}`);
  if (!aktif) return;
  let reklamlar = [
    "discord.app",
    "discord.gg",
    "discordapp",
    "discordgg",
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    ".party",
    ".rf.gd",
    ".az",
    ".cf",
    ".me",
    ".in"
  ];
  let kelimeler = newMsg.content.slice(" ").split(/ +/g);
  if (reklamlar.some(word => newMsg.content.toLowerCase().includes(word))) {
    if (newMsg.member.hasPermission("BAN_MEMBERS")) return;
    newMsg.delete();
    oldMsg
      .reply("**Reklamları Engelliyorum! Birdaha Yapma !!!**")
      .then(msg => msg.delete(7000));
  }
});

//-----------------------Reklam Engel Son-----------------------\\
//-----------------------Reklam Engel Son-----------------------\\
//-----------------------Reklam Engel Son-----------------------\\
//-----------------------Reklam Engel Son-----------------------\\
client.on("message", async msg => {
  //const args = msg.content.slice.split(' ');
  const args = msg.content.trim().split(/ +/g);
  const fAK = await db.fetch(`filtreAK_${msg.guild.id}`);
  let mesaj = args.slice(1).join(" ");
  const filtre = await db.fetch(`filtre_${msg.guild.id}`);
  const kufur = [
    "mk",
    "göt",
    "amk",
    "amq",
    "aq",
    "orospu",
    "oruspu",
    "yavşak",
    "oç",
    "sikerim",
    "yarrak",
    "piç",
    "amq",
    "sik",
    "amcık",
    "çocu",
    "oç",
    "sex",
    "seks",
    "amına",
    "orospu çocuğu",
    "sg",
    "siktir git",
    "31"
  ];

  const reklam = [
    ".ml",
    "discord.gg",
    "invite",
    "discordapp",
    "discordgg",
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    ".party",
    ".rf.gd",
    ".az",
    "glitch.me",
    "glitch.com"
  ];

  let kufures = await db.fetch(`kuyarr_${msg.author.id}`);
  let linkes = await db.fetch(`luyarr_${msg.author.id}`);
  let ads = msg.author.id;
  if (fAK == "açık") {
    const fltr = filtre;
    if (fltr.some(word => msg.content.includes(word))) {
      if (!msg.member.hasPermission("BAN_MEMBERS")) {
        msg.delete();

        var k = new Discord.MessageEmbed()
          .setColor("#01CFFE")
          .setAuthor("Filtre Sistemi")
          .setDescription(
            ` Bu sunucuda yasaklanmış bir kelimeyi kullandınız, bu yüzden mesajınızı sildim.`
          );
        msg.channel.send(k).then(message => message.delete(5000));

        return;
      }
    }
  }

  if (!msg.guild) return;

  if (db.has(`küfürE_${msg.guild.id}`) === true) {
    if (kufur.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();

        var k = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setAuthor("Küfür Engeli!")
          .setDescription(
            ` Hey <@${msg.author.id}>, Bu sunucuda küfürler **${client.user.username}** tarafından engellenmektedir! Küfür etmene izin vermeyeceğim! `
          );
        db.add(`kuyarr_${msg.author.id}`, 1);
        msg.channel.send(k).then(message => message.delete(5000));
      }
    }
  }
});

//-------------------KÜFÜR ENGEL SON-----------------------\\

//------------------OTOTAG SİSTEMİ--------------------\\

client.on("guildMemberAdd", async member => {
  let frenzy_ibrahim = await db.fetch(`Frenzy?Code?Ototag_${member.guild.id}`);
  let frenzykanal = await db.fetch(
    `Frenzy?Code?OtotagKanal_${member.guild.id}`
  );
  if (!frenzy_ibrahim || !frenzykanal) return;

  var embed2 = new Discord.MessageEmbed()
    .setColor("PURPLE")
    .setAuthor("Ototag Sistemi")
    .setDescription(
      ` **${member.user.username}** Adlı Kullanıcıya Başarıyla **${frenzy_ibrahim}** Tagı'nı Verdim `
    );

  member.setNickname(`${frenzy_ibrahim} ${member.user.username}`);
  client.channels.cache.get(frenzykanal).send(embed2);
});

//------------OTOTAG SİSTEMİ SON-----------------\\
//-----------------------Sayaç-----------------------\\
//-----------------------Sayaç-----------------------\\
//-----------------------Sayaç-----------------------\\
            client.on("guildMemberAdd", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = client.channels.cache.get(skanal9);
  if (!skanal31) return;
  let embed = new Discord.MessageEmbed().setColor("RANDOM");
  skanal31.send(
    ` \`${
      member.user.tag
    }\` Adlı Kullanıcı Sunucuya Katıldı. \`${sayac}\` Kullanıcı Olmaya \`${sayac -
      member.guild.members.cache.size}\` Kullanıcı Kaldı.`
  );
});
client.on("guildMemberRemove", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = client.channels.cache.get(skanal9);
  if (!skanal31) return;
  let embed = new Discord.MessageEmbed().setColor("RANDOM");
  skanal31.send(
    ` \`${
      member.user.tag
    }\`Adlı Kullanıcı Sunucudan Ayrıldı. \`${sayac}\` Kullanıcı Olmaya \`${sayac -
      member.guild.members.cache.size}\` Kullanıcı Kaldı.`
  );
});

//-----------------------Sayaç Son-----------------------\\
//-----------------------Sayaç Son-----------------------\\
//-----------------------Sayaç Son-----------------------\\

///////////////////////OtoCevap////////////////////////////
client.on("message", msg => {
  let prefix;
if (db.has(`prefix_${msg.guild.id}`) === true) {
  prefix = db.fetch(`prefix_${msg.guild.id}`) 
}  
if (db.has(`prefix_${msg.guild.id}`) === false) {
  prefix = ayarlar.prefix
}
  if (msg.content.toLowerCase() === "<@762038791858421760>") {
    const oto = new Discord.MessageEmbed()
      .setColor(0xf001fa)
      .setTitle("▬▬▬[ Yardım Mesajım ]▬▬▬\n ")
      .addField(
        `Merhaba Ben Sorphy`,
        `Bu Sunucuda ki Ayarlı Prefixim    **${prefix}**`, 
        `Ayrıca Destek Sunucuma Gelebilirsin`
       )
      .addField("**➥ Link**", "[Destek Sunucu](https://discord.gg/fzytr8jpbv)")
      .setFooter(
        `${msg.author.username} Yardım Edebildiysem Çok Mutluyum.`,
        msg.author.avatarURL()
      );

    msg.channel.send(oto);
  }
});

///////////////////////OtoCevap Bitiş////////////////////////////
///////////////////////OtoCevap Bitiş////////////////////////////
///////////////////////OtoCevap Bitiş////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("guildCreate", async function(guild) {
  const owner = client.users.cache.get(guild.ownerID);
  const kanal = "781093368243159051"; //Eklendim mesajının atılacağı kanal ID'sini giriniz.
  const ottoman = new Discord.MessageEmbed()
    .setTitle(`Yeni bir sunucuya eklendim`)
    .setColor("GREEN")
    .addField(`Sunucu Adı`, guild.name)
    .addField(`Sunucu Sahibi`, owner.username + "#" + owner.discriminator)
    .addField(`Sunucu Üye Sayısı`, guild.memberCount);

  client.channels.cache
    .get(kanal)
    .send({ embed: ottoman })
    .catch(err => console.log("Kanala mesaj atamıyorum!"));
});
//

//Atıldım
client.on("guildDelete", async function(guild) {
  const owner = client.users.cache.get(guild.ownerID);
  const kanal = "781093407438667777"; //Atıldım mesajının atılacağı kanal ID'sini giriniz.
  const ottoman = new Discord.MessageEmbed()
    .setTitle(`Bir sunucudan atıldım`)
    .setColor("RED")
    .addField(`Sunucu Adı`, guild.name)
    .addField(`Sunucu Sahibi`, owner.username + "#" + owner.discriminator)
    .addField(`Sunucu Üye Sayısı`, guild.memberCount);

  client.channels.cache
    .get(kanal)
    .send({ embed: ottoman })
    .catch(err => console.log("Kanala mesaj atamıyorum!"));
});
//////////

//dm log

client.on("message", msg => {
  var dm = client.channels.cache.get("781260151487332352");

  if (msg.channel.type === "dm") {
    if (msg.author.id === client.user.id) return;

    const botdm = new Discord.MessageEmbed()

      .setTitle(`🔔 Yeni Bir Mesajım Var`)

      .setTimestamp()

      .setColor("RED")

      .setThumbnail(`${msg.author.avatarURL()}`)

      .addField("Gönderen", msg.author.tag)

      .addField("Gönderen ID", msg.author.id)

      .addField("Gönderilen Mesaj", msg.content);

    dm.send(botdm);
  }

  if (msg.channel.bot) return;
});
///////////

client.on("message", async msg => {
  let hereengelle = await db.fetch(`hereengel_${msg.guild.id}`);
  if (hereengelle == "acik") {
    const here = ["@here", "@everyone"];
    if (here.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        msg.channel
          .send(`<@${msg.author.id}>`)
          .then(message => message.delete());
        var valiant = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription(`Bu Sunucuda Everyone ve Here Yasak!`);
        msg.channel.send(valiant);
      }
    }
  } else if (hereengelle == "kapali") {
  }
});

/////////
  
///RESIMLI GUVENLIK////

client.on('guildMemberAdd',async member => {
  let user = client.users.cache.get(member.id);
  let kanal = client.channels.cache.get(db.fetch(`guvenlik${member.guild.id}`)) 
       const Canvas = require('canvas')
       const canvas = Canvas.createCanvas(360,100);
       const ctx = canvas.getContext('2d');
                                       
  const resim1 = await Canvas.loadImage('https://i.hizliresim.com/DWmOSd.png')//güvenli
    const resim2 = await Canvas.loadImage('https://i.hizliresim.com/hIvMtu.png')//şüpheli
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment(kurulus).format('dddd');  
    var kontrol;
      if (kurulus > 2629800000) kontrol = resim2
    if (kurulus < 2629800000) kontrol = resim1


     const background = await Canvas.loadImage("https://i.hizliresim.com/GEl6yj.png");
  
       ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
   

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: "png"}));
  ctx.drawImage(kontrol,0,0,canvas.width, canvas.height)
  ctx.beginPath();
    ctx.lineWidth = 4;
  ctx.fill()
    ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
    ctx.clip();
  ctx.drawImage(avatar, 143,10, 73, 72  );

   if (!kanal) return
       const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'güvenlik.png');
    kanal.send(attachment)
});

///////////RESIMLI GUVENLIK SON//////////
 //ROL VE KANAL KORUMA

client.on("roleCreate", async role => {

  const entry = await role.guild

    .fetchAuditLogs({ type: "ROLE_CREATE" })

    .then(audit => audit.entries.first());

  let rol = await db.fetch(`rolrol_${role.guild.id}`);

  let kontrol = await db.fetch(`dil_${role.guild.id}`);

  let kanal = await db.fetch(`rolk_${role.guild.id}`);

  if (!kanal) return;

  if (kontrol == "agayokaga") {

    if (entry.executor.id == client.user.id) return;

    if (entry.executor.id == role.guild.owner.id) return;

    role.delete();

    const embed = new Discord.MessageEmbed()

      .setTitle(`Bir Rol Açıldı!`)

      .setColor("BLACK")

      .addField(`Açan`, entry.executor.tag)

      .addField(`Açılan Rol`, role.name)

      .addField(`Sonuç`, `Rol Geri Silindi!`);

    client.channels.cache.get(kanal).send(embed);

  } else {

    if (entry.executor.id == client.user.id) return;

    if (entry.executor.id == role.guild.owner.id) return;

    role.delete();

    const embed = new Discord.MessageEmbed()

      .setTitle(`Bir Rol Açıldı!`)

      .setColor("BLACK")

      .addField(`Rolu Açan`, entry.executor.tag)

      .addField(`Açılan Rol`, role.name)

      .addField(`Sonuç`, `Açılan Rol Geri Silindi!`);

    client.channels.cache.get(kanal).send(embed);

  }

});

client.on("channelDelete", async channel => {

  let kontrol = await db.fetch(`dil_${channel.guild.id}`);

  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);

  if (!kanal) return;

  if (kontrol == "agayokaga") {

    const entry = await channel.guild

      .fetchAuditLogs({ type: "CHANNEL_DELETE" })

      .then(audit => audit.entries.first());

    if (entry.executor.id == client.user.id) return;

    if (entry.executor.id == channel.guild.owner.id) return;

    channel.guild.channels.create(channel.name, channel.type, [

      {

        id: channel.guild.id,

        position: channel.calculatedPosition

      }

    ]);

    const embed = new Discord.MessageEmbed()

      .setTitle(`Bir Kanal Silindi!`)

      .addField(`Silen`, entry.executor.tag)

      .addField(`Silinen Kanal`, channel.name)

      .addField(`Sonuç`, `Kanal Geri Açıldı!`)

      .setColor("BLACK");

    client.channels.cache.get(kanal).send(embed);

  } else {

    const entry = await channel.guild

      .fetchAuditLogs({ type: "CHANNEL_DELETE" })

      .then(audit => audit.entries.first());

    if (entry.executor.id == client.user.id) return;

    if (entry.executor.id == channel.guild.owner.id) return;

    channel.guild.channels.create(channel.name, channel.type, [

      {

        id: channel.guild.id,

        position: channel.calculatedPosition

      }

    ]);

    const embed = new Discord.MessageEmbed()

      .setTitle(`Bir Kanal Silindi!`)

      .addField(`Kanalı Silen`, entry.executor.tag)

      .setColor("BLACK")

      .addField(`Silinen Kanal`, channel.name)

      .addField(`Sonuç`, `Silinen Kanal Geri Açıldı!`);

    client.channels.cache.get(kanal).send(embed);

  }

});

client.on("channelCreate", async channel => {

  let kontrol = await db.fetch(`dil_${channel.guild.id}`);

  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);

  if (!kanal) return;

  if (kontrol == "agayokaga") {

    const entry = await channel.guild

      .fetchAuditLogs({ type: "CHANNEL_CREATE" })

      .then(audit => audit.entries.first());

    if (entry.executor.id == client.user.id) return;

    if (entry.executor.id == channel.guild.owner.id) return;

    channel.delete();

    const embed = new Discord.MessageEmbed()

      .setTitle(`Bir Kanal Açıldı!`)

      .setColor("BLACK")

      .addField(`Açan`, entry.executor.tag)

      .addField(`Açılan Kanal`, channel.name)

      .addField(`Sonuç`, `Kanal Geri Silindi!`);

    client.channels.cache.get(kanal).send(embed);

  } else {

    const entry = await channel.guild

      .fetchAuditLogs({ type: "CHANNEL_CREATE" })

      .then(audit => audit.entries.first());

    if (entry.executor.id == client.user.id) return;

    if (entry.executor.id == channel.guild.owner.id) return;

    channel.delete();

    const embed = new Discord.MessageEmbed()

      .setTitle(`Bir Kanal Açıldı!`)

      .setColor("BLACK")

      .addField(`Kanalı Açan`, entry.executor.tag)

      .addField(`Açılan Kanal`, channel.name)

      .addField(`Sonuç`, `Açılan Kanal Geri Silindi`);

    client.channels.cache.get(kanal).send(embed);

  }

});

// Ban ve Rol Koruma Devam

client.on("guildBanAdd", async (guild, user) => {

  let kontrol = await db.fetch(`dil_${guild.id}`);

  let kanal = await db.fetch(`bank_${guild.id}`);

  let rol = await db.fetch(`banrol_${guild.id}`);

  if (!kanal) return;

  if (kontrol == "agayokaga") {

    const entry = await guild

      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })

      .then(audit => audit.entries.first());

    if (entry.executor.id == client.user.id) return;

    if (entry.executor.id == guild.owner.id) return;

    guild.members.unban(user.id);

    guild.members.cache.get(entry.executor.id).kick();

    const embed = new Discord.MessageEmbed()

      .setTitle(`Biri Yasaklandı!`)

      .setColor("BLACK")

      .addField(`Yasaklayan`, entry.executor.tag)

      .addField(`Yasaklanan Kişi`, user.name)

      .addField(

        `Sonuç`,

        `Yasaklayan kişi sunucudan açıldı!\nve yasaklanan kişinin yasağı kalktı!`

      );

    client.channels.cache.get(kanal).send(embed);

  } else {

    const entry = await guild

      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })

      .then(audit => audit.entries.first());

    if (entry.executor.id == client.user.id) return;

    if (entry.executor.id == guild.owner.id) return;

    guild.members.unban(user.id);

    guild.members.cache.get(entry.executor.id).kick();

    const embed = new Discord.MessageEmbed()

      .setTitle(`Biri Yasaklandı!`)

      .setColor("BLACK")

      .addField(`Yasaklayan`, entry.executor.tag)

      .addField(`Yasaklanan Kişi`, user.name)

      .addField(

        `Sonuç`,

        `Yasaklayan Kişi Sunucudan Atıldı ve yasaklanan kişinin yasağı kalktı `

      );

    client.channels.cache.get(kanal).send(embed);

  }

});

client.on("roleDelete", async role => {

  const entry = await role.guild

    .fetchAuditLogs({ type: "ROLE_DELETE" })

    .then(audit => audit.entries.first());

  let rol = await db.fetch(`rolrol_${role.guild.id}`);

  let kontrol = await db.fetch(`dil_${role.guild.id}`);

  let kanal = await db.fetch(`rolk_${role.guild.id}`);

  if (!kanal) return;

  if (kontrol == "TR_tr") {

    if (entry.executor.id == client.user.id) return;

    if (entry.executor.id == role.guild.owner.id) return;

    role.guild.roles

      .create({

        data: {

          name: role.name

        }

      })

      .then(r => r.setPosition(role.position));

    const embed = new Discord.MessageEmbed()

      .setTitle(`Bir Rol Silindi!`)

      .setColor("BLACK")

      .addField(`Silen`, entry.executor.tag)

      .addField(`Silinen Rol`, role.name)

      .addField(`Sonuç`, `Rol Geri Açıldı!`);

    client.channels.cache.get(kanal).send(embed);

  } else {

    if (entry.executor.id == client.user.id) return;

    if (entry.executor.id == role.guild.owner.id) return;

    role.guild.roles

      .create({

        data: {

          name: role.name

        }

      })

      .then(r => r.setPosition(role.position));

    const embed = new Discord.MessageEmbed()

      .setTitle(`Bir Rol Silindi!`)

      .setColor("BLACK")

      .addField(`Silen`, entry.executor.tag)

      .addField(`Silinen Rol`, role.name)

      .addField(`Sonuç`, `Silinen Rol Geri Açıldı!`);

    client.channels.cache.get(kanal).send(embed);

  }

});

/////////
///////mod-log

client.on("messageDelete", async (message) => {

  if (message.author.bot || message.channel.type == "dm") return;

  let log = message.guild.channels.cache.get(await db.fetch(`log_${message.guild.id}`));

  if (!log) return;

  const embed = new Discord.MessageEmbed()

    .setTitle(message.author.username + " | Mesaj Silindi")

    .addField("Kullanıcı: ", message.author)

    .addField("Kanal: ", message.channel)

    .addField("Mesaj: ", "" + message.content + "")

  log.send(embed)

})

client.on("messageUpdate", async (oldMessage, newMessage) => {

  let modlog = await db.fetch(`log_${oldMessage.guild.id}`);

  if (!modlog) return;

  let embed = new Discord.MessageEmbed()

  .setAuthor(oldMessage.author.username, oldMessage.author.avatarURL())

  .addField("**Eylem**", "Mesaj Düzenleme")

  .addField("**Mesajın sahibi**", `<@${oldMessage.author.id}> === **${oldMessage.author.id}**`)

  .addField("**Eski Mesajı**", `${oldMessage.content}`)

  .addField("**Yeni Mesajı**", `${newMessage.content}`)

  .setTimestamp()

  .setColor("RANDOM")

  .setFooter(`Sunucu: ${oldMessage.guild.name} - ${oldMessage.guild.id}`, oldMessage.guild.iconURL())

  .setThumbnail(oldMessage.guild.iconURL)

  client.channels.cache.get(modlog).send(embed)

});

client.on("channelCreate", async(channel) => {

  let modlog = await db.fetch(`log_${channel.guild.id}`);

    if (!modlog) return;

    const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());

    let kanal;

    if (channel.type === "text") kanal = `<#${channel.id}>`

    if (channel.type === "voice") kanal = `\`${channel.name}\``

    let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Kanal Oluşturma")

    .addField("**Kanalı Oluşturan Kişi**", `<@${entry.executor.id}>`)

    .addField("**Oluşturduğu Kanal**", `${kanal}`)

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL())

    .setThumbnail(channel.guild.iconUR)

    client.channels.cache.get(modlog).send(embed)

    })

client.on("channelDelete", async(channel) => {

  let modlog = await db.fetch(`log_${channel.guild.id}`);

    if (!modlog) return;

    const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());

    let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Kanal Silme")

    .addField("**Kanalı Silen Kişi**", `<@${entry.executor.id}>`)

    .addField("**Silinen Kanal**", `\`${channel.name}\``)

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL())

    .setThumbnail(channel.guild.iconURL)

    client.channels.cache.get(modlog).send(embed)

    })

client.on("roleCreate", async(role) => {

let modlog = await db.fetch(`log_${role.guild.id}`);

if (!modlog) return;

const entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Rol Oluşturma")

.addField("**Rolü oluşturan kişi**", `<@${entry.executor.id}>`)

.addField("**Oluşturulan rol**", `\`${role.name}\` **=** \`${role.id}\``)

.setTimestamp()

.setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)

.setColor("RANDOM")

.setThumbnail(role.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("roleDelete", async(role) => {

let modlog = await db.fetch(`log_${role.guild.id}`);

if (!modlog) return;

const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Rol Silme")

.addField("**Rolü silen kişi**", `<@${entry.executor.id}>`)

.addField("**Silinen rol**", `\`${role.name}\` **=** \`${role.id}\``)

.setTimestamp()

.setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)

.setColor("RANDOM")

.setThumbnail(role.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiCreate", async(emoji) => {

let modlog = await db.fetch(`log_${emoji.guild.id}`);

if (!modlog) return;

const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Emoji Oluşturma")

.addField("**Emojiyi oluşturan kişi**", `<@${entry.executor.id}>`)

.addField("**Oluşturulan emoji**", `${emoji} - İsmi: \`${emoji.name}\``)

.setTimestamp()

.setColor("RANDOM")

.setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)

.setThumbnail(emoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiDelete", async(emoji) => {

let modlog = await db.fetch(`log_${emoji.guild.id}`);

if (!modlog) return;

const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Emoji Silme")

.addField("**Emojiyi silen kişi**", `<@${entry.executor.id}>`)

.addField("**Silinen emoji**", `${emoji}`)

.setTimestamp()

.setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)

.setColor("RANDOM")

.setThumbnail(emoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiUpdate", async(oldEmoji, newEmoji) => {

let modlog = await db.fetch(`log_${oldEmoji.guild.id}`);

if (!modlog) return;

const entry = await oldEmoji.guild.fetchAuditLogs({type: 'EMOJI_UPDATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Emoji Güncelleme")

.addField("**Emojiyi güncelleyen kişi**", `<@${entry.executor.id}>`)

.addField("**Güncellenmeden önceki emoji**", `${oldEmoji} - İsmi: \`${oldEmoji.name}\``)

.addField("**Güncellendikten sonraki emoji**", `${newEmoji} - İsmi: \`${newEmoji.name}\``)

.setTimestamp()

.setColor("RANDOM")

.setFooter(`Sunucu: ${oldEmoji.guild.name} - ${oldEmoji.guild.id}`, oldEmoji.guild.iconURL)

.setThumbnail(oldEmoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("guildBanAdd", async(guild, user) => {

let modlog = await db.fetch(`log_${guild.id}`);

if (!modlog) return;

const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Yasaklama")

.addField("**Kullanıcıyı yasaklayan yetkili**", `<@${entry.executor.id}>`)

.addField("**Yasaklanan kullanıcı**", `**${user.tag}** - ${user.id}`)

.addField("**Yasaklanma sebebi**", `${entry.reason}`)

.setTimestamp()

.setColor("RANDOM")

.setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

.setThumbnail(guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("guildBanRemove", async(guild, user) => {

let modlog = await db.fetch(`log_${guild.id}`);

if (!modlog) return;

const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_REMOVE"}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Yasak kaldırma")

.addField("**Yasağı kaldıran yetkili**", `<@${entry.executor.id}>`)

.addField("**Yasağı kaldırılan kullanıcı**", `**${user.tag}** - ${user.id}`)

.setTimestamp()
//DarkCode
.setColor("RANDOM")
//DarkCode
.setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

.setThumbnail(guild.iconURL)
//DarkCode
//DarkCode
client.channels.cache.get(modlog).send(embed)

})
// mod log son //
// spam engel başlangıç

const dctrat = require('dctr-antispam.js'); 

var authors = [];
var warned = [];

var messageLog = [];

client.on('message', async message => {
const spam = await db.fetch(`spam.${message.guild.id}`);
if(!spam) return;
const maxTime = await db.fetch(`max.${message.guild.id}.${message.author.id}`);
const timeout = await db.fetch(`time.${message.guild.id}.${message.author.id}`);
db.add(`mesaj.${message.guild.id}.${message.author.id}`, 1)
if(timeout) {
const sayı = await db.fetch(`mesaj.${message.guild.id}.${message.author.id}`);
if(Date.now() < maxTime) {
  const westraaaaam = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(` <@${message.author.id}> , **Bu Sunucuda Spam Yapmak Yasak!**`)
  .setFooter(`Bu mesaj otomatik olarak silinecektir.`)

 message.channel.send(westraaaaam).then(msg => msg.delete({timeout: 1500}));
  return message.delete();
  
}
} else {
db.set(`time.${message.guild.id}.${message.author.id}`, 'ok');
db.set(`max.${message.guild.id}.${message.author.id}`, Date.now()+3000);
setTimeout(() => {
db.delete(`mesaj.${message.guild.id}.${message.author.id}`);
db.delete(`time.${message.guild.id}.${message.author.id}`);
}, 500) // default : 500
}


});

// spam engel bitiş
client.on('guildMemberAdd', async member => {
  const ch = await db.fetch(`hgbbKanalResim_${member.guild.id}`)
  if(!ch || ch == null ) return
  const kanal = member.guild.channels.cache.get(ch)
  const canvas =  Canvas.createCanvas(1980,1080)
  const ctx =  canvas.getContext('2d')
  const userImage = await Canvas.loadImage(member.user.displayAvatarURL({format:'jpg',size:4096}))
  const bg = await Canvas.loadImage('https://cdn.discordapp.com/attachments/722966636558286899/729969400777539644/1594108611372.jpg')
  const door = await Canvas.loadImage('https://cdn.glitch.com/16c1f2c8-0b25-4605-89ff-c86675c38573%2F1594111765064.png?v=1594111792947')
  ctx.drawImage(bg,0,0,canvas.width,canvas.height)
  ctx.drawImage(door,0,915,150,150)
  ctx.font = '100px Candara'
  ctx.fillStyle ="#F0F8FF"
  ctx.textAlign ='center'
  ctx.fillText(member.user.username,1000,780)
  ctx.fillText('Sunucumuza Hoşgeldin.',1000,950)
  ctx.lineWidth = 10
  ctx.beginPath()
  ctx.shadowColor='black'
  ctx.shadowBlur =100
  ctx.arc(1020,350,270,0,Math.PI*2,true)
  ctx.closePath()
  ctx.stroke()
  ctx.clip()
  ctx.drawImage(userImage,725,55,590,590)
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(),'hoşgeldin.png')
  if(!kanal)return;
  kanal.send(attachment)
  })
client.on('guildMemberRemove', async member => {
  const ch = await db.fetch(`hgbbKanalResim_${member.guild.id}`)
  if(!ch || ch == null ) return
  const kanal = member.guild.channels.cache.get(ch)
  const canvas =  Canvas.createCanvas(1980,1080)
  const ctx =  canvas.getContext('2d')
  const userImage = await Canvas.loadImage(member.user.displayAvatarURL({format:'jpg',size:4096}))
  const bg = await Canvas.loadImage('https://cdn.discordapp.com/attachments/722966636558286899/729969400777539644/1594108611372.jpg')
  const door = await Canvas.loadImage('https://cdn.glitch.com/16c1f2c8-0b25-4605-89ff-c86675c38573%2F1594111773688.png?v=1594111787318')
  ctx.drawImage(bg,0,0,canvas.width,canvas.height)
  ctx.drawImage(door,1829,915,150,150)
  ctx.font = '100px Candara'
  ctx.fillStyle ="#F0F8FF"
  ctx.textAlign ='center'
  ctx.fillText(member.user.username,1000,780)
  ctx.fillText('Sunucumuzdan Ayrıldı.',1000,950)
  ctx.lineWidth = 10
  ctx.beginPath()
  ctx.shadowColor='black'
  ctx.shadowBlur =100
  ctx.arc(1020,350,270,0,Math.PI*2,true)
  ctx.closePath()
  ctx.stroke()
  ctx.clip()
  ctx.drawImage(userImage,725,55,590,590)
  ctx.blur = 3
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(),'gülegüle.png')
  if(!kanal) return;
  kanal.send(attachment)
  })
//------------Seviye-------------------//
client.on("message", async message => {
  let prefix = ayarlar.prefix;

  var id = message.author.id
  var gid = message.guild.id

  let hm = await db.fetch(`seviyeacik_${gid}`);
  let kanal = await db.fetch(`svlog_${gid}`);
  let xps = await db.fetch(`verilecekxp_${gid}`);
  let seviyerol = await db.fetch(`svrol_${gid}`);
  let rollvl = await db.fetch(`rollevel_${gid}`);

  if (!hm) return;
  if (message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);

  if (!lvl) {
    
    if (xps) {
      db.set(`xp_${id}_${gid}`, xps);
    }
    db.set(`xp_${id}_${gid}`, 4);
    db.set(`lvl_${id}_${gid}`, 1);
    db.set(`xpToLvl_${id}_${gid}`, 100);
  } else {
    if (xps) {
      db.add(`xp_${id}_${gid}`, xps);
    }
    db.add(`xp_${id}_${gid}`, 4);

    if (xp > xpToLvl) {
      db.add(`lvl_${id}_${gid}`, 1);
      db.add(
        `xpToLvl_${id}_${gid}`,
        (await db.fetch(`lvl_${id}_${gid}`)) * 100
      );
      if (kanal) {
        client.channels.cache.get(kanal.id)
          .send(
            message.member.user.username +
              " Seviye Atladı! Yeni seviyesi** " +
              lvl +
              " **Tebrikler! "
          );

        
      }
   
    }

    if (seviyerol) {
      if (lvl >= rollvl) {
        message.guild.member(message.author.id).roles.add(seviyerol);
        if (kanal) {
          client.channels.cache.get(kanal.id)
            .send(
              message.member.user.username +
                " Yeni Seviyesi** " +
                rollvl +
                " **ve** " +
                seviyerol +
                " **Rolünü kazandı!"
            );
        }
      }
    }
  }

  
});
///////Premium 
client.on('ready', () => {
setInterval(() => {
let veri = db.all().filter(ce => ce.ID.startsWith('preSunucu'))
if(veri.size < 0) return;
veri.forEach(codeming => {
let sunucu = codeming.ID.replace("preSunucu.", "")
let sunucuVeri = db.fetch(`preSunucu.${sunucu}`)
if(!client.guilds.cache.get(sunucu)) return; db.delete(codeming.ID)
if(!sunucu) return; db.delete(codeming.ID)
let owner = client.guilds.cache.get(sunucu).owner.id
owner.send('Selam Sunucunuzda **'+sunucuVeri.süre+'** günlük premium üyelik bitmiştir. discord.gg/codeming ').catch((error) => { console.log(error) })
db.delete(codeming.ID)
})
}, 3000)
});