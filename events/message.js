const ayarlar = require('../ayarlar.json');
const db = require("quick.db");

module.exports = (client, message) => {
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;

  const msgArr = message.content.split(/\s+/g);
  const command = msgArr[0];
  const args = msgArr.slice(1);
    
  var prefix;
  
if (db.has(`prefix_${message.guild.id}`)) {
  prefix = db.fetch(`prefix_${message.guild.id}`)
} 

  
if (!db.has(`prefix_${message.guild.id}`)){
  prefix = ayarlar.prefix;

}


  if (!command.startsWith(prefix)) return;

  let cmd = client.commands.get(command.slice(prefix.length));
 
  if (cmd) cmd.run(client, message, args);
}






